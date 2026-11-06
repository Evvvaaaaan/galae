# Frontend release readiness

Checked on 2026-11-05 on `release/ios-app-store`. This work changes the frontend
only. It does not publish the app or establish App Store review approval.

## Completed changes

| Area | Confirmed problem | Frontend change |
| --- | --- | --- |
| Thought images | The API returns `imageUrl`, while cards render `thumbnail`. | Map images through the API URL resolver in both snapshot and single-topic loading. |
| Empty feed | A feed with no reviewed topics said every topic had been read. | Show an explicit unpublished-content message; continue hiding unreviewed topics. |
| Reports | The pending report form sent report text to a block endpoint that does not accept it, then claimed receipt. | With the owner's agreement, prepare an email for the existing support address and provide a clipboard fallback. Explain that the user must send the email; do not automatically block or claim delivery. |
| Blocking | The backend identifies block targets by handle. The existing bottom action row also displaced the reference profile tree. | Preserve handle-based requests and place the block control in the header's existing action slot; retain confirmation and settings-based unblocking. |
| Profile editing | Empty or whitespace-only names could be submitted. | Disable saving until the trimmed name and cleaned handle are nonempty. |
| Early iOS 15 legal screens | Disabling `Array.prototype.at` reproduced `TypeError: blocks.at is not a function`. | Use indexed array access in the legal renderer. |
| Early iOS 15 layout | Removing unsupported `dvh` declarations reproduced a 0px frame. Disabling `:has` made group screens lose their flex layout. | Supply `vh` fallbacks and explicit route layout classes, retaining modern selectors for component comparisons. |
| Fonts | The landing page depended on Google Fonts and jsDelivr requests. | Bundle the same Pretendard and Gowun Batang fonts, with licenses, for offline typography. See `public/fonts/README.md`. |
| Demo content | Legacy fixture strings remained in the production JavaScript despite server-backed screens. | Separate runtime state, question and achievement helpers from the legacy demo modules. Keep fixtures for regression/design tests; exclude their text from release JavaScript. |

## Verification

| Check | Result |
| --- | --- |
| `npm test` | 40 passed, 0 failed. |
| Browser integration and release checks | 11 passed, including report preparation/copying, handle-based block/unblock, empty profile validation, reviewed-topic images and simulated older-browser capabilities. |
| Full browser suite with the original design reference | 15 passed, including four profile/question comparisons at mobile and desktop sizes. |
| Design comparison against merged `origin/main` (`9e901503621eb727fa9ef6a0b6419ac1fa37a221`) | Four passed using a separate temporary snapshot; no reference files were changed. |
| Production bundle inspection | Correct public API URL; local font assets/licenses; sampled legacy fixture text absent; no external font-provider imports in HTML/CSS. |
| `npm run ios:prepare-release` | Tests, public API readiness/native-origin preflight, production build and Capacitor iOS sync succeeded. |
| iOS Release device compilation, `CODE_SIGNING_ALLOWED=NO` | Succeeded. This verifies compilation, not distribution signing. |
| `npm audit --json` | Zero vulnerabilities. |
| `git diff --check` | No whitespace errors. |

Feed images and block/unblock browser scenarios use contract fixtures; they do not
claim that production content has been published or that the operator has received
a report. The older-iOS tests simulate missing features in a modern browser; they
do not replace testing on an actual supported iPhone. Font availability is verified
with external font providers blocked, not by claiming authenticated content is
available offline.

## Remaining release steps outside these code changes

1. Validate the final bundle on a real iPhone, including keyboard behavior,
   photo selection/camera options, native sharing/copying, external sources,
   opening the mail composer, cancelled actions and reconnection. Test the
   oldest supported iOS version when possible.
2. Confirm distribution signing and provisioning. The signing inventory inspected
   during this session had an Apple Development identity and no Apple Distribution
   identity. An unsigned build is not an uploadable distribution archive.
3. Publish the existing privacy and support documents at owner-controlled public
   URLs and enter those URLs in App Store Connect. Hosting is still undecided;
   no public URL is invented or published by this task.
4. Complete store metadata, privacy answers, age rating, screenshots, review
   contact, a working review account and review instructions. Describe the email
   reporting flow accurately and ensure the support mailbox is monitored.
5. Create and validate a signed archive, then obtain the previously required
   approval before uploading to TestFlight/App Store Connect. Select the processed
   build and complete the remaining review fields there.

No backend source, production accounts or server content were changed. No report
email, App Store upload or external publication was performed.

## References

- [Apple Safari 15.4 release notes](https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes)
- [iOS release procedure](IOS_RELEASE.md)
- [Historical integration verification](INTEGRATION_VERIFICATION.md)
