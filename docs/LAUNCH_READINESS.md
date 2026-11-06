# Launch readiness after the main merge

> Historical assessment before the frontend fixes. See
> [FRONTEND_RELEASE_READINESS.md](FRONTEND_RELEASE_READINESS.md) for current frontend
> changes and verification. The image, report and font findings below describe
> the earlier state.

Checked on 2026-11-05. This is an assessment of remaining release work, not a
claim that App Store Connect is ready for review.

## Merge and verification

- Merged `origin/main` at `9e901503621eb727fa9ef6a0b6419ac1fa37a221` into
  `release/ios-app-store`; merge commit: `983b757`.
- Resolved seven conflicts by applying upstream notification removal while
  preserving backend authentication, deletion, safety flows and the existing
  release policy text. The upstream privacy draft's Supabase/provider placeholders
  were not substituted for the actual Java-backend policy.
- Restored the pre-existing uncommitted changes in `src/App.jsx` and
  `src/screens/Settings.jsx`. The untracked `scripts/asc.mjs` was preserved.
- Recovery backup: `/private/tmp/galae-before-main-pull-9pxq1elq`.
- After restoring local work: `npm test` passed 40 tests, with 0 failures;
  `npm run build` succeeded. The two notification tests were removed together
  with the upstream notification feature.
- Post-merge `e2e/integration.spec.js`: 5 scenarios passed against the local
  backend. This does not verify production moderation or thumbnail delivery.
- Current target is portrait iPhone, bundle `com.handong.galae`, version `1.0`,
  build `1`, team `Q5U58YNG6X`. The privacy manifest is included in Xcode resources.

## Release blockers and work order

| Priority | Work | Evidence / completion criterion |
| --- | --- | --- |
| P0 | Complete signing and App Store Connect access | One valid Apple Development identity is visible, but no Apple Distribution identity was found. Confirm team/app access, distribution signing and provisioning. An API key file exists, but ASC issuer/key environment settings are not configured in this shell; the live app/build state has not been verified. |
| P0 | Verify an actual report-receiving and moderation workflow | The current report form sends reason/detail to `PUT /users/me/blocks/{handle}`. The production OpenAPI contract defines no request body for that route and exposes no report/moderation route. Blocking alone is not evidence that an operator receives a report. Confirm storage, operator visibility, filtering and response handling before describing reports as received. |
| P0 | Connect server image metadata and publish the updated content | Production `TopicResponseDto` exposes `imageUrl`, whereas `Feed.jsx` reads `topic.thumbnail`. `serverState.js` does not map those names. Main's local JSON/thumbnails do not automatically update the backend database. Verify the mapping, reviewed content, image availability and the absence of unintended unreviewed material against the deployed service. |
| P0 | Supply public policy/support pages and finish privacy answers | In-app documents exist, but reachable public privacy and support URLs and the live ASC privacy answers remain unverified. Confirm actual hosting providers, external font requests, retention and data categories before publishing declarations. |
| P0 | Restrict backend CORS | A production preflight from `https://untrusted.invalid` was accepted. Restore a deliberate native/web origin allowlist on the backend; this cannot be fixed by the client configuration. |
| P1 | Validate the final production build on a real iPhone and TestFlight | Exercise authentication/refresh/logout/deletion, consent screens, photos and keyboard, group invitation/sharing, reporting/blocking, reconnect/offline behavior, safe areas and accessibility. Local/browser and unsigned-build checks do not prove distribution readiness. |
| P1 | Prepare store and review metadata | Confirm app name/subtitle/category, Korean description/keywords, iPhone screenshots, content rights, age-rating answers, review contact, a working review account and review instructions. Confirm availability, price and release control with the owner. |
| P1 | Archive, validate, upload and select the processed build | Run `npm run ios:prepare-release`, make a distribution archive with a unique build number, validate/upload it, wait for Apple processing and select that build on the app version. Recheck privacy, export-compliance and required metadata before adding the version for review. |
| P1 | Establish launch operations | Maintain published questions and reviewed feed content; identify an owner for moderation, support, database backup/restore, monitoring and recovery. Confirm production two-account access restrictions and blocked-user behavior. |

The App Store Connect app record, uploaded builds, agreements and privacy answers
must be checked directly before changing any of their statuses. Do not infer
that they are missing solely because they are unverified here.

## Apple requirements referenced

User-generated-content apps must provide filtering, reporting with timely
responses, blocking and contact information. See Apple's
[App Review Guidelines, section 1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content).

Privacy answers and a public privacy policy URL must reflect the actual app and
its third-party services. See
[Manage app privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/).

An uploaded build must finish Apple's processing before it appears for selection
in App Store Connect. See
[Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/).

The older integration record remains useful as historical evidence; it must not
be treated as verification of these newly merged changes or of the current
production backend's safety and content features.
