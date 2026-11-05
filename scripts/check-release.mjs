import { loadEnv } from 'vite';
import { apiBase } from '../src/api.js';

export function validateReleaseUrl(value) {
  const base = apiBase(value);
  const url = new URL(base);
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || !url.pathname.endsWith('/api/v1') ||
      !host.includes('.') || /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host) ||
      host.endsWith('.local') || host.endsWith('.localhost') || host === 'example.com' || host.endsWith('.example.com') || host.endsWith('.example.org')) {
    throw new Error('Set VITE_API_URL to the public HTTPS backend URL ending in /api/v1. Local or example URLs cannot be used for TestFlight.');
  }
  return base;
}

if (process.argv[1]?.endsWith('/check-release.mjs')) {
  try {
    const env = loadEnv('production', process.cwd(), 'VITE_');
    const base = validateReleaseUrl(process.env.VITE_API_URL || env.VITE_API_URL);
    const origin = new URL(base).origin;
    const health = await fetch(`${origin}/ready`, { signal: AbortSignal.timeout(15000) });
    if (!health.ok || (await health.text()).trim() !== 'ready') throw new Error('The backend readiness check failed.');
    const preflight = await fetch(`${base}/users/me`, {
      method: 'OPTIONS', headers: { Origin: 'capacitor://localhost', 'Access-Control-Request-Method': 'GET', 'Access-Control-Request-Headers': 'authorization,content-type' },
      signal: AbortSignal.timeout(15000),
    });
    if (!preflight.ok || preflight.headers.get('access-control-allow-origin') !== 'capacitor://localhost') throw new Error('The backend must allow the iOS origin capacitor://localhost.');
    console.log('Release API URL, readiness, and iOS CORS checks passed.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
