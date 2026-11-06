# iOS App Store release

> Frontend release fixes and current checks: [FRONTEND_RELEASE_READINESS.md](FRONTEND_RELEASE_READINESS.md).

> Current scope (2026-11-05): existing-backend integration, local verification and TestFlight build preparation. See [IOS_BACKEND_INTEGRATION.md](IOS_BACKEND_INTEGRATION.md). The initial demo validation below is historical; current results and remaining limits are in [INTEGRATION_VERIFICATION.md](INTEGRATION_VERIFICATION.md).

Work on `release/ios-app-store`. The Android APK branch starts separately from
the original web baseline. This branch packages the React app with Capacitor;
the installed app loads bundled files from `dist`, not a remote development URL.

## Local development

Requirements: macOS, Node.js 22.12+, npm, Xcode 26+, and an installed iOS
Simulator runtime or a connected iPhone. The native deployment target is iOS 15.
The project uses Swift Package Manager rather than CocoaPods.

```sh
npm ci
npm run ios:sync:local
npm run ios:open
```

In Xcode, select the `App` scheme and an iPhone simulator, then Run.
Install a simulator runtime in Xcode Settings > Components if none is listed.
Xcode 27 displays simulator screens in Device Hub. Open it from Xcode > Open
Developer Tool > Device Hub; older instructions referring to `Simulator.app`
do not apply to this installation.
For a connected iPhone, configure Signing & Capabilities with your development
team. After changing web code, run `npm run ios:sync:local` before building again for local development. Use `npm run ios:prepare-release` for distribution.
Use `npm run ios:run` to sync and select a run target from the terminal.

Unsigned iOS device compilation (does not install or launch the app):

```sh
xcodebuild -project ios/App/App.xcodeproj -scheme App \
  -configuration Debug -sdk iphoneos \
  -destination 'generic/platform=iOS' \
  -derivedDataPath /private/tmp/galae-ios-build CODE_SIGNING_ALLOWED=NO build
```

The first build downloads the Capacitor Swift packages. Keep `ios/App` source,
asset catalogs, property lists, and `CapApp-SPM/Package.swift` in version control.
Web assets and generated Capacitor configuration are refreshed by `ios:sync`.

## Initial validation (2026-11-05)

- `npm test`: 25 passed, 0 failed, including mocked native bridge coverage for
  text sharing, cancellation, clipboard writes, and web fallback behavior.
- `npm run ios:sync`: web production build and iOS synchronization succeeded.
- Xcode 27 / iOS 27 SDK: unsigned Debug device build succeeded with the command
  above. This does not validate distribution signing or App Store eligibility.
- iOS 27.0 runtime installed; unsigned simulator build succeeded. Installed and
  launched `com.handong.galae` on iPhone 18 Pro and inspected a screenshot showing
  the welcome screen with the start and login controls. The first capture was
  blank immediately after launch; a later capture showed the rendered screen.
  Startup timing, subsequent flows, keyboard, photos, and native share sheets
  still require interaction testing.
- npm reported two high-severity dependency findings during installation.
  This is historical: the current full `npm audit` reports zero vulnerabilities.

## Current identifiers and behavior

- Display name: 갈래.
- Bundle ID: `com.handong.galae`, supplied by the project owner. It is applied
  in both `capacitor.config.json` and Xcode's Debug and Release configurations.
  Registration and availability in the Apple Developer account are unverified.
- Native version: `1.0`; build: `1` (not an App Store submission).
- Signing team: `Q5U58YNG6X`, supplied by the project owner and applied to both
  Debug and Release with automatic signing. Account access, certificates, and
  provisioning are unverified. App Store Connect is not connected.
- Share sheets and invitation-code copying use native plugins on iOS.
  Shared text intentionally excludes app-local `capacitor://localhost` links.
  Public links and Universal Links require a public domain and server setup.
- Current service data comes from the backend. Only account-specific unsubmitted
  drafts are local; native credentials use Keychain and are cleared on logout.
  Demo localStorage data is not imported into server accounts.
- Pretendard and Gowun Batang are bundled with their licenses. The app makes no
  font-provider requests; see `public/fonts/README.md` for provenance.
- The final app icon and splash artwork are applied to the iOS asset catalog.

## Before TestFlight or App Store submission

The native shell now uses real backend APIs. The following full App Store checklist remains separate from local integration and TestFlight build preparation.

- [x] Confirm the release product: authentication, groups, statistics, comments
  and sharing come from the backend, and demo records are never imported into
  an account.
- [x] Use the server-provided date instead of the fixed demo date.
- [x] Exclude legacy demo fixture text from release JavaScript by importing
  separate runtime helpers; keep fixtures for regression and design tests.
- [ ] Prepare maintained question content for launch.
- [x] Implement accessible privacy policy, terms and support contact screens.
- [x] Add required signup consent for age, terms and privacy.
- [ ] Add public policy and support URLs for App Store Connect.
- [x] Connect password-confirmed account deletion to the backend; locally verified.
- [x] Provide email-report preparation and a copy fallback in settings. The
  user sends the email explicitly; the app does not claim delivery. Blocking is
  separate, via the block icon in a profile header and the server block list.
- [ ] Add server-side moderation (a profanity/spam filter and an operator queue)
  for user-generated content.
- [ ] Confirm the server-side access controls required for private group content.
- [ ] Confirm the app offers sufficient ongoing utility under guideline 4.2;
  wrapping a demo does not establish eligibility for approval.
- [ ] Finalize Bundle ID, signing team, entitlements and version/build numbers.
- [x] Apply the final app icon and launch artwork to the iOS asset catalog.
- [ ] Supply screenshots, description, age rating, review instructions and a
  review account when authentication exists.
- [x] Add `ios/App/App/PrivacyInfo.xcprivacy`: no tracking, and name, user ID,
  photos and user content collected for app functionality only.
- [ ] Complete App Store Connect privacy answers to match the manifest, and
  verify the bundled fonts and actual data handling. Adding Preferences later
  requires reviewing any applicable required-reason API declarations.
- [ ] Run on a real iPhone: onboarding, answer submission, relaunch persistence,
  keyboard editing, photo selection/cancellation, share/cancel, code copying,
  external sources, safe areas, accessibility and offline startup.
- [ ] Archive with the App Store distribution signing configuration, validate
  the archive, then obtain approval before uploading it externally.

## Official references

- [Capacitor environment](https://capacitorjs.com/docs/getting-started/environment-setup)
- [Capacitor iOS](https://capacitorjs.com/docs/ios)
- [Device Hub](https://developer.apple.com/documentation/xcode/device-hub)
- [Swift Package Manager](https://capacitorjs.com/docs/ios/spm)
- [Native storage considerations](https://capacitorjs.com/docs/apis/preferences)
- [Privacy manifest](https://capacitorjs.com/docs/ios/privacy-manifest)
- [App Store review guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App privacy details](https://developer.apple.com/app-store/app-privacy-details/)
