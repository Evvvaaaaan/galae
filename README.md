# 갈래

**하나의 질문, 여러 갈래의 생각.**

갈래는 일상의 딜레마에 먼저 나의 선택을 남기고, 다른 사람들의 생각과 성경의 시선을 통해 자신의 판단을 돌아보는 서비스입니다. 기독교 대학생과 청년 공동체를 대상으로, 정답을 정하기보다 선택의 이유를 생각하고 나누는 경험을 지향합니다.

이 브랜치는 iOS 앱 릴리스용으로 기존 [갈래 백엔드](https://github.com/ggm77/galae-backend)에 연결됩니다. 인증, 질문·답변, 그룹, 공유, 프로필, 검수를 마친 생각 피드는 서버 API를 쓰고, iOS 세션은 Keychain에 저장합니다. 통합과 릴리스 절차는 [통합·릴리스 안내](docs/IOS_BACKEND_INTEGRATION.md)에서 시작합니다. API 주소에는 `/api/v1`이 포함되어야 하며, 기존 데모 데이터는 실제 계정으로 옮기지 않습니다.

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
| 생각 | 위아래로 넘기는 주제 피드와 상세 페이지, 댓글·답글·공감 |
| 질문 | 지난 질문 답변, 검색, 답변 상태 필터 |
| 답변 | 서버 제출과 통계, 익명 의견, 확장하기(관점별 해설), 끝낸 질문의 요약·다시 하기 |
| 그룹 | 만들기, 초대 코드 참여, 질문별 그룹 대화, 멤버·코드 복사, 그룹장의 설정·내보내기, 나가기 |
| 공유 | 내용 미리보기, 여러 그룹 선택, 보낸 메시지 유지, 공유 초안 보존 |
| 나 | 프로필(사진·소개), 열매, 달력과 날짜별 답변, 내 댓글, 다른 사람 프로필 |

질문별 선택·이유·공유 초안은 탭 이동과 새로고침 뒤에도 남습니다. 끝내지 않은 질문은 마지막으로 보던 단계에서 이어지고, 끝낸 질문은 요약 화면으로 열립니다. 화면과 규칙은 [docs/APP_FLOW.md](docs/APP_FLOW.md), 세계수와 업적은 [docs/ACHIEVEMENTS.md](docs/ACHIEVEMENTS.md)에 정리되어 있습니다.

## 로컬 실행

Node.js 22.12 이상, npm과 실행 중인 Java 25 백엔드가 필요합니다. `.env.example`을 `.env.local`로 복사해 API 주소를 설정합니다.

```sh
git clone https://github.com/jeondowon/galae.git
cd galae
npm ci
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

## Runtime data and storage

The release app uses the Java backend for accounts, questions, approved thought
cards, answers, groups, comments, sharing and statistics. Only reviewed thought
cards are shown, including during local development. Empty feeds show an explicit
unpublished-content message.

Native session tokens are stored in iOS Keychain; browser tokens use
`sessionStorage`. Only unsubmitted drafts and achievement display state use
`localStorage`, with drafts isolated by API and account. Demo accounts and records
are never migrated into server accounts.

Legacy demo stores and fixtures remain for regression tests and design comparisons.
The production app imports separate state, question and achievement helpers so
those fixture texts are excluded from the release JavaScript bundle.

Reports are prepared for the support mailbox. Users must send the email themselves;
copying or preparing a report does not submit it. Blocking is a separate server
action, available from the block icon in a user profile's header.

See [frontend release readiness](docs/FRONTEND_RELEASE_READINESS.md) for verified
changes and the remaining device, signing and App Store Connect work.

## 기술 구성

| 항목 | 사용 기술 |
| --- | --- |
| 화면 | React 19, JavaScript, JSX |
| 개발·빌드 | Vite 8 |
| 스타일 | CSS, Pretendard, 고운바탕 |
| 화면 이동 | URL 해시 기반 라우팅 |
| 상태 저장 | React 상태와 브라우저 `localStorage` |
| 자동 테스트 | Node.js 기본 테스트 러너 |

Pretendard and Gowun Batang are bundled locally with their licenses in
`public/fonts`; opening the app does not request fonts from external CDNs.

## 프로젝트 구조

```text
src/
  App.jsx           # 화면 이동과 앱 상태 연결
  components/       # 헤더, 하단 탭, 아이콘 등 공통 UI
  screens/          # 오늘, 생각, 질문, 그룹, 나 등 화면
  serverState.js    # Server response mapping and account-specific drafts
  useServer.js      # API-backed application state
  state.js          # Runtime state and route helpers
  questionHelpers.js # Runtime choice and date helpers
  achievementHelpers.js # Runtime achievement metadata and date helpers
  questionData.js   # Legacy demo fixtures for tests
  store.js          # Legacy demo store for regression tests
  achievements.js   # Legacy demo achievement calculation
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
  QUESTIONS.md      # 오늘의 질문 목록과 확장하기 성경 초안
  VERIFICATION.md   # 생각 탭 주제와 오늘의 질문 검증 기준·기록
  paradox-topics.md # 역설 주제 후보
```

## 관련 문서

- [기획 의도](docs/PURPOSE.md)
- [설계 노트](docs/PLAN.md)
- [화면과 사용자 흐름](docs/APP_FLOW.md)
- [세계수와 업적](docs/ACHIEVEMENTS.md)
- [배포 방안](docs/DEPLOY.md)
- [오늘의 질문 목록](docs/QUESTIONS.md)
- [검증 기록](docs/VERIFICATION.md)
- [역설 주제 후보](docs/paradox-topics.md)

현재 화면·저장·공유 정책은 `docs/APP_FLOW.md`를 기준으로 합니다.
