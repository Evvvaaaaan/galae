import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateReleaseUrl } from '../scripts/check-release.mjs';

test('TestFlight preflight rejects missing, HTTP, private and placeholder API addresses', () => {
  for (const value of ['', 'http://api.galae.app/api/v1', 'https://127.0.0.1/api/v1', 'https://192.168.1.1/api/v1', 'https://10.1.2.3/api/v1', 'https://172.20.0.1/api/v1', 'https://api.local/api/v1', 'https://example.com/api/v1', 'https://api.example.org/api/v1', 'https://api.galae.app']) assert.throws(() => validateReleaseUrl(value));
  assert.equal(validateReleaseUrl('https://api.galae.app/api/v1/'), 'https://api.galae.app/api/v1');
});
