import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import { Share } from '@capacitor/share';

export async function copyText(text) {
  if (Capacitor.isNativePlatform()) {
    await Clipboard.write({ string: text });
    return;
  }
  await navigator.clipboard.writeText(text);
}

// App-local URLs cannot be opened by people receiving a native share.
export function shareUrl(path) {
  return Capacitor.isNativePlatform() ? undefined : `${location.origin}${location.pathname}#/${path}`;
}

// Return true only when the clipboard fallback succeeds.
export async function shareOrCopy(data, fallbackText) {
  if (Capacitor.isNativePlatform()) {
    try { await Share.share(data); } catch { /* The share sheet was dismissed or unavailable. */ }
    return false;
  }
  if (navigator.share) {
    try { await navigator.share(data); } catch { /* The share sheet was dismissed or unavailable. */ }
    return false;
  }
  try { await copyText(fallbackText); return true; } catch { return false; }
}
