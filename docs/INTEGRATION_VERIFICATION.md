# Integration verification — 2026-11-05

The agreed scope is the existing backend integration, matching the frontend main
design, local verification and TestFlight build preparation. No external upload
or publication was performed by this task. Backend source was not modified.

## References

- Backend: `ggm77/galae-backend`, `56f0204b01162f667681cd0702cc781a321fbfa9`.
- Design: `jeondowon/galae` main, `03d0cc0d757983b7f93e7c9bdd5aaddb8b87037e`.
- Production API: `https://galae.seohamin.com/api/v1`.
- Local API: the same backend source with a disposable H2 database, real Seoul
  dates, verified topics only and no AI provider key.

## Executed checks

| Check | Observed result |
| --- | --- |
| `npm test` | 37 passed; 0 failures |
| Latest backend `./gradlew test` using Java 25 | 37 tests; 0 failures, errors or skipped tests |
| Browser integration and main-reference comparison | 9 passed; 0 failures |
| `npm run ios:prepare-release` | Tests, public HTTPS readiness and native CORS check, production build and iOS sync succeeded |
| iOS Release device build, signing disabled | Exit 0; this is compilation, not an uploadable signed archive |
| iOS Simulator Debug build, ad-hoc signed | Exit 0 |
| iOS native API and Keychain validation | Signup, Keychain write/read, persistence after process relaunch, restored authenticated request and deletion passed |
| `npm audit --json` | 0 vulnerabilities |
| `git diff --check` | No whitespace errors |

## Browser scenarios

Five scenarios exercise the integrated app:

1. Two real local accounts register, answer, create/join a group, share and read
   messages, unlock private answers only after answering, receive another user's
   message, open a member profile, edit a profile, switch accounts, refresh an
   expired access token and leave a group. Demo records never appear.
2. Failed answer and message writes retain input and do not display success.
3. Mocked verified-feed responses exercise author identity, replies and likes;
   unverified topics remain hidden. The actual seed has no reviewed topics, so
   no live content was marked verified to populate this test.
4. Actual local account deletion fails safely with a wrong password, succeeds
   with the right password, clears browser credentials, and invalidates a
   previously issued server access token.
5. A mocked approved reading response displays the new `openQuestion` field.
   Existing null-valued seed content remains compatible.

Four reference comparisons render identical member-profile and question fixtures
at 390×844 and 1280×1000. Positions, dimensions, colors, font families/sizes,
padding, border radii and achievement-overlay positioning match main. The
profile tree layout regression introduced by the write-lock wrapper was fixed.
No color, typography or spacing-token redesign was introduced.

Mobile screenshots for review:

| Screen | Reference main | Current integration |
| --- | --- | --- |
| Member profile and open achievement | [main](verification/main-member-mobile.png) | [current](verification/current-member-mobile.png) |
| Question | [main](verification/main-question-mobile.png) | [current](verification/current-question-mobile.png) |

## Native and public-server evidence

Native checks ran on iPhone 18 Pro Simulator, iOS 27. A temporary instrumented
copy of the built app called the real Swift Keychain bridge and the local API;
the test key was deleted afterward. The initial unsigned test bundle could not
access Keychain. An ad-hoc signed Simulator bundle resolved that environment
issue. Native testing also found and fixed the empty-Keychain response on first
launch; the regression test now covers an undefined native return value.

- [Native signup and Keychain write/read](verification/native-keychain-phase1.png).
- [Relaunch, authenticated request and Keychain deletion](verification/native-keychain-phase2.png).

The normal application bundle replaces the instrumented app after validation.
No validation script is included in repository web assets or the release build.
The final iOS web bundle contains the production API URL, with no active local
API fallback in the production output.

Public-server checks were read-only: `/ready` returned `200 ready`, native CORS
preflight succeeded, and an unauthenticated profile request correctly returned
`401 AUTHENTICATION_ERROR`. The public OpenAPI document confirms account DELETE,
the admin AI routes, and `PerspectiveItem.openQuestion`. No public accounts were
created or deleted and no paid AI generation was invoked.

## Remaining limits

- CORS currently accepts arbitrary origins. Both the latest source's hardcoded
  wildcard and a public preflight accepting `https://untrusted.invalid` confirm
  this. `cors.allowed-origins` does not enforce a restriction in this revision.
  Restoring the server allowlist is prepared as a backend-owner handoff.
- Physical iPhone operation, distribution certificates/provisioning, signed
  archive validation and App Store Connect upload were not verified. Nothing
  was uploaded. Run the release preparation command before making an archive;
  never distribute a local-development bundle.
- MariaDB hosting, backup/restore and migrations were not exercised locally;
  the server-side integration tests used H2.
- Authenticated production account flows were not exercised without a dedicated
  production test account. Their local equivalents were verified.
- Reporting, blocking, notification and server token-revocation APIs remain
  unavailable. Account deletion is implemented in the latest backend and app.
- The seed contains six older questions and no reviewed thought topics.
  Old dates remain accurate and the empty feed is intentional.
- AI generation and review remain in the existing web admin interface, as
  selected by the owner. The mobile app displays approved output only.

See [IOS_BACKEND_INTEGRATION.md](IOS_BACKEND_INTEGRATION.md) for setup, release
commands and the backend-owner handoff.
