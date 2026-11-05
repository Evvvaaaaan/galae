import { Capacitor, registerPlugin } from '@capacitor/core';

const nativeSession = registerPlugin('GalaeSession');

export function sessionStore(baseUrl) {
  const key = `galae.session.v1:${baseUrl}`;
  return {
    async read() {
      const value = Capacitor.isNativePlatform() ? (await nativeSession.read({ key }))?.value : sessionStorage.getItem(key);
      if (!value) return null;
      try {
        const session = JSON.parse(value);
        return session?.accessToken && session?.refreshToken && session?.userId ? session : null;
      } catch { return null; }
    },
    async write(session) {
      const value = session ? JSON.stringify(session) : null;
      if (Capacitor.isNativePlatform()) await nativeSession.write({ key, value });
      else if (value) sessionStorage.setItem(key, value);
      else sessionStorage.removeItem(key);
    },
  };
}
