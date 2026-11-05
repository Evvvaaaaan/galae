import assert from 'node:assert/strict';
import { test } from 'node:test';

// Emulate the native bridge; exercise the actual Capacitor plugin proxies.
globalThis.webkit = { messageHandlers: { bridge: {} } };
const calls = [];
let rejectShare = false;
globalThis.Capacitor = {
  PluginHeaders: [
    { name: 'Share', methods: [{ name: 'share', rtype: 'promise' }] },
    { name: 'Clipboard', methods: [{ name: 'write', rtype: 'promise' }] },
  ],
  async nativePromise(plugin, method, options) {
    calls.push({ plugin, method, options });
    if (rejectShare && plugin === 'Share') throw new Error('Share cancelled');
    return {};
  },
};
const { copyText, shareOrCopy, shareUrl } = await import('../src/platform.js');

test('native sharing omits local URLs and sends answer text through the share plugin', async () => {
  assert.equal(shareUrl('question/q1'), undefined);
  assert.equal(shareUrl('feed/topic1'), undefined);
  assert.equal(await shareOrCopy({ text: 'My answer' }, 'My answer'), false);
  assert.deepEqual(calls.pop(), { plugin: 'Share', method: 'share', options: { text: 'My answer' } });
});

test('native share cancellation does not copy private answer text', async () => {
  rejectShare = true;
  const before = calls.length;
  assert.equal(await shareOrCopy({ text: 'Private answer' }, 'Private answer'), false);
  assert.equal(calls.length, before + 1);
  assert.equal(calls.at(-1).plugin, 'Share');
  rejectShare = false;
});

test('invitation codes use the native clipboard', async () => {
  await copyText('GARA01');
  assert.deepEqual(calls.pop(), { plugin: 'Clipboard', method: 'write', options: { string: 'GARA01' } });
});
