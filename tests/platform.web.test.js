import assert from 'node:assert/strict';
import { test } from 'node:test';
import { copyText, shareOrCopy, shareUrl } from '../src/platform.js';

test('web sharing keeps public links and clipboard fallback behavior', async t => {
  const writes = [];
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { clipboard: { async writeText(text) { writes.push(text); } } },
  });
  globalThis.location = { origin: 'https://example.com', pathname: '/galae/' };
  t.after(() => {
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
    else delete globalThis.navigator;
    delete globalThis.location;
  });

  const url = shareUrl('question/q1');
  assert.equal(url, 'https://example.com/galae/#/question/q1');
  assert.equal(await shareOrCopy({ text: 'Answer', url }, url), true);
  await copyText('GARA01');
  assert.deepEqual(writes, [url, 'GARA01']);

  navigator.share = async () => { throw new Error('Share cancelled'); };
  assert.equal(await shareOrCopy({ text: 'Answer', url }, url), false);
  assert.equal(writes.length, 2);
  delete navigator.share;
  navigator.clipboard.writeText = async () => { throw new Error('Clipboard unavailable'); };
  assert.equal(await shareOrCopy({ text: 'Answer' }, 'Answer'), false);
});
