// App Store Connect API helper for the 갈래 release.
// Auth: set ASC_KEY_ID and ASC_ISSUER_ID. The .p8 is read from ASC_KEY_PATH,
// defaulting to ~/.appstoreconnect/private_keys/AuthKey_<ASC_KEY_ID>.p8.
//
//   node scripts/asc.mjs show
//   node scripts/asc.mjs age
//   node scripts/asc.mjs age userGeneratedContent=MESSAGING_AND_CHAT ...
//   node scripts/asc.mjs set privacyPolicyUrl=https://... supportUrl=https://...

import { createHash, createSign } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const BASE = 'https://api.appstoreconnect.apple.com';
const BUNDLE = process.env.ASC_BUNDLE_ID || 'com.handong.galae';
const configPath = join(homedir(), '.config/galae/release/asc.json');
const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf8')) : {};
const KEY_ID = process.env.ASC_KEY_ID || config.keyId;
const ISSUER = process.env.ASC_ISSUER_ID || config.issuerId;
const KEY_PATH = process.env.ASC_KEY_PATH
  || join(homedir(), '.appstoreconnect/private_keys', `AuthKey_${KEY_ID}.p8`);

if (!KEY_ID || !ISSUER) {
  console.error('ASC_KEY_ID and ASC_ISSUER_ID are required.');
  process.exit(1);
}

const b64 = value => Buffer.from(value).toString('base64url');

