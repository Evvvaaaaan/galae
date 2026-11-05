# 갈래

**하나의 질문, 여러 갈래의 생각.**

갈래는 일상의 딜레마에 먼저 나의 선택을 남기고, 다른 사람들의 생각과 성경의 시선을 통해 자신의 판단을 돌아보는 서비스입니다. 기독교 대학생과 청년 공동체를 대상으로, 정답을 정하기보다 선택의 이유를 생각하고 나누는 경험을 지향합니다.

The iOS branch now connects to the existing [Galae backend](https://github.com/ggm77/galae-backend) for authentication, questions, answers, groups, sharing, profiles, account deletion, approved AI reading and verified feed content. iOS sessions use Keychain. The scope is local integration verification and TestFlight build preparation; the production API is `https://galae.seohamin.com/api/v1`.

Start with [the integration and release guide](docs/IOS_BACKEND_INTEGRATION.md). The API URL must include `/api/v1`. Existing demo data is not migrated to real accounts.

## 사용 흐름

```text
오늘 또는 이전 질문 선택
  → 나의 선택과 이유(선택 입력) 제출
  → 모두의 선택과 다른 사람들의 생각 확인
  → 확장하기에서 여러 관점으로 돌아보기
  → 완료 후 원하는 그룹에 공유
```

아직 답하지 않은 질문의 결과와 그룹원 답변은 내 선택을 제출한 뒤에 열립니다. 그룹 대화에서는 답하기 전까지 그룹원의 글이 흐리게 보입니다. 그룹 가입만으로 내 답변이 공유되지는 않으며, 공유할 그룹을 직접 선택하고 저장해야 합니다.

## 주요 기능

| 영역 | 구현 내용 |
| --- | --- |
| 시작·온보딩 | 시작 화면, 아이디 가입·로그인 화면, 서비스 안내 4장 |
| 오늘 | 답할수록 자라는 세계수와 업적 열매, 이번 주 출석, 오늘의 질문, 가입 그룹 |
| 생각 | 위아래로 넘기는 철학 역설 피드, 댓글·답글·공감, 공유 |
| 질문 | 지난 질문 답변, 검색, 답변 상태 필터 |
| Answers | Server submission and statistics, anonymous opinions, approved reading, completion and retry |
| 그룹 | 만들기, 초대 코드 참여, 질문별 그룹 대화, 멤버·코드 복사, 그룹장의 설정·내보내기, 나가기 |
| Sharing | Preview, multiple groups, saved targets, append-only shared messages and native external sharing |
| 나 | 프로필(사진·소개), 열매, 달력과 날짜별 답변, 내 댓글, 다른 사람 프로필 |

질문별 선택·이유·공유 초안은 탭 이동과 새로고침 뒤에도 남습니다. 끝내지 않은 질문은 마지막으로 보던 단계에서 이어지고, 끝낸 질문은 요약 화면으로 열립니다. 화면과 규칙은 [docs/APP_FLOW.md](docs/APP_FLOW.md), 세계수와 업적은 [docs/ACHIEVEMENTS.md](docs/ACHIEVEMENTS.md)에 정리되어 있습니다.

## 로컬 실행

Node.js 22.12+, npm and the running Java 25 backend are required. Copy `.env.example` to `.env.local` for local development. See the integration guide for backend configuration.

```sh
git clone https://github.com/jeondowon/galae.git
cd galae
npm ci
cp .env.example .env.local
npm run dev
```

터미널에 표시된 로컬 주소로 접속합니다. 기본 주소는 `http://localhost:5173`이며, 포트가 사용 중이면 다른 포트로 실행됩니다.

### 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm test` | 상태 저장·복원 회귀 테스트 실행 |
| `npm run build` | `dist/`에 배포용 파일 생성 |
| `npm run preview` | 빌드 결과를 로컬에서 미리보기 |

빌드 결과를 확인하려면 `npm run build` 이후 `npm run preview`를 실행합니다.

## Server data and local storage

Questions, statistics, submitted answers, approved reading, groups, messages, profiles and achievements come from the server. Only unsubmitted answer drafts remain in localStorage, separated by API URL and user ID. iOS credentials are stored in Keychain; browser verification uses sessionStorage. Logout clears the active account state, credentials and local drafts. The server currently does not revoke issued JWTs.

The server seeds six September questions. Older questions retain their publication dates and are labeled as recent questions. All seeded thought topics remain hidden until reviewed; an empty feed is expected. Sample users, statistics, groups and comments are not displayed. The demo reset action has been removed.

Run `npm test` for unit/regression checks and `npm run test:e2e` against a disposable local backend for two-account browser integration. Use `npm run ios:sync:local` for Simulator development. The public API is set in `.env.production`. Run `npm run ios:prepare-release` before distribution.

## 기술 구성

| 항목 | 사용 기술 |
| --- | --- |
| 화면 | React 19, JavaScript, JSX |
| 개발·빌드 | Vite 8 |
| 스타일 | CSS, Pretendard, 고운바탕 |
| 화면 이동 | URL 해시 기반 라우팅 |
| Data | REST API, React state, account-specific local drafts; iOS Keychain sessions |
| Tests | Node.js test runner and Playwright browser integration |

글꼴은 외부 CDN에서 불러오며, 연결할 수 없으면 기본 글꼴로 표시됩니다.

## 프로젝트 구조

```text
src/
  api.js            # Authenticated API client and shared token refresh
  session.js        # iOS Keychain / browser session storage
  serverState.js    # API response mapping and account draft isolation
  useServer.js      # Server reads, mutations and active conversation polling
  App.jsx           # Screen routing and server actions
  components/       # 헤더, 하단 탭, 아이콘 등 공통 UI
  screens/          # 오늘, 생각, 질문, 그룹, 나 등 화면
  questionData.js   # Legacy demo fixtures and formatting helpers; not the server data source
  topics.js         # Legacy demo feed rotation
  store.js          # Shared flow helpers and legacy demo regression functions
  achievements.js   # Achievement display definitions; awards come from the backend
  motifs.jsx        # 갈래 모티프, 세계수
  index.css         # 공통 스타일과 반응형 화면 구성
content/
  paradoxes.json    # 생각 피드 역설 주제
tests/
  store.test.js     # 질문별 초안, 공유, 탈퇴, 프로필·메시지·댓글, 데이터 복원 테스트
docs/
  PURPOSE.md        # 기획 의도
  PLAN.md           # 설계 노트: 시장, 리텐션, 해설·AI, 출처 데이터, 디자인, 기술
  APP_FLOW.md       # 화면, 경로, 규칙, 저장 구조
  ACHIEVEMENTS.md   # 세계수와 업적
  DEPLOY.md         # 공모전 제출용 배포 방안
  VERIFICATION.md   # 역설 카드 검증 기준과 기록
  paradox-topics.md # 역설 주제 후보
```

## 관련 문서

- [기획 의도](docs/PURPOSE.md)
- [설계 노트](docs/PLAN.md)
- [화면과 사용자 흐름](docs/APP_FLOW.md)
- [세계수와 업적](docs/ACHIEVEMENTS.md)
- [배포 방안](docs/DEPLOY.md)
- [역설 피드 검증 기록](docs/VERIFICATION.md)
- [역설 주제 후보](docs/paradox-topics.md)

See `docs/IOS_BACKEND_INTEGRATION.md` for current server integration and storage behavior. `docs/APP_FLOW.md` retains the original product flow specification.

## iOS release development

The `release/ios-app-store` branch includes a Capacitor iOS project. Build and
sync a local development bundle with `npm run ios:sync:local`, then open Xcode with `npm run ios:open`. Use `npm run ios:prepare-release` after configuring the hosted API for distribution.
See [the integration guide](docs/IOS_BACKEND_INTEGRATION.md) for local setup, native sessions and TestFlight preparation. Physical-device validation and distribution signing are still required before upload.
