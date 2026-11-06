import { test, expect } from '@playwright/test';

test('signup policies remain readable without Array.prototype.at on early iOS 15', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '시작하기', exact: true }).click();
  await page.evaluate(() => { Array.prototype.at = undefined; });
  await page.getByRole('button', { name: '보기', exact: true }).first().click();
  await expect(page.getByRole('dialog', { name: '이용약관', exact: true })).toBeVisible();
  await expect(page.getByText('제1조 (목적)', { exact: true })).toBeVisible();
  await page.getByRole('dialog', { name: '이용약관', exact: true }).getByRole('button', { name: '닫기', exact: true }).click();
  await page.getByRole('button', { name: '보기', exact: true }).last().click();
  await expect(page.getByRole('dialog', { name: '개인정보처리방침', exact: true })).toBeVisible();
});

test('the app frame retains its height when dynamic viewport units are unsupported', async ({ page }) => {
  await page.route('**/src/index.css', async route => {
    const response = await route.fetch();
    const source = await response.text();
    // Drop unsupported declarations as an older CSS parser would.
    await route.fulfill({ response, body: source.replace(/height:\s*[^;{}]*dvh[^;{}]*;/g, '') });
  });
  await page.goto('/');
  await expect(page.getByRole('button', { name: '시작하기', exact: true })).toBeVisible();
  const height = await page.locator('.frame').evaluate(node => node.getBoundingClientRect().height);
  expect(height).toBe(844);
});

test('bundled Korean fonts load with external font providers unavailable', async ({ page }) => {
  const external = [];
  page.on('request', request => { if (/fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net/.test(request.url())) external.push(request.url()); });
  await page.route(/https:\/\/(?:fonts\.(?:googleapis|gstatic)\.com|cdn\.jsdelivr\.net)\//, route => route.abort());
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const loaded = await page.evaluate(async () => {
    const sans = await document.fonts.load('400 14px Pretendard', '갈래');
    const serif = await document.fonts.load('400 24px "Gowun Batang"', '갈래');
    return { sans: sans.length, serif: serif.length };
  });
  expect(loaded.sans).toBeGreaterThan(0);
  expect(loaded.serif).toBeGreaterThan(0);
  expect(external).toEqual([]);
});