function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: 'ES256', kid: KEY_ID, typ: 'JWT' }));
  const body = b64(JSON.stringify({ iss: ISSUER, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' }));
  const signer = createSign('sha256').update(`${head}.${body}`);
  const signature = signer.sign({ key: readFileSync(KEY_PATH), dsaEncoding: 'ieee-p1363' });
  return `${head}.${body}.${b64(signature)}`;
}

async function api(path, method = 'GET', body) {
  const response = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    console.error(`${method} ${path} -> ${response.status}`);
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  return data;
}

async function context() {
  const apps = await api(`/v1/apps?filter[bundleId]=${encodeURIComponent(BUNDLE)}`);
  const app = apps.data?.[0];
  if (!app) throw new Error(`No app record for ${BUNDLE}.`);

  const infos = await api(`/v1/apps/${app.id}/appInfos`);
  const info = infos.data.find(i => i.attributes.appStoreState !== 'READY_FOR_DISTRIBUTION') || infos.data[0];
  const infoLocs = await api(`/v1/appInfos/${info.id}/appInfoLocalizations`);

  const versions = await api(`/v1/apps/${app.id}/appStoreVersions?limit=1`);
  const version = versions.data?.[0];
  const versionLocs = version
    ? await api(`/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`)
    : { data: [] };

  return { app, info, infoLocs: infoLocs.data, version, versionLocs: versionLocs.data };
}

async function show() {
  const { app, info, infoLocs, version, versionLocs } = await context();
  console.log(`app        ${app.id}  ${app.attributes.name}  (${app.attributes.bundleId})`);
  const ratings = Object.fromEntries(Object.entries(app.attributes).filter(([key]) => /ageRating|Rating/i.test(key)));
  if (Object.keys(ratings).length) console.log(`ratings    ${JSON.stringify(ratings)}`);
  console.log(`appInfo    ${info.id}  state=${info.attributes.appStoreState}`);
  console.log(`  infoAttrs ${JSON.stringify(info.attributes)}`);
  for (const loc of infoLocs) {
    console.log(`  infoLoc  ${loc.id}  ${loc.attributes.locale}  privacy=${loc.attributes.privacyPolicyUrl || '-'}`);
  }
  console.log(`version    ${version?.id || '-'}  ${version?.attributes.versionString || '-'}  state=${version?.attributes.appStoreState || '-'}`);
  for (const loc of versionLocs) {
    console.log(`  verLoc   ${loc.id}  ${loc.attributes.locale}  support=${loc.attributes.supportUrl || '-'}  keywords=${loc.attributes.keywords || '-'}`);
  }
  const decl = await api(`/v1/appInfos/${info.id}/ageRatingDeclaration`);
  console.log(`ageRating  ${decl.data.id}`);
  for (const [key, value] of Object.entries(decl.data.attributes).sort()) {
    console.log(`  ${key} = ${value}`);
  }
}

async function age(pairs) {
  const { info } = await context();
  const decl = await api(`/v1/appInfos/${info.id}/ageRatingDeclaration`);
  const attributes = {};
  const fromFile = pairs.length === 1 && pairs[0].startsWith('@');
  if (fromFile) Object.assign(attributes, JSON.parse(readFileSync(pairs[0].slice(1), 'utf8')));
  for (const pair of fromFile ? [] : pairs) {
    const [key, raw] = pair.split('=');
    if (!key || raw === undefined) throw new Error(`Bad assignment: ${pair}`);
    attributes[key] = raw === 'true' ? true : raw === 'false' ? false : raw;
  }
  if (!Object.keys(attributes).length) throw new Error('Pass key=value pairs.');
  const updated = await api(`/v1/ageRatingDeclarations/${decl.data.id}`, 'PATCH', {
    data: { id: decl.data.id, type: 'ageRatingDeclarations', attributes },
  });
  for (const [key, value] of Object.entries(updated.data.attributes).sort()) {
    if (key in attributes) console.log(`  ${key} = ${value}`);
  }
}

async function set(pairs) {
  const { infoLocs, versionLocs } = await context();
  const infoFields = ['privacyPolicyUrl', 'subtitle', 'name'];
  const versionFields = ['supportUrl', 'description', 'keywords', 'promotionalText', 'marketingUrl'];
  const infoAttrs = {};
  const versionAttrs = {};
  const fromFile = pairs.length === 1 && pairs[0].startsWith('@');
  const entries = fromFile
    ? Object.entries(JSON.parse(readFileSync(pairs[0].slice(1), 'utf8')))
    : pairs.map(pair => {
      const index = pair.indexOf('=');
      return [pair.slice(0, index), pair.slice(index + 1)];
    });
  for (const [key, value] of entries) {
    if (infoFields.includes(key)) infoAttrs[key] = value;
    else if (versionFields.includes(key)) versionAttrs[key] = value;
    else throw new Error(`Unknown field: ${key}`);
  }
  const ko = list => list.find(l => l.attributes.locale === 'ko') || list[0];
  if (Object.keys(infoAttrs).length) {
    const loc = ko(infoLocs);
    await api(`/v1/appInfoLocalizations/${loc.id}`, 'PATCH', {
      data: { id: loc.id, type: 'appInfoLocalizations', attributes: infoAttrs },
    });
    for (const [key, value] of Object.entries(infoAttrs)) console.log(`  ${key} = ${value}`);
  }
  if (Object.keys(versionAttrs).length) {
    const loc = ko(versionLocs);
    await api(`/v1/appStoreVersionLocalizations/${loc.id}`, 'PATCH', {
      data: { id: loc.id, type: 'appStoreVersionLocalizations', attributes: versionAttrs },
    });
    for (const [key, value] of Object.entries(versionAttrs)) console.log(`  ${key} = ${value}`);
  }
}

async function request([path, method = 'GET', bodyFile]) {
  if (!/^\/v[123]\//.test(path || '') || !['GET', 'POST', 'PATCH'].includes(method)) throw new Error('Use an API version path and GET, POST or PATCH.');
  const body = bodyFile ? JSON.parse(readFileSync(bodyFile.replace(/^@/, ''), 'utf8')) : undefined;
  console.log(JSON.stringify(await api(path, method, body), null, 2));
}

async function screenshots([directory]) {
  if (!directory) throw new Error('Pass the screenshot directory.');
  const files = readdirSync(directory).filter(name => /\.(png|jpe?g)$/i.test(name)).sort();
  if (!files.length || files.length > 10) throw new Error('Provide between one and ten screenshots.');
  const { versionLocs } = await context();
  const locale = versionLocs.find(loc => loc.attributes.locale === 'ko') || versionLocs[0];
  const sets = await api(`/v1/appStoreVersionLocalizations/${locale.id}/appScreenshotSets`);
  let set = sets.data.find(item => item.attributes.screenshotDisplayType === 'APP_IPHONE_67');
  if (!set) set = (await api('/v1/appScreenshotSets', 'POST', { data: { type: 'appScreenshotSets', attributes: { screenshotDisplayType: 'APP_IPHONE_67' }, relationships: { appStoreVersionLocalization: { data: { type: 'appStoreVersionLocalizations', id: locale.id } } } } })).data;
  const existing = await api(`/v1/appScreenshotSets/${set.id}/appScreenshots`);
  for (const name of files) {
    const bytes = readFileSync(join(directory, name));
    const checksum = createHash('md5').update(bytes).digest('hex');
    let shot = existing.data.find(item => item.attributes.fileName === name);
    if (shot?.attributes.assetDeliveryState?.state === 'COMPLETE' && shot.attributes.sourceFileChecksum === checksum) { console.log(`${name}: already complete`); continue; }
    if (!shot) shot = (await api('/v1/appScreenshots', 'POST', { data: { type: 'appScreenshots', attributes: { fileName: name, fileSize: bytes.length }, relationships: { appScreenshotSet: { data: { type: 'appScreenshotSets', id: set.id } } } } })).data;
    for (const operation of shot.attributes.uploadOperations || []) {
      const response = await fetch(operation.url, { method: operation.method, headers: Object.fromEntries(operation.requestHeaders.map(header => [header.name, header.value])), body: bytes.subarray(operation.offset, operation.offset + operation.length) });
      if (!response.ok) throw new Error(`Screenshot upload failed: HTTP ${response.status}`);
    }
    await api(`/v1/appScreenshots/${shot.id}`, 'PATCH', { data: { type: 'appScreenshots', id: shot.id, attributes: { uploaded: true, sourceFileChecksum: checksum } } });
    console.log(`${name}: uploaded (${shot.id})`);
  }
  console.log(`Screenshot set: ${set.id}`);
}

const [command, ...rest] = process.argv.slice(2);
const commands = { show, age, set, request, screenshots };
if (!commands[command]) {
  console.error('Usage: node scripts/asc.mjs show | age [key=value ...] | set key=value ...');
  process.exit(1);
}
await commands[command](rest);
