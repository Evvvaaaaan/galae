// 성경 외 관점은 콘텐츠가 준비될 때까지 쓰는 자리 표시용 목업입니다.
const PLACEHOLDER_PERSPECTIVES = [{ label: '철학', body: '철학의 관점이 들어갈 자리입니다.' }, { label: '오늘의 연구', body: '오늘날 연구의 관점이 들어갈 자리입니다.' }];

// 고정된 데모 콘텐츠입니다. 날짜와 참여 수는 실제 서비스 데이터가 아닙니다.
export const QUESTIONS = [
  {
    id: 'q037', date: '2026-09-25', title: '친구의 잘못을 알게 된다면',
    body: '친구가 시험에서 부정행위를 한 사실을 알게 되었습니다. 당신이라면 어떻게 하시겠습니까?', participants: 1284,
    choices: [{ id: 0, text: '바로 교수님께 알린다', short: '바로 교수님께 알린다', pct: 24 }, { id: 1, text: '친구에게 먼저 이야기하고 스스로 바로잡을 기회를 준다', short: '먼저 이야기한다', pct: 67 }, { id: 2, text: '친구 관계를 생각해 모른 척한다', short: '모른 척한다', pct: 9 }],
    opinions: [{ items: ['규칙이 지켜지지 않으면 성실하게 준비한 사람이 손해를 봅니다.', '개인적으로 말하는 것만으로 해결되지 않는 경우를 여러 번 봤습니다.', '친구를 위해서라도 일이 더 커지기 전에 멈추게 하는 게 맞다고 봅니다.', '모른 척하면 저도 그 일에 함께한 것처럼 느껴질 것 같습니다.'] }, { items: ['스스로 정리할 기회를 주는 편이 그 사람에게 더 남는다고 생각합니다.', '알리는 일과 말하는 일 중 하나만 고를 필요는 없다고 봅니다. 순서의 문제에 가깝습니다.', '먼저 묻지 않고 판단했던 일이 오래 마음에 남았습니다.', '친구가 어떤 사정이었는지 듣고 나서 판단해도 늦지 않다고 생각합니다.'] }, { items: ['제가 개입할 자리가 아니라고 느낄 때가 있습니다.', '확실히 본 것이 아니라면 섣불리 말하기 어렵습니다.', '친구를 잃을까 봐 두려운 마음이 솔직히 큽니다.', '결국 스스로 책임지게 될 일이라고 생각합니다.'] }],
    reading: { perspectives: [{ label: '성경', body: '성경은 잘못을 덮는 것만을 사랑으로 보지 않습니다. 진실을 말하는 일과 회복을 돕는 일이 함께 갈 수 있다고 이야기합니다. 한 사람을 바로 세우는 일은 대개 그 사람에게 먼저 말하는 데서 시작합니다.', verse: '사랑 안에서 참된 것을 하여', ref: '에베소서 4:15' }, ...PLACEHOLDER_PERSPECTIVES] },
  },
  {
    id: 'q036', date: '2026-09-24', title: '먼저 사과하는 용기',
    body: '친구와 다툰 뒤 연락이 끊겼습니다. 서로에게 잘못이 있다고 느끼지만, 친구는 먼저 연락하지 않습니다. 당신이라면 어떻게 하시겠습니까?',
    participants: 986,
    choices: [{ id: 0, text: '먼저 연락해 내 잘못을 사과한다', short: '먼저 사과한다', pct: 52 }, { id: 1, text: '감정이 가라앉을 때까지 시간을 둔다', short: '시간을 둔다', pct: 36 }, { id: 2, text: '친구가 먼저 연락하기를 기다린다', short: '연락을 기다린다', pct: 12 }],
    opinions: [{ items: ['내 몫의 잘못부터 인정하면 대화를 시작할 수 있을 것 같아요.', '누가 먼저인지 따지다 보면 시간이 너무 흘러버려요.', '사과한다고 지는 건 아니라고 생각해요.', '친구도 같은 마음으로 망설이고 있을지 몰라요.'] }, { items: ['화가 난 채로 이야기하면 다시 상처를 줄까 봐 걱정돼요.', '조금 지나면 무엇이 서운했는지 더 정확히 말할 수 있을 것 같아요.', '서로 숨 고를 시간이 필요하다고 느껴요.', '급하게 꺼낸 사과는 진심으로 들리지 않을 수도 있어요.'] }, { items: ['늘 내가 먼저 다가가는 관계인지도 돌아보고 싶어요.', '친구도 자기 몫을 돌아볼 시간이 필요하다고 봐요.', '이번에는 친구의 마음을 먼저 확인하고 싶어요.'] }],
    reading: { perspectives: [{ label: '성경', body: '화해를 향한 첫걸음은 상대의 잘못을 모두 받아들이는 일과 같지 않습니다. 자신의 몫을 인정하면서도 서로의 마음을 충분히 들을 수 있습니다. 관계를 회복할 준비가 되었는지 돌아보세요.', verse: '내가 먼저 건넬 수 있는 말은 무엇일까요?', ref: '함께 묵상하기 · 마태복음 5:23–24' }, ...PLACEHOLDER_PERSPECTIVES] },
  },
  {
    id: 'q035', date: '2026-09-23', title: '함께한 일, 다른 무게',
    body: '팀 과제에 거의 참여하지 않은 팀원이 같은 점수를 받게 되었습니다. 개인적인 사정이 있었다고 합니다. 당신이라면 어떻게 하시겠습니까?', participants: 1102,
    choices: [{ id: 0, text: '실제 기여도를 교수님께 알린다', short: '기여도를 알린다', pct: 31 }, { id: 1, text: '사정을 듣고 남은 역할을 함께 정한다', short: '남은 역할을 정한다', pct: 58 }, { id: 2, text: '이번에는 같은 점수를 받도록 한다', short: '같은 점수를 받는다', pct: 11 }],
    opinions: [{ items: ['함께 애쓴 팀원들의 시간도 존중받아야 해요.', '사정이 있었다면 그 사정도 함께 말씀드리면 된다고 생각해요.', '모두 같은 점수를 받으면 다음에도 같은 일이 반복될 것 같아요.'] }, { items: ['아직 할 수 있는 일이 있다면 기회를 주고 싶어요.', '사정을 모르고 판단하면 나중에 후회할 것 같아요.', '팀원으로서 함께 마무리하는 경험이 더 중요해 보여요.', '다른 팀원들과 먼저 상의해보고 싶어요.'] }, { items: ['어려울 때 서로의 짐을 져줄 수도 있다고 생각해요.', '저도 도움을 받았던 때가 있었어요.', '이번 한 번으로 그 사람을 판단하고 싶지 않아요.'] }],
    reading: { perspectives: [{ label: '성경', body: '서로의 짐을 나누는 마음과 자기 몫을 감당하는 책임은 함께 생각할 수 있습니다. 사정을 듣는 일에서 시작해 공동체가 받아들일 수 있는 약속을 찾아보세요.', verse: '배려와 책임을 함께 지키는 방법은 무엇일까요?', ref: '함께 묵상하기 · 갈라디아서 6:2–5' }, ...PLACEHOLDER_PERSPECTIVES] },
  },
  {
    id: 'q034', date: '2026-09-22', title: '내게 더 주어진 것',
    body: '아르바이트 급여가 약속보다 더 들어왔습니다. 사장님은 아직 모르시는 것 같습니다. 당신이라면 어떻게 하시겠습니까?', participants: 873,
    choices: [{ id: 0, text: '바로 연락해서 초과 금액을 돌려드린다', short: '바로 돌려드린다', pct: 61 }, { id: 1, text: '추가 수당인지 먼저 확인한다', short: '먼저 확인한다', pct: 34 }, { id: 2, text: '다음 급여까지 기다려본다', short: '기다려본다', pct: 5 }],
    opinions: [{ items: ['내 몫이 아니라는 걸 알면 마음이 불편할 것 같아요.', '작은 금액이라도 나중에 알게 되면 신뢰가 깨질 것 같아요.', '사장님 입장이었다면 알려주길 바랐을 거예요.', '고민할수록 더 말하기 어려워질 것 같아요.'] }, { items: ['추측하기 전에 정확한 상황을 알고 싶어요.', '혹시 수당이 맞다면 괜히 번거롭게 할 수도 있으니까요.', '확인한 뒤에 돌려드려도 늦지 않다고 생각해요.'] }, { items: ['정산 과정에서 조정될 수도 있지 않을까요.', '다음 달에 사장님이 먼저 말씀하실 수도 있으니까요.', '제가 먼저 말을 꺼내기가 어색할 것 같아요.'] }],
    reading: { perspectives: [{ label: '성경', body: '작은 일에서의 신뢰도 관계를 만들어갑니다. 내게 유리한 상황을 마주했을 때 사실을 확인하고 상대에게 알리는 과정에는 어떤 마음이 필요한지 생각해보세요.', verse: '내 몫을 정하는 기준은 무엇인가요?', ref: '함께 묵상하기 · 누가복음 16:10' }, ...PLACEHOLDER_PERSPECTIVES] },
  },
  {
    id: 'q033', date: '2026-09-21', title: '도움이 필요하다는 말',
    body: '혼자 감당하기 어려운 일이 생겼습니다. 가까운 사람들도 바빠 보여 도움을 청하기 망설여집니다. 당신이라면 어떻게 하시겠습니까?', participants: 764,
    choices: [{ id: 0, text: '믿을 수 있는 사람에게 솔직하게 말한다', short: '솔직하게 말한다', pct: 49 }, { id: 1, text: '작은 도움부터 구체적으로 부탁한다', short: '작은 도움을 부탁한다', pct: 42 }, { id: 2, text: '조금 더 혼자 해결해본다', short: '혼자 해결해본다', pct: 9 }],
    opinions: [{ items: ['말하지 않으면 서로의 어려움을 알기 힘들어요.', '혼자 버티다가 더 크게 무너진 적이 있어요.', '저도 누군가 말해주면 기꺼이 돕고 싶거든요.', '믿을 수 있는 사람이라면 바빠도 들어줄 거라 생각해요.'] }, { items: ['구체적으로 부탁하면 상대도 부담이 덜할 것 같아요.', '큰 부탁은 꺼내기 어렵지만 작은 건 말할 수 있을 것 같아요.', '무엇이 필요한지 정리하는 것부터가 도움이 돼요.'] }, { items: ['스스로 해볼 시간이 조금 더 필요해요.', '다른 사람에게 짐이 되고 싶지 않아요.', '어디까지 혼자 할 수 있는지 알고 싶어요.'] }],
    reading: { perspectives: [{ label: '성경', body: '도움을 주는 것뿐 아니라 받는 것도 함께 살아가는 방식입니다. 지금 나에게 필요한 도움은 무엇인지, 누구와 그 마음을 나눌 수 있는지 생각해보세요.', verse: '오늘 누구에게 손을 내밀 수 있을까요?', ref: '함께 묵상하기 · 전도서 4:9–10' }, ...PLACEHOLDER_PERSPECTIVES] },
  },
  {
    id: 'q032', date: '2026-09-20', title: '지키기 어려워진 약속',
    body: '친구와 오래전 정한 약속에 갈 수 없는 사정이 생겼습니다. 친구는 이 만남을 많이 기다렸습니다. 당신이라면 어떻게 하시겠습니까?', participants: 921,
    choices: [{ id: 0, text: '사정을 바로 설명하고 다른 날을 제안한다', short: '설명하고 조정한다', pct: 72 }, { id: 1, text: '어떻게든 원래 약속을 지킨다', short: '원래 약속을 지킨다', pct: 20 }, { id: 2, text: '상황이 나아질 때까지 조금 더 기다린다', short: '조금 더 기다린다', pct: 8 }],
    opinions: [{ items: ['상대가 준비할 수 있도록 미리 알리고 싶어요.', '숨기고 미루는 것보다 솔직한 게 덜 서운할 것 같아요.', '다른 날을 함께 정하면 마음이 조금 풀릴 것 같아요.', '저라도 미리 알려주는 쪽이 고마울 거예요.'] }, { items: ['기다린 마음을 생각하면 쉽게 바꾸기 어려워요.', '한 번 미루면 다음에도 쉽게 미루게 될까 봐요.', '오래 기다린 만큼 지켜주고 싶어요.'] }, { items: ['아직 상황이 확실하지 않아서 고민돼요.', '괜히 먼저 말했다가 상황이 괜찮아질 수도 있잖아요.', '확실해지면 그때 이야기해도 늦지 않을 것 같아요.'] }],
    reading: { perspectives: [{ label: '성경', body: '약속을 소중히 여기는 마음은 지킬 수 없게 되었을 때도 드러납니다. 상황을 솔직하게 전하고 상대의 시간을 배려할 수 있는 방법을 찾아보세요.', verse: '지금 할 수 있는 책임 있는 행동은 무엇인가요?', ref: '함께 묵상하기 · 마태복음 5:37' }, ...PLACEHOLDER_PERSPECTIVES] },
  },
];

