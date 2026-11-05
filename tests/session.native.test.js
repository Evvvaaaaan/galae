import assert from 'node:assert/strict';
import { test } from 'node:test';

globalThis.webkit = { messageHandlers: { bridge: {} } };
const records = new Map();
const calls = [];
globalThis.Capacitor = {
  PluginHeaders: [{ name: 'GalaeSession', methods: [{ name: 'read', rtype: 'promise' }, { name: 'write', rtype: 'promise' }] }],
  async nativePromise(plugin, method, options) {
    calls.push({ plugin, method, options });
    if (method === 'read') return records.has(options.key) ? { value: records.get(options.key) } : undefined;
    if (options.value) records.set(options.key, options.value);
    else records.delete(options.key);
    return {};
  },
};
const { sessionStore } = await import('../src/session.js');

test('native session persistence uses the Keychain bridge, isolates servers, and deletes on logout', async () => {
  const first = sessionStore('https://first.galae.app/api/v1');
  const second = sessionStore('https://second.galae.app/api/v1');
  const tokens = { userId: 7, accessToken: 'access', refreshToken: 'refresh' };
  await first.write(tokens);
  assert.deepEqual(await first.read(), tokens);
  assert.equal(await second.read(), null);
  await first.write(null);
  assert.equal(await first.read(), null);
  assert(calls.every(c => c.plugin === 'GalaeSession'));
});
