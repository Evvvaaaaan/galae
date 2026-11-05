import { test, expect } from '@playwright/test';

// A separate checkout is the design reference; never overwrite the working app.
test.skip(!process.env.GALAE_MAIN_REFERENCE_DIR, 'Set GALAE_MAIN_REFERENCE_DIR to a checkout of jeondowon/galae main.');

function harness(screen, wrapped) {
  return `
import React from '/node_modules/.vite/deps/react.js';
import ReactDOMClient from '/node_modules/.vite/deps/react-dom_client.js';
import { Header, BottomNav } from '/src/components/UI.jsx';
import { MemberProfile } from '/src/screens/Records.jsx';
import Question from '/src/screens/Question.jsx';
import { MEMBERS, TODAY } from '/src/questionData.js';
import '/src/index.css';
const h = React.createElement;
const { createRoot } = ReactDOMClient;
const member = MEMBERS[0];
const body = ${screen === 'member' ? "h(React.Fragment, null, h(Header, { title: member.handle, back() {} }), h(MemberProfile, { member }))" : "h(React.Fragment, null, h(Header, { title: 'Design reference', back() {} }), h(Question, { question: TODAY, answer: { sel: 1, reason: '동일한 검증용 내용', submitted: false }, onPick() {}, onReason() {}, onSubmit() {} }))"};
createRoot(document.getElementById('root')).render(h('div', { className: 'frame' }, h('main', { className: 'screen app-screen' }, ${wrapped ? "h('fieldset', { className: 'app-content' }, body)" : 'body'}), h(BottomNav, { active: 'records', go() {} })));
`;
}

for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 1000 }]) {
  for (const screen of ['member', 'question']) {
    test(`matches main ${screen} layout at ${viewport.width}px`, async ({ browser }, testInfo) => {
      const metrics = [];
      for (const [name, origin, wrapped] of [['main', 'http://127.0.0.1:5188', false], ['current', 'http://127.0.0.1:5187', true]]) {
        const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
        await page.route('**/src/main.jsx', route => route.fulfill({ contentType: 'application/javascript', body: harness(screen, wrapped) }));
        await page.goto(origin);
        const selector = screen === 'member' ? '.profile.member' : '.question-body';
        await expect(page.locator(selector)).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        if (screen === 'member') await page.getByRole('button', { name: '첫 가지', exact: true }).click();
        await page.screenshot({ path: testInfo.outputPath(`${name}.png`), animations: 'disabled' });
        metrics.push(await page.evaluate(selectors => Object.fromEntries(selectors.map(selector => {
          const node = document.querySelector(selector);
          const box = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return [selector, { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height), color: style.color, font: style.fontFamily, fontSize: style.fontSize, padding: style.padding, borderRadius: style.borderRadius, position: style.position }];
        })), screen === 'member' ? ['.frame', '.profile.member', '.world-tree', '.fruits', '.fruit-note', '.bottom-nav'] : ['.frame', '.question-body', '.choices', '.choice.on', '.note-input', '.btn-primary', '.bottom-nav']));
        await page.close();
      }
      expect(metrics[1]).toEqual(metrics[0]);
    });
  }
}