export const TODAY = QUESTIONS[0];
// 다른 사람의 샘플 프로필입니다. answers는 선택 수(나무의 선 수), streak은 연속 일수, comments는 댓글 수, achieved는 맺은 업적(맺은 순서)입니다.
const achieved = list => Object.fromEntries(list.map(([id, on]) => [id, { on }]));
export const MEMBERS = [
  { id: 'm1', name: '서연', handle: 'seoyeon.k', color: 'peach', photo: '/members/m1.jpg', bio: '천천히 읽고 오래 생각하는 편이에요.', answers: 64, streak: 41, comments: 31, achieved: achieved([['first', '2026-08-21'], ['past', '2026-08-22'], ['comment1', '2026-08-25'], ['streak7', '2026-08-27'], ['share1', '2026-08-28'], ['answer10', '2026-08-30'], ['streak30', '2026-09-19'], ['answer30', '2026-09-20']]) },
  { id: 'm2', name: '민준', handle: 'minjun_02', color: 'blue', bio: '질문 하나로 하루를 시작해요.', answers: 23, streak: 12, comments: 9, achieved: achieved([['first', '2026-09-30'], ['comment1', '2026-10-02'], ['streak7', '2026-10-06'], ['answer10', '2026-10-09']]) },
  { id: 'm3', name: '하은', handle: 'haeun', color: 'sage', bio: '목요일 모임 사람들과 함께 걸어요.', answers: 112, streak: 3, comments: 57, achieved: achieved([['first', '2026-07-01'], ['share1', '2026-07-02'], ['past', '2026-07-03'], ['comment1', '2026-07-04'], ['streak7', '2026-07-07'], ['answer10', '2026-07-10'], ['share10', '2026-07-24'], ['streak30', '2026-07-30'], ['answer30', '2026-07-31'], ['answer100', '2026-10-24']]) },
  { id: 'm4', name: '지우', handle: 'jiwoo.day', color: 'lilac', bio: '', answers: 6, streak: 2, comments: 2, achieved: achieved([['first', '2026-10-30'], ['comment1', '2026-11-01']]) },
];
export const DEMO_GROUPS = [
  { id: 'g1', name: '한 걸음 청년부', description: '서로의 생각을 듣고, 함께 한 걸음씩 자라가요.', code: 'GARA01', color: 'sage', owner: false, members: MEMBERS.slice(0, 3) },
  { id: 'g2', name: '목요일의 작은 모임', description: '목요일마다 나누는 우리의 질문과 이야기.', code: 'GARA26', color: 'peach', owner: true, members: MEMBERS.slice(2) },
];
export const SAMPLE_SHARES = [
  { groupId: 'g1', questionId: 'q037', memberId: 'm1', sel: 1, note: '잘못을 말해주는 것도 친구를 아끼는 방법일 수 있겠다는 생각이 들었어요.' },
  { groupId: 'g1', questionId: 'q037', memberId: 'm2', sel: 0, note: '같이 시험을 준비한 사람들의 마음도 생각하게 돼요.' },
  { groupId: 'g1', questionId: 'q036', memberId: 'm3', sel: 0, note: '누가 먼저인지보다 다시 이야기할 수 있다는 게 더 소중해요.' },
  { groupId: 'g2', questionId: 'q037', memberId: 'm3', sel: 1, note: '먼저 친구의 이야기를 들어보고 싶어요.' },
];
// 그룹에 남아 있는 멤버가 이 질문에 나눈 샘플 공유입니다.
export const groupShares = (group, questionId) => SAMPLE_SHARES.filter(s => s.groupId === group.id && s.questionId === questionId && group.members.some(m => m.id === s.memberId));
export const SAMPLE_COMMENTS = [
  { id: 's1', likes: 12, topicId: 'p001', memberId: 'm1', text: '저도 몇 년 전과는 많이 달라졌는데, 그래도 같은 사람이라고 느껴요.' },
  { id: 's2', likes: 5, topicId: 'p001', memberId: 'm2', text: '기억이 이어져 있다면 같은 배라고 볼 수 있지 않을까요?' },
  { id: 's7', likes: 4, topicId: 'p004', memberId: 'm4', text: '언제부터 어른이 되었는지도 비슷한 질문 같아요.' },
  { id: 's8', likes: 7, topicId: 'p004', memberId: 'm3', text: '경계가 흐릿해도 차이는 분명히 있다고 생각해요.' },
  { id: 's9', likes: 9, topicId: 'p005', memberId: 'm1', text: '저도 고르지 못하고 미룬 적이 많아서 공감됐어요.' },
  { id: 's10', likes: 1, topicId: 'p005', memberId: 'm2', text: '어느 쪽이든 고르는 것 자체가 이유가 될 수도 있겠어요.' },
];
// 서버가 없어서 쓰는 샘플 알림입니다. 알림 목록에 나올 수 있는 형식을 모두 담습니다.
export const SAMPLE_NOTIFICATIONS = [
  { id: 'n1', kind: 'reply', memberIds: ['m1'], topicId: 'p001', text: '저도 비슷하게 생각했어요. 기억이 이어져 있으면 같은 사람 같아요.' },
  { id: 'n4', kind: 'like', memberIds: ['m2'], topicId: 'p001' },
];
export const choiceOf = (question, sel) => question.choices.find(c => c.id === sel);
export const dateLabel = date => `${Number(date.slice(0, 4))}년 ${Number(date.slice(5, 7))}월 ${Number(date.slice(8, 10))}일`;
