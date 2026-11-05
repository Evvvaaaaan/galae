# iOS backend integration and TestFlight preparation

Scope agreed on 2026-11-05: integrate the existing backend API, validate locally,
and prepare the TestFlight build procedure. The production API supplied by the owner is
`https://galae.seohamin.com/api/v1` and is tracked as a public value in
`.env.production`. Backend source changes and external uploads are outside this change.

Backend reference: [ggm77/galae-backend](https://github.com/ggm77/galae-backend),
commit `56f0204b01162f667681cd0702cc781a321fbfa9` on `main`.
The [API contract](https://github.com/ggm77/galae-backend/blob/main/docs/API.md)
defines payloads, authorization and errors.

## What is connected

| Flow | Source and behavior |
| --- | --- |
| Signup and login | Real password authentication, JWT access/refresh tokens |
| Session restore | iOS Keychain, device only and accessible while unlocked; browser verification uses sessionStorage |
| Session expiry | One shared refresh for concurrent expired requests; invalid refresh clears the session |
| Account deletion | Password-confirmed DELETE, server-side removal, then Keychain and account state cleanup; errors preserve the session |
| Logout | Clears credentials, current user state and that user's local drafts; the existing server does not revoke tokens |
| Questions and records | Server questions, choices, participation counts, submitted answers, completion and progress |
| Drafts | Unsubmitted choices/reasons remain local, separated by API URL and user ID; never imported from the demo |
| Results and opinions | Server results and anonymous opinions, including pagination; no sample profiles attached to anonymous text |
| Reading | Only perspectives approved by the backend, including the new openQuestion; no placeholder philosophy/research text |
| Groups | Create, join by invitation code, settings, photos, member profiles, removal and leave |
| Sharing | Append-only answer messages; already shared targets stay selected, retries do not duplicate the same answer |
| Group conversation | Actual authors and messages, full polling every five seconds while open; leaving the screen stops polling |
| Feed | Only server topics with a verification date; comments, replies and likes use the API |
| Profile and achievements | Server profile, JPEG photo endpoints, stats and achievement dates |

Mutations show errors and retain unsubmitted input on failure. A failed write
does not display a successful save or advance the answer flow. A successful write
followed by a failed reload is reported separately. The demo reset action is removed.

## Content policy

Use the existing six server questions. The service date comes from `/feed` in
Asia/Seoul. A question published before that date is displayed as the latest
question, retaining its actual publication date. No dates are rewritten and no
daily generation pipeline is implied.

All five seeded thought topics are currently unverified. They remain hidden,
including when the server accidentally enables `include-unchecked`. The empty
feed has an explicit empty state. Verification dates must come from actual
content review. Existing demo accounts, groups, answers, statistics and comments
are not migrated into real accounts.

## Start the existing backend locally

Requirements: Java 25, the backend's Gradle wrapper, Node.js 22.12+, npm, macOS
and Xcode for iOS. Java 17 does not satisfy the backend toolchain.

Clone the backend into a separate directory. No backend source patch is required.
From that checkout, set a local JWT secret and load the supplied external config:

```sh
export JWT_SECRET="$(openssl rand -base64 64)"
./gradlew test
./gradlew bootRun --args="--spring.config.location=file:/absolute/path/to/galae/deploy/backend-local.yaml"
```

The local configuration uses a persistent H2 database under the backend's
`data/galae-local` path, real Seoul dates and verified topics only. The CORS field lists native and local browser origins, but the current backend hardcodes all origins as allowed; see the handoff below. Keep the secret stable
between local restarts if existing sessions should continue to work. Never
reuse a test secret or test database for hosting.

`http://127.0.0.1:8080/ready` must return `ready`; `/ping` must return `pong`.

## Run the frontend and integration checks

```sh
npm ci
cp .env.example .env.local
npm run dev
npm test
npm run test:e2e
npm run ios:sync:local
npm run ios:open
```

The browser tests start an isolated Vite server on port 5187 and create disposable
accounts and groups in the running local backend. They use installed Chrome by
default. For bundled Chromium, run `npx playwright install chromium` and set
`PLAYWRIGHT_CHANNEL=chromium`. Use a disposable local backend; these checks must
never target production data.

Development builds default to `http://127.0.0.1:8080/api/v1`. Production builds
require an explicit `VITE_API_URL`; a missing URL displays a configuration error
and cannot silently fall back to the demo. iOS Simulator can reach the Mac's
loopback address. A physical phone requires a reachable HTTPS API; its own
`127.0.0.1` is not the Mac. The iOS local-network transport exception does not
enable arbitrary HTTP internet traffic.

## Production configuration and TestFlight build preparation

1. Deploy the existing Java 25 service and a persistent MariaDB database. Load
   `deploy/backend-production.yaml` with `spring.config.location`. Set `DB_URL`,
   `DB_USERNAME`, `DB_PASSWORD`, and a private `JWT_SECRET`. Keep all of these
   server-side. The template records `CORS_ALLOWED_ORIGINS=capacitor://localhost`, but commit `56f0204` ignores that value and hardcodes `*`. The backend owner must restore allowlist enforcement. Terminate HTTPS at the chosen host or proxy.
2. The backend currently uses Hibernate `ddl-auto: update`. Establish database
   backups and a migration/restore procedure before using real user data; this
   change does not add migrations or claim MariaDB hosting was tested.
3. The supplied host passed read-only HTTPS `/ready`, native CORS and unauthenticated API checks on 2026-11-05. Use a dedicated test account for authenticated checks against the hosted service; the automated account-creation tests remain local.
4. `.env.production` sets `VITE_API_URL=https://galae.seohamin.com/api/v1`.
   Use `.env.production.local` or the build environment only to override it. Vite values are embedded at build time; changing the
   server URL after installation requires rebuilding the app. Never put DB
   credentials, JWT secrets or admin passwords in any `VITE_` variable.
5. Run `npm run ios:prepare-release`. It runs unit tests, rejects missing/HTTP/
   local/example API URLs, checks `/ready` and native CORS, builds production web
   assets and synchronizes iOS. The check intentionally fails when the configured public API is missing or unavailable. Do not use `ios:sync:local` for distribution.
6. In Xcode, select the `App` scheme and a generic iOS device. Check Bundle ID
   `com.handong.galae`, team `Q5U58YNG6X`, automatic signing and unique version/build
   numbers against the owner's Apple Developer and App Store Connect records.
7. Run on a physical iPhone against the hosted backend. Verify relaunch session
   restore, expired authentication, account switching, photos, keyboard, share
   sheets, offline/retry behavior, group restrictions and accessibility.
8. Use Product > Archive and Validate App. Distribution signing and a successful
   App Store Connect validation are required before a build is uploadable.
   Obtain explicit approval before any upload or publication.

## Backend-owner handoff

No messages, issues or pull requests were sent to the backend owner. The following
requirements are prepared for handoff:

- Restore CORS origin allowlist enforcement. The latest backend uses
  `setAllowedOriginPatterns(List.of("*"))` and ignores the configured list.
  A production preflight from `https://untrusted.invalid` was accepted on
  2026-11-05. Frontend configuration cannot restrict the backend's CORS policy.
- Reporting and user blocking for comments/group content, with moderation and
  appropriate visibility rules. Do not implement client-only blocking as access
  control.
- Server-side token revocation/refresh-token rotation, including logout and
  password-change invalidation. Existing JWTs currently survive password changes.
- Maintain published question content and review thought topics. Do not enable
  unverified topics to make the feed appear populated.
- Maintain the supplied public HTTPS endpoint, persistent MariaDB settings,
  backup/restore ownership and native CORS configuration.

Account deletion is connected to the new backend API. Reporting calls
`PUT /users/me/blocks/{handle}` and therefore blocks the target; the backend
still stores no separate report or moderation record. Notifications remain unavailable. Terms, privacy/support URLs, final artwork and App Store review
materials remain separate release work. TestFlight preparation does not establish
App Store approval eligibility.

## Latest-main design alignment

The frontend reference is `jeondowon/galae` main commit
`03d0cc0d757983b7f93e7c9bdd5aaddb8b87037e`. The color, typography, spacing,
icons and motif source match that reference. The input-lock fieldset introduced
for asynchronous writes required updating direct-child selectors to preserve the
reference member-profile tree and achievement overlay positions. Locked group
messages retain the reference blur/overlay treatment using synthetic placeholder
text; private answer content is never downloaded before authorization.

Run the optional reference checks with a separate checkout of that commit:

```sh
GALAE_MAIN_REFERENCE_DIR=/absolute/path/to/reference npm run test:e2e -- e2e/design.spec.js
```

The reference checkout needs its npm dependencies installed. Checks render the
same fixtures at mobile and desktop widths, compare layout/style measurements,
and save both screenshots in `test-results` for review.

## AI commentary administration

The owner chose to retain the backend's existing `/admin/` web interface for
AI generation and review. The mobile app consumes approved reading and its
`openQuestion`; it does not call admin generation APIs or expose provider keys,
model configuration or generation details. `BIZROUTER_API_KEY`, if enabled, stays
in the backend environment. No paid AI generation was called during validation.

## Verification record

The final executed checks and their limits are recorded in
[INTEGRATION_VERIFICATION.md](INTEGRATION_VERIFICATION.md).
