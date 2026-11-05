# 검증 기록

생각 탭 주제와 오늘의 질문의 검증 기준과 기록입니다.

## 생각 탭

### 검증 기준

- 카드의 사실 주장(인물, 시기, 사건, "많은 사람이 ~한다" 같은 경향)은 **서로 다른 출처 두 곳 이상에서 직접 확인**한다. 출처는 SEP·IEP·원전·위키백과 중에서 고른다.
- 실존 인물의 대사는 지어내지 않는다. 확인되지 않은 따옴표 인용은 쓰지 않는다.
- 전승과 신화는 사실처럼 쓰지 않는다. "~로 알려져 있습니다", "~라고 믿었습니다"로 표현한다.
- 확인되지 않은 세부(정확한 연도, 원전의 장·절, 누가 변형을 만들었는지)는 카드에서 빼거나 표현을 바꾼다.
- 모두 통과하면 `paradoxes.json`의 `checked`에 날짜를 넣는다. `checked`가 `null`인 주제는 노출하지 않는다.

p002 트롤리 문제, p003 아킬레우스와 거북, p006 순간이동 장치는 2026-11-05에 생각 탭에서 빼면서 검증 기록도 지웠습니다.

### 확인 강도

| 강도 | 뜻 |
| --- | --- |
| 직접 | 출처 페이지의 해당 구절을 원문 그대로 읽고 확인함 |
| 간접 | 요약본(AI 요약 포함)이나 다른 글의 재인용으로만 확인함. 통과 기준에 포함하지 않음 |
| 미확인 | 아직 근거를 찾지 못함 |

- 위키백과가 원전을 인용한 경우에는 **위키백과 직접 1곳**으로 센다. 원전을 직접 읽은 것으로 치지 않는다.
- 해석이나 생각해 보기 질문("~일까요?")은 사실 주장이 아니므로 확인 대상에서 뺀다.

### 절차

1. **초안 작성:** AI로 작성해도 된다. 카드마다 출처 후보를 함께 적는다.
2. **주장 뽑기:** 카드에서 사실 주장만 한 줄씩 뽑아 아래 표에 적는다.
3. **대조:** 주장마다 출처 페이지를 열어 해당 구절을 찾고, URL·구절 요약·확인 강도를 기록한다.
4. **판정:** 모든 주장이 서로 다른 두 곳에서 직접 확인되면 통과한다. 부족하면 출처를 더 찾거나, 카드에서 그 주장을 빼거나 완화한다.
5. **반복:** 카드를 고쳤으면 고친 문장으로 3번부터 다시 한다.
6. **기록:** 통과하면 `checked`에 날짜를 넣고, 이 문서에 결과와 고친 내용을 남긴다.

### 체크리스트

- [ ] 누가 제기했는지가 정확한가
- [ ] 입장을 공정하게 요약했는가
- [ ] 확인되지 않은 인용문이 없는가
- [ ] 비슷한 역설이나 변형과 섞이지 않았는가
- [ ] 시기, 숫자, "많은 사람이" 같은 표현에 근거가 있는가

---

### 2026-11-02 검증

1차 검증 때는 주장별 근거를 기록하지 않았고, 그 상태로 3개 주제를 통과시켰다. 주장별로 다시 기록해 보니 모든 주제에 직접 확인이 두 곳에 못 미치는 주장이 있었다. 그래서 **5개 모두 보류**로 바꾸었다.

#### p001 테세우스의 배 — 보류

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 아테네인들이 썩은 판자를 새것으로 교체하며 배를 보존했다 | [Wikipedia](https://en.wikipedia.org/wiki/Ship_of_Theseus)에 플루타르코스 『테세우스전』 23.1의 인용이 있음 | 직접 1곳 |
| 이 배가 철학자들의 논쟁거리가 되었다 | 위와 같은 인용 | 직접 1곳 |
| 홉스가 옛 판자로 다시 조립한 두 번째 배를 제시했다 | Wikipedia, 『물체론』 | 직접 1곳 |
| 홉스는 17세기 사람이다 (『물체론』 1655) | Wikipedia. 같은 페이지 안에서 1655와 1656이 함께 나옴 | 직접 1곳 |

남은 일: 원전(플루타르코스 영역본, [Gutenberg](https://www.gutenberg.org/files/14033/14033-h/14033-h.htm))을 직접 확인하기. 이번에는 요약본으로만 봤다. SEP 'Identity Over Time'에는 플루타르코스와 홉스가 나오지 않아서 다른 2차 출처가 필요하다.
고친 내용: "수백 년" → "오랫동안", "2천 년 뒤" → "17세기". 『물체론』의 장·절은 확인하지 못해 출처에서 뺐다.

#### p004 더미의 역설 — 보류

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 에우불리데스가 처음 제기한 것으로 알려져 있다 | [SEP 'Sorites Paradox'](https://plato.stanford.edu/entries/sorites-paradox/): 메가라학파의 에우불리데스(기원전 4세기)가 "흔히 처음 제기한 사람으로 꼽힌다" | 직접 1곳 |

남은 일: 두 번째 출처 확인하기 (IEP 또는 Wikipedia 'Sorites paradox').
고친 내용: "에우불리데스가 던진" → "처음 던진 것으로 알려져 있습니다".

#### p005 뷔리당의 당나귀 — 보류

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 이 이야기는 뷔리당의 이름으로 알려져 있지만, 그의 저작에는 나오지 않는다 | [Wikipedia](https://en.wikipedia.org/wiki/Buridan%27s_ass): "Buridan nowhere discusses this specific problem" | 직접 1곳 |
| 위와 같은 주장 | [SEP 'John Buridan'](https://plato.stanford.edu/entries/buridan/) | 간접 (요약본) |
| 아리스토텔레스 『천체론』 2권 13장에 비슷한 사례(배고프고 목마른 사람)가 있다 | Wikipedia 인용 (295b) | 직접 1곳 |
| 위와 같은 주장 | SEP 'John Buridan' (295b32) | 간접 (요약본) |
| 뷔리당은 두 선택지가 똑같이 좋으면 의지가 판단을 미룰 수밖에 없다고 보았다 | Wikipedia: "the will cannot break the deadlock, all it can do is to suspend judgement". SEP 요약에도 의지가 선택을 미룰 수 있다는 내용 (QNE III.5) | 직접 1곳 + 간접 (요약본) |
| 후대 사람들이 이 생각을 당나귀에 빗대어 풍자했다 | Wikipedia: "Later writers satirised this view in terms of an ass". 누가 처음 했는지는 나오지 않음 | 직접 1곳 |
| 가잘리는 똑같은 대추야자 두 개 앞에서도 사람은 하나를 고른다고 보았다 (『철학자들의 부정합』, 1100년 무렵) | Wikipedia | 직접 1곳 |
| 라이프니츠는 의식하지 못하는 작은 지각(petites perceptions)이 늘 있어 완벽한 균형은 없다고 보았다 | Wikipedia | 직접 1곳 |

남은 일: SEP 'John Buridan'의 해당 구절을 원문으로 직접 확인하기. 가잘리·라이프니츠 대목을 두 번째 출처(SEP 등)에서 확인하기.
고친 내용(2026-11-05): "그의 저작에는 당나귀가 등장하지 않는다" 문장을 빼고 뷔리당의 생각, 가잘리, 라이프니츠를 더했다.

### 2026-11-05 검증 (p006~p025)

20개 주제를 분야별로 작성하고 위 기준대로 검증했다. 모두 통과했다. 통과는 했지만 근거가 가장 약한 곳은 다음과 같다.

- p011: "253쌍"은 출처의 계산 방식(n(n-1)/2)으로 직접 계산한 값이다.
- p014: Nature 원문과 PubMed가 열리지 않아 Europe PMC 초록과 ScienceDaily 보도로 확인했다.
- p015: 위키백과는 탄소가 별에서 만들어진다는 데까지만 말하고, 몸을 직접 언급한 곳은 NHM 한 곳이다.
- p018: 직접 확인한 출처는 위키백과와 당시 영국 장교의 회고록 원전 두 곳뿐이다. IWM, Britannica에 접근할 수 있을 때 한 번 더 대조한다.
- 위키문헌의 개역한글 본문에는 오타와 현대식 표기가 섞여 있다(누가복음 15:14 "훙년", "일군"→"일꾼"). 구절은 반드시 대한성서공회 본문과 함께 대조한다.

### 2026-11-05 · 생각 탭 주제 검증 기록 (p006~p010)

#### 2026-11-05 검증

방법: 각 페이지를 직접 열어 해당 구절을 원문으로 확인했습니다. 작업 중 WebFetch 사용량 제한에 걸려, 이후에는 `curl`로 페이지 원문(위키백과는 `action=raw` 원문, SEP·LSE·Gutenberg는 HTML/텍스트)을 받아 해당 구절을 grep·sed로 읽었습니다. 검색 결과 스니펫만 본 내용은 근거로 쓰지 않았습니다.
주제 선정: `docs/paradox-topics.md`에서 ✅·⏸가 없는 후보 가운데 분야가 겹치지 않게 동일성(순간이동 장치), 마음(메리의 방), 윤리(기게스의 반지), 사회(무지의 베일), 확률(몬티 홀 문제)을 골랐습니다. 경험 기계는 기게스의 반지와 분야(윤리)가 겹쳐 뺐습니다.

#### p007 메리의 방 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 메리는 흑백 방에서 흑백 텔레비전 화면으로 세상을 연구하는 뛰어난 과학자다 | [SEP 'Qualia: The Knowledge Argument'](https://plato.stanford.edu/entries/qualia-knowledge/)와 [Wikipedia](https://en.wikipedia.org/wiki/Knowledge_argument) 모두 잭슨 원문 인용: "Mary is a brilliant scientist who is… forced to investigate the world from a black and white room via a black and white television monitor" | 직접 2곳 |
| 전공은 시각의 신경생리학이다 | 두 곳 모두 "She specializes(specialises) in the neurophysiology of vision" | 직접 2곳 |
| 잘 익은 토마토나 하늘을 볼 때 일어나는 일의 물리적 정보를 모두 안다 | 두 곳 모두 "all the physical information there is to obtain about what goes on when we see ripe tomatoes, or the sky" | 직접 2곳 |
| 방을 나와 색을 보면 새로운 것을 배우는가를 묻는다 | 두 곳 모두 "What will happen when Mary is released from her black and white room… Will she learn anything or not?" | 직접 2곳 |
| 잭슨이 1982년에 제시했다 | SEP: "Frank Jackson (1982) formulates…". Wikipedia: "proposed by Frank Jackson in his article \"Epiphenomenal Qualia\" (1982)" | 직접 2곳 |
| 새로 배운다면 물리적인 것이 전부가 아니라고 주장했다 | SEP 원문 인용: "Ergo there is more to have than that, and Physicalism is false". Wikipedia: "there are more properties than physicalists talk about" | 직접 2곳 |
| 잭슨은 훗날 이 논증을 받아들이지 않게 되었다 | SEP: "But Jackson changed his mind… something must be wrong with the knowledge argument". Wikipedia: 2023년 "I no longer accept the argument" | 직접 2곳 |

고친 내용: 초안의 "빛의 파장이 눈과 뇌에 작용하는지"는 SEP 인용에만 있고 Wikipedia 인용에는 없어 "무슨 일이 일어나는지"로 바꾸었습니다. "오스트레일리아의 철학자"는 국적을 직접 확인하지 못해 뺐습니다.

#### p008 기게스의 반지 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 리디아 왕을 섬기던 양치기가 지진으로 갈라진 땅속에서 금반지를 얻었다고 전해진다 | [Gutenberg, 『국가』 Jowett 역](https://www.gutenberg.org/cache/epub/1497/pg1497.txt): "Gyges was a shepherd in the service of the king of Lydia… an earthquake made an opening in the earth… a gold ring; this he took". [Wikipedia](https://en.wikipedia.org/wiki/Ring_of_Gyges): "a shepherd in the service of the king of Lydia. After an earthquake, a chasm… a golden ring" | 직접 2곳 |
| 반지를 만지다가 투명해지는 것을 알았다 | Gutenberg: "turn the collet of the ring inside his hand, when instantly he became invisible". Wikipedia: "by adjusting the ring, he gained the power of invisibility" | 직접 2곳 |
| 왕비를 유혹하고 왕비와 함께 왕을 죽인 뒤 나라를 차지했다고 전해진다 | Gutenberg: "he seduced the queen, and with her help conspired against the king and slew him, and took the kingdom". Wikipedia: "seduce the queen, and with her help, murder the king, and become king of Lydia" | 직접 2곳 |
| 『국가』 2권에서 글라우콘이 이 이야기를 꺼낸다 | Wikipedia: "Book 2 of his Republic (2:359a–2:360d)", "described by the character of Glaucon". Gutenberg: "BOOK II" 첫머리가 글라우콘의 문제 제기로 시작하고, 이 이야기는 그 발언 안에 있음 | 직접 2곳 |
| 반지가 있다면 정의로운 사람도 부정한 사람과 똑같이 행동할 것이라는 이야기다 | 두 곳 모두: "Then the actions of the just would be as the actions of the unjust; they would both come at last to the same point" | 직접 2곳 |
| 그 말대로라면 사람들은 원해서가 아니라 어쩔 수 없어서 정의롭다 | 두 곳 모두: "a man is just, not willingly… but of necessity" | 직접 2곳 |
| 글라우콘은 소크라테스에게 정의가 그 자체로 좋음을 보여 달라고 한다 | Gutenberg: "I want to hear justice praised in respect of itself". Wikipedia: "Glaucon wants Socrates to argue that it is beneficial for us to be just, independent of any consideration for our reputation" | 직접 2곳 |

고친 내용: 그리스어 원문에서는 반지를 얻은 사람이 "기게스의 조상"으로 나온다는 점(Wikipedia, Perseus 인용)과 Jowett 역의 "Gyges was a shepherd"가 어긋나므로, 카드 본문에서는 양치기의 이름을 쓰지 않고 "한 양치기"로 썼습니다. 반지 이름(기게스의 반지)은 두 출처 모두에 있습니다. "보석받이를 안쪽으로 돌리면"은 Gutenberg에만 있어 "만지작거리던"으로 완화했습니다. 글라우콘이 스스로는 그 의견이 아니라고 밝히는 대목은 Gutenberg에만 확인되어 넣지 않고, 대신 "이야기를 꺼냅니다"로 중립적으로 썼습니다.

#### p009 무지의 베일 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 베일 뒤에서는 자기 계층·재산·성별·재능 등을 모른다 | [SEP 'Original Position'](https://plato.stanford.edu/entries/original-position/): "no one knows their place in society, class position, wealth… race, gender, fortune or misfortune in the distribution of natural assets and abilities". [Wikipedia](https://en.wikipedia.org/wiki/Original_position): "without knowing what gender, race, abilities, tastes, wealth, or position in society they will have" | 직접 2곳 |
| 롤스가 1971년 『정의론』에서 이를 '무지의 베일'이라 불렀다 | Wikipedia: "Rawls's 1971 book, A Theory of Justice", "Rawls coined the phrases original position and veil of ignorance". SEP: "set forth in A Theory of Justice (TJ)", "chosen behind a 'veil of ignorance' (TJ 12/11)", "In the first edition of Theory… (Rawls 1971…)" | 직접 2곳 |
| 자기 처지를 모르니 자신에게 유리한 규칙을 고를 수 없다 | SEP: "without information enabling them to tailor principles of justice favorable to their personal circumstances and interests". Wikipedia: "force participants… to adopt an 'initial agreement' on the principles impartially" | 직접 2곳 |
| 롤스는 가장 불리한 사람에게 이익이 될 때만 불평등을 허용하는 원칙이 선택된다고 보았다 | SEP: "economic inequalities… arranged to maximally benefit the least advantaged… (the difference principle)". Wikipedia: "to the greatest benefit of the least advantaged (the difference principle)" | 직접 2곳 |
| 하사니는 같은 조건에서 평균 효용(평균적인 행복)을 최대화하는 원칙이 선택된다고 보았다 | SEP: "the parties in the original position would choose the principle of average utility instead of the principles of justice (Harsanyi 1975)". Wikipedia: "John Harsanyi's analysis suggests that rational individuals… would opt for maximizing average or total well-being" | 직접 2곳 |

고친 내용: "미국의 철학자"는 국적을 직접 확인하지 않아 뺐습니다. Wikipedia에 같은 생각이 롤스 이전(비크리, 하사니)에도 있었다고 나오므로 "롤스가 처음 생각했다"는 표현은 쓰지 않고 "불렀습니다"로 썼습니다. "이 결론에는 반론이 많다"는 경향 주장 대신 하사니라는 구체적 반론 하나로 바꾸었습니다. "경제학자" 같은 수식은 확인하지 않아 뺐습니다.
고친 내용(2026-11-05): 글이 어렵다는 의견이 있어 전체를 다시 썼다. 첫 단락의 케이크 나누기는 이해를 돕는 일상 예시이고 롤스가 든 예가 아니므로 롤스와 묶지 않았다. 차등 원칙 단락은 "가장 불리한 사람에게 이익이 될 때만 불평등 허용"(위 표, 직접 2곳)을 풀어 쓴 것이다. "사람들이 가장 나쁜 처지를 먼저 떠올려서 이 원칙을 고른다"는 이유는 넣지 않았다. SEP 6.2절 요약에 따르면 롤스의 맥시민 논증은 주로 제1원칙을 뒷받침한다(원문 대조 전).

#### p010 몬티 홀 문제 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 문 셋 중 하나 뒤에 자동차, 둘 뒤에 염소가 있고, 답을 아는 진행자가 염소 문을 하나 연다 | [vos Savant 'Game Show Problem' 보관본](https://web.archive.org/web/2013/http://marilynvossavant.com/game-show-problem/): "Behind one door is a car, behind the others, goats… the host, who knows what's behind the doors, opens another door… which has a goat". [Wikipedia](https://en.wikipedia.org/wiki/Monty_Hall_problem): 같은 문제문과 표준 가정 | 직접 2곳 |
| 바꾸면 이길 확률이 3분의 2, 처음 문은 3분의 1이다 | vos Savant: "The first door has a 1/3 chance of winning, but the second door has a 2/3 chance". Wikipedia: "the switching strategy has a 2/3 probability… keeping… only a 1/3 probability" | 직접 2곳 |
| 1990년 미국 잡지 『퍼레이드』 칼럼에 실렸다 | Wikipedia: "'Ask Marilyn' column in Parade magazine in 1990". vos Savant: "originally published in PARADE magazine in 1990 and 1991" | 직접 2곳 |
| 틀렸다는 편지가 수천 통 왔다 | vos Savant: "I'm receiving thousands of letters, nearly all insisting that I'm wrong". Wikipedia: "She received thousands of letters… the vast majority of which… disagreed" | 직접 2곳 |
| 그중 박사 학위자의 편지가 많았다 | Wikipedia: "including many from readers with doctorate degrees", "nearly 1,000 with PhDs". vos Savant: 반박 편지 다수에 "Ph.D." 서명(Robert Sachs, Scott Smith, Barry Pasternack 등)이 실려 있음 | 직접 2곳 |

고친 내용: "약 1만 명, 박사 약 1천 명"이라는 숫자는 Wikipedia(Tierney 1991 인용)에만 있어 "수천 통", "많았습니다"로 완화했습니다. 문제 이름이 진행자 몬티 홀에서 왔다는 내용은 Wikipedia에서만 확인해 카드에 넣지 않았습니다. 보스 사반트 개인 사이트는 현재 주소 대신 웹 아카이브 보관본을 열어 확인했습니다.

#### 체크리스트 (4개 공통)

- [x] 누가 제기했는지가 정확한가 (잭슨 1982, 플라톤 『국가』 2권의 글라우콘, 롤스 1971·하사니, 1990년 『퍼레이드』)
- [x] 입장을 공정하게 요약했는가 (메리의 방은 잭슨의 이후 입장 변화, 무지의 베일은 하사니의 반론을 함께 적음)
- [x] 확인되지 않은 인용문이 없는가 (따옴표 인용 없음)
- [x] 비슷한 역설이나 변형과 섞이지 않았는가 (기게스는 헤로도토스 판본과 섞지 않음)
- [x] 시기, 숫자, "많은 사람이" 같은 표현에 근거가 있는가

### 2026-11-05 · 생각 탭 과학 주제 검증 기록 (p011~p015)

검증일: 2026-11-05. 기준은 위 생각 탭 검증 기준과 같습니다. 주장마다 서로 다른 출처 두 곳에서 직접 확인되어야 통과합니다. 검색 결과 스니펫만 본 경우는 '간접'으로 적고 통과 기준에 넣지 않았습니다.

---

#### p011 생일 문제 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 23명이면 생일이 같은 두 사람이 있을 확률이 절반을 조금 넘는다 | [Wikipedia 'Birthday problem'](https://en.wikipedia.org/wiki/Birthday_problem): "only 23 people are needed for that probability to exceed 50%", P ≈ 50.7297%. [MathWorld](https://mathworld.wolfram.com/BirthdayProblem.html): 365일 가정에서 n = 23, P ≈ 0.507. [Durrett 1장(Temple 강의 자료)](https://cis.temple.edu/~latecki/Courses/CIS2033-Spring12/ElementaryProbabilityforApplications/ch1.pdf) 표: 23명이 모두 다를 확률 0.49270 | 직접 3곳 |
| 1년을 365일로 두고 계산한다(윤일 무시, 모든 날이 같은 확률) | Wikipedia, MathWorld("leap days is ignored"), Durrett("we ignore Feb. 29") | 직접 3곳 |
| 직관과 달리 높게 나온다(카드 2의 "그리 높지 않을 것 같습니다") | Wikipedia: "seems wrong at first glance but is, in fact, true". Durrett: "At first glance it is surprising" | 직접 2곳 |
| 23명 사이의 짝은 253쌍이다 | Wikipedia: 23명에 253쌍. Durrett: 같은 설명을 30명·435쌍((30·29)/2)으로 제시. 23·22/2 = 253은 같은 식으로 계산해 확인 | 직접 1곳 + 직접 1곳(같은 방법, 숫자는 계산) |
| 그 안에 나와 생일이 같은 사람이 있을 확률은 10%도 되지 않는다 | Wikipedia: 다른 23명이면 약 6.1%. Durrett: 내 생일과 겹치지 않을 확률 (364/365)^n 식 제시 → n = 22이면 약 5.9% | 직접 2곳 |
| 모두의 생일이 다를 확률을 거꾸로 구한다. 두 번째 사람은 364/365, 세 번째 사람은 363/365 … 23번째까지 곱하면 약 49.27% | Wikipedia: "it is simpler to calculate P(A′), the probability that no two people in the room have the same birthday", 365/365 × 364/365 × 363/365 × … × 343/365, P(A′) ≈ 0.492703. 같은 식을 직접 계산해 0.4927 확인 | 직접 1곳 + 계산 |
| 50명이면 약 97%, 70명이면 약 99.9% | Wikipedia 표: "50 ‖ 97.0%", "70 ‖ 99.9%". 같은 식으로 직접 계산해 0.9704, 0.9992 확인 | 직접 1곳 + 계산 |

고친 내용: '나와 같은 생일' 50%에 253명이 필요하다는 내용은 짝의 수 253과 헷갈릴 수 있어 카드에서 뺐습니다(Wikipedia와 Durrett 모두에서 확인은 됨). "많은 사람이 낮게 짐작한다" 대신 "그리 높지 않을 것 같습니다"로 완화했습니다.
고친 내용(2026-11-05): 설명을 더 자세히 해 달라는 의견이 있어, 모두의 생일이 다를 확률을 곱해 나가는 계산 과정(카드 3·4)과 50명·70명일 때의 확률(카드 5)을 더했다. 두 항목은 Wikipedia 원문(action=raw)과 직접 계산으로 확인했다. 253쌍과 같은 방식의 계산 확인이라 이 표에서 가장 약한 축에 든다.
참고: MathWorld는 Wolfram Research가 운영하는 수학 백과입니다. 이를 빼도 Wikipedia와 Durrett 두 곳으로 모든 주장이 통과합니다. 짝 253쌍은 Durrett에서 숫자 자체가 아니라 계산 방법을 확인한 것이라 가장 약한 항목입니다.

#### p012 보이지 않는 고릴라 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 한 팀의 패스 횟수를 세게 했다 | [Wikipedia 'Inattentional blindness'](https://en.wikipedia.org/wiki/Inattentional_blindness): "told either to count the passes made by one of the teams". [Simons(2010) i-Perception](https://pmc.ncbi.nlm.nih.gov/articles/PMC3563049/): 한 무리의 선수가 공을 패스한 횟수를 세고 다른 무리는 무시하게 하는 과제 | 직접 2곳 |
| 고릴라 옷을 입은 사람이 장면을 지나간다 | Wikipedia: "wearing a full gorilla suit" 사람이 장면을 지나감. Simons(2010): 'gorilla'가 경기 장면 가운데로 들어왔다가 나감 | 직접 2곳 |
| 절반가량이 고릴라를 보지 못했다 | Wikipedia: "In most groups, 50% of the subjects did not report seeing the gorilla". Simons(2010): "Only 50% of observers noticed" | 직접 2곳 |
| 이런 현상을 무주의 맹시라고 부른다 | Wikipedia 문서 제목·정의, Simons(2010) 제목 "inattentional-blindness task" | 직접 2곳 |

고친 내용: 고릴라가 가슴을 두드리고 9초 동안 화면에 있었다는 설명은 Simons(2010)에서 확인했지만, 1999년 영상인지 2010년 영상인지 구분되지 않아 뺐습니다. "숨어 있지도 않았고, 금방 사라지지도 않았습니다"도 같은 이유로 뺐습니다. 발표 연도(1999)와 연구자 이름은 Wikipedia 한 곳에서만 직접 확인되어 카드에 넣지 않았습니다(원 논문 PDF는 열리지 않았음).

#### p013 마시멜로 실험 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 스탠퍼드의 심리학자 미셸의 연구다 | [Wikipedia](https://en.wikipedia.org/wiki/Stanford_marshmallow_experiment): Walter Mischel, Stanford. [Watts 외(2018)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6050075/): "children who attended a preschool on the Stanford University campus", Shoda, Mischel & Peake(1990) | 직접 2곳 |
| 기다리면 간식을 더 받을 수 있었다 | Wikipedia: 바로 받는 작은 보상 하나 또는 기다리면 두 개. Watts 외: 기다리면 한 몫을 더 받고, 종을 울리면 원래 양만 받음 | 직접 2곳 |
| 후속 연구에서 오래 기다린 아이가 학업 성적이 더 높았다고 보고되었다 | Wikipedia: 1990년 후속 연구가 SAT 점수와 연결. Watts 외: "Shoda and colleagues (1990) observed large correlations between delay time and SAT scores" | 직접 2곳 |
| 2018년에 훨씬 많고 다양한 아이들로 다시 연구했다 | Watts 외: 분석 표본 918명, 원 연구는 스탠퍼드 공동체 아이들. Wikipedia: "larger replication with a more diverse sample" | 직접 2곳 |
| 연관성은 원래의 절반 정도였다 | Watts 외 초록: "only half the size of those reported in the original studies". Wikipedia: "only half the effect of the original study" | 직접 2곳 |
| 가정 배경 등을 고려하자 더 줄었다 | Watts 외 초록: "reduced by two thirds in the presence of controls for family background, early cognitive ability, and the home environment". Wikipedia: 통제 후 효과가 더 줄었음 | 직접 2곳 |
| 2012년 실험에서 약속을 어기는 어른을 먼저 겪은 아이들이 훨씬 짧게 기다렸다 | [University of Rochester 보도자료(2012)](https://www.rochester.edu/news/printable.php?id=4622): 28명, 미술 도구 약속을 어긴 조건 평균 3분 2초, 지킨 조건 12분 2초, 학술지 Cognition. Wikipedia: Kidd 외 2012, 28명, 믿을 만한 조건이 더 오래 기다림 | 직접 2곳 |
| 기다림이 믿음과 관련될 수 있다 | Rochester: 두 번째 마시멜로가 올 것이라 믿을 때만 기다림이 합리적 선택이라는 Kidd의 설명. Wikipedia: 자기 통제만으로 읽기 어렵다는 저자들의 주장 | 직접 2곳 |

고친 내용: 원 연구의 연도(1970·1972), 대기 시간(15분), "참을성이 성공을 이끈다는 이야기로 널리 퍼졌다"는 표현은 두 곳에서 같은 형태로 확인하지 못해 뺐습니다. 카드 2는 질문으로 바꾸었습니다. "3분의 2"는 Watts 외 한 곳뿐이라 "더 줄어들었습니다"로 완화했습니다. Wikipedia 문서 자체에 1970년과 1972년 실험이 섞여 있다는 경고가 있어, 원 연구의 세부는 카드에 넣지 않았습니다.
재현성 논란: 2018년 연구는 원 연구의 연관성 자체를 부정하지 않았고(15세 성취와의 연관은 유의), 크기가 작고 배경 요인으로 상당 부분 설명된다는 결과입니다. 카드는 이 범위 안에서만 썼습니다. 이 연구가 과하게 통제했다는 반론(Doebel 외)이 있다는 것은 검색 스니펫으로만 보아(간접) 카드에 넣지 않았습니다.

#### p014 떠올릴 때마다 다시 쓰이는 기억 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 2000년, 쥐에게 공포 기억을 학습시키고 다시 떠올리게 했다 | [Nader, Schafe & LeDoux(2000) 초록, Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1038/35021052&resultType=core&format=json): Sprague-Dawley 쥐, 공포 조건화 후 재활성화. [ScienceDaily(2002) 보도](https://www.sciencedaily.com/releases/2002/12/021211083732.htm): 쥐에게 만든 공포 기억을 1~12일 뒤 재활성화 | 직접 2곳 (연도 2000은 Europe PMC와 Wikipedia 참고문헌) |
| 떠올린 직후 편도체의 단백질 합성을 막자 기억을 잃은 듯했다 | Europe PMC 초록: 재활성화 직후 편도체에 anisomycin 주입 → 이후 검사에서 기억 상실. ScienceDaily: 재활성화 후 편도체 단백질 생성을 막으면 "the memory is lost". Wikipedia 참고문헌 제목 "Fear memories require protein synthesis in the amygdala for reconsolidation after retrieval" | 직접 2곳 |
| 이미 굳어 있던(응고된) 기억이었다 | Europe PMC 초록: consolidated fear memory. [Wikipedia 'Memory reconsolidation'](https://en.wikipedia.org/wiki/Memory_reconsolidation): "recalling a consolidated memory" | 직접 2곳 |
| 떠올린 기억은 잠시 불안정해지고 다시 굳혀져야 남는다(재응고) | Wikipedia: "temporarily unstable thus open to modification", 재안정화 필요. [Walker & Stickgold(2016) PNAS](https://pmc.ncbi.nlm.nih.gov/articles/PMC4948330/): "returns them to a labile form requiring reconsolidation" | 직접 2곳 |
| 효과를 확인하지 못한 연구도 있어 사람 기억에서는 논쟁 중이다 | Wikipedia: "an area of ongoing research and debate", "others have failed to demonstrate disruption". Walker & Stickgold: 사람 대상 Hardwicke 외 연구가 "no evidence for memory lability following retrieval"을 보고했고 이에 대해 반론 | 직접 2곳 |

고친 내용: "소리와 공포를 함께 기억하게 했다"(청각 공포 조건화)는 Europe PMC 요약에서 확인되지 않아 "공포 기억"으로 바꿨습니다. "약만 주고 떠올리지 않으면 기억이 남았다", "6시간 뒤 주사는 효과가 없었다"는 Europe PMC 한 곳뿐이라 뺐습니다. 제목은 "다시 쓰인다"이지만 카드는 "불안정해지고 다시 굳혀진다"와 "논쟁 중"으로 썼고, 사람에게 단정하지 않았습니다.
참고: Europe PMC는 원 논문의 초록 레코드이고, ScienceDaily는 기관 보도자료를 실은 페이지입니다. Nature 원문과 PubMed는 접속이 막혀 열지 못했습니다.

#### p015 별에서 온 몸 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 우주 초기에는 수소·헬륨 같은 가벼운 원소가 거의 전부였다 | [Wikipedia 'Stellar nucleosynthesis'](https://en.wikipedia.org/wiki/Stellar_nucleosynthesis): "the original creation of hydrogen, helium and lithium during the Big Bang". [NHM](https://www.nhm.ac.uk/discover/are-we-really-made-of-stardust.html): "only the lightest elements, such as hydrogen, helium and minuscule amounts of lithium existed" | 직접 2곳 |
| 탄소처럼 더 무거운 원소는 별 속에서 만들어졌다 | Wikipedia: 삼중 알파 과정으로 헬륨이 탄소로 융합. NHM: 다음 세대 별이 "carbon, magnesium and nearly every element" 생성 | 직접 2곳 |
| 별이 생을 마칠 때 원소가 우주로 흩어졌다 | Wikipedia: 초신성, 저질량 별의 항성풍. NHM: "When those stars went supernova, they expelled the elements" | 직접 2곳 |
| 우리 몸의 탄소도 별에서 만들어졌다 | NHM: "nearly all the elements in the human body were made in a star". Wikipedia: 빅뱅에서는 수소·헬륨·리튬만 생겼고 탄소는 별의 융합으로 생김(몸에 대한 직접 언급은 없고, 탄소의 기원으로 확인) | 직접 2곳 (Wikipedia는 추론 포함) |

고친 내용: 몸 질량의 몇 %가 별에서 왔다는 수치(흔히 93%)는 NHM에서 확인되지 않아 쓰지 않았습니다. 산소는 NHM 본문에 없어서 "탄소처럼"으로만 썼습니다. "철보다 무거운 원소는 초신성을 거쳤다"는 NHM 한 곳뿐이라 뺐습니다. 칼 세이건의 "star stuff" 인용은 직접 확인하지 않아 쓰지 않았습니다. 우주의 나이(138억 년)도 넣지 않았습니다.
"몸의 수소는 우주가 처음 생겼을 때부터 있던 것입니다"는 두 출처 모두 '몸의 수소'를 직접 말하지 않아(추론만 가능) 카드 3에서 뺐습니다. 대학·기관 페이지(UCSB Science Line, Big Think)는 열리지 않았습니다.
참고: "몸의 탄소" 주장에서 Wikipedia는 몸을 직접 말하지 않고 탄소의 기원만 말하므로 가장 약한 항목입니다. NHM은 몸을 직접 언급합니다.

### 2026-11-05 · 생각 탭 '역사' 주제 검증 기록 (p016~p020)

검증일: 2026-11-05. 기준은 위 생각 탭 검증 기준과 같다(주장마다 서로 다른 출처 두 곳에서 직접 확인, 위키백과 영문·한글은 한 곳으로 셈).

확인 방법: 앞부분은 WebFetch로 열었다. 도중에 WebFetch·WebSearch가 사용량 제한에 걸려, 나머지는 curl로 페이지 원문(위키백과는 API 원문 추출, 실록·백과사전·Gutenberg는 HTML/텍스트 원문)을 받아 해당 구절을 직접 읽었다. 요약이나 검색 스니펫만 본 것은 근거로 넣지 않았다.

출처 범위: SPEC 목록(위키백과, 원전, 학술 논문, 대학·기관 페이지)에 맞는 것만 통과 근거로 셌다. 언론 기사(RFE/RL, KPBS)도 직접 읽었지만 목록 밖이라 통과 근거에서는 뺐고 참고로만 적는다.

---

#### p016 젬멜바이스와 손 씻기 — 통과

출처
- W = [Wikipedia, 'Ignaz Semmelweis'](https://en.wikipedia.org/wiki/Ignaz_Semmelweis)
- M = [Museum of Health Care at Kingston, 'Ignaz Semmelweis: The Saviour of Mothers'](https://www.museumofhealthcare.ca/blog/ignaz-semmelweis-the-saviour-of-mothers) (박물관 기관 페이지)
- P = [Imre et al., PMC3807775](https://pmc.ncbi.nlm.nih.gov/articles/PMC3807775/) (학술 논문)

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 1840년대 빈 종합병원에 산과 병동이 두 곳 있었다 | W: 1846년 First Clinic 부임, 두 병동 비교. M: Vienna General Hospital의 doctor-run clinic과 다른 병동 비교. P: "the two clinics" | 직접 3곳 |
| 의사 병동의 산모 사망률이 조산사 병동보다 훨씬 높았다 | W: 의사 병동 사망률이 조산사 병동의 약 3배. M: "doctor-run clinic were five times more likely to die" | 직접 2곳 (배수는 출처마다 달라 카드에서는 "훨씬"으로 씀) |
| 의사들이 시신 해부 뒤 산모를 진찰했다는 점에 주목했다 | W: 해부실의 "cadaverous particles"를 손에 묻혀 옮긴다고 봄. M: "performed autopsies before examining a pregnant woman" | 직접 2곳 |
| 염소 용액으로 손을 씻게 하자 사망률이 크게 떨어졌다 | W: chlorinated lime 용액, 사망률 90% 감소. M: chlorinated lime 손 씻기, 1848년 1.27%. P: 월평균 10.65% → 1.98% | 직접 3곳 |
| 많은 의사들이 받아들이지 않았다 | W: "his ideas were rejected by the medical community". M: "largely disregarded by members of the medical community" | 직접 2곳 |
| 세균 이론 이전이라 이유를 설명하지 못했다 | W: "could not offer a theoretical explanation". M: "Germ Theory had not yet been formulated in the late 1840s". P: 미아즈마 이론이 우세했고 설명이 없었음 | 직접 3곳 |
| 1865년 정신병원에서 세상을 떠났다 | W: 1865년 정신병원에 입원, 14일 뒤 사망. M: 7월 31일 입원, 1865년 8월 13일 사망 | 직접 2곳 |
| 그 뒤 파스퇴르의 세균 연구, 리스터의 소독법으로 다시 평가받았다 | W: 파스퇴르가 세균 이론을 확인한 뒤 인정, 리스터의 소독 수술. M: 파스퇴르 연구로 더 존중받았고 리스터가 소독법 발전 | 직접 2곳 |

고친 내용: 사망률 배수(3배·5배)와 "90% 감소" 같은 숫자는 출처마다 기준이 달라 넣지 않았다. 경비원에게 맞았다는 이야기(W에 "may have been beaten")는 확정되지 않아 넣지 않았다.

#### p017 페트로프의 경보 — 통과

출처
- W = [Wikipedia, '1983 Soviet nuclear false alarm incident'](https://en.wikipedia.org/wiki/1983_Soviet_nuclear_false_alarm_incident)
- N = [U.S. National Park Service, 'Stanislav Petrov'](https://www.nps.gov/people/stanislav_petrov.htm) (정부 기관 페이지)
- R = [Pavel Podvig, Russian Strategic Nuclear Forces 블로그](https://russianforces.org/blog/2022/10/did_stanislav_petrov_save_the_.shtml) (연구자 운영 연구 프로젝트 페이지)
- 참고(목록 밖, 통과 근거 아님): [RFE/RL](https://www.rferl.org/a/soviet-colonel-averted-nuclear-war/25118749.html), [KPBS/NPR](https://www.kpbs.org/news/2017/09/18/stanislav-petrov-the-man-who-saved-the-world-dies)

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 1983년 9월 26일 소련 조기경보 지휘소에서 페트로프 중령이 당직이었다 | W: "On 26 September 1983 ... lieutenant colonel ... officer on duty at the Serpukhov-15 bunker". N: "On 26 September 1983 ... Lieutenant Colonel Petrov was the duty officer at the command center for the Oko" | 직접 2곳 |
| 미국에서 미사일 다섯 기가 발사되었다는 경보가 떴다 | W: ICBM 1기, 뒤이어 4기 더. N: "five missiles had been launched from the United States" | 직접 2곳 |
| 경보는 사람이 아니라 위성 감시 체계가 알린 것이었다 | W: 조기경보 체계 Oko가 발사를 보고, "the bunker's computers reported". N: "the system reported that five missiles had been launched". R: "Once the computer classifies the signal as an indicator of a launch" | 직접 3곳 |
| 그는 거짓 경보라고 판단했다 | W: "Petrov dismissed the warning as a false alarm". N: "Petrov judged the reports to be a false alarm". R: "in his assessment the alarm was false" | 직접 3곳 |
| 경보는 감시 체계의 오작동이었다 | W: "the system had indeed malfunctioned". R: "The algorithm that generated the alarm got it wrong". N: 조기경보 체계의 문제를 드러냄 | 직접 3곳 |
| 보상을 받지 못했고 다른 자리로 옮겨졌다 | W: "He received no reward", "reassigned to a less sensitive post". N: "denied promotions, reassigned and took early retirement" | 직접 2곳 |
| 1990년대 후반에야 바깥에 알려졌다 | W: 보틴체프 장군이 1998년 처음 공개. N: "not even known outside ... until the late 1990s" | 직접 2곳 |

고친 내용:
- "공격이라면 미사일이 수백 기일 텐데 다섯 기뿐이라 이상하다고 생각했다"는 판단 이유는 W와 언론(RFE/RL, KPBS)에서만 확인되어 목록 안 출처가 한 곳뿐이다. 카드에서 뺐다.
- 원인이 "구름에 반사된 햇빛"이라는 세부도 목록 안 출처로는 W 한 곳뿐이라, "감시 체계의 오작동"으로 완화했다.
- 상부에 어떻게 보고했는지는 출처마다 다르다(W: 기록마다 다름, R: 거짓 경보라고 보고, KPBS: 올리지 않음). 논란이 있어 카드에서 다루지 않았다.
- "핵전쟁을 막았다"는 평가는 R이 반론(소련은 경보만으로 발사하지 않았을 것)을 제기하는 등 갈린다. 카드에서 단정하지 않았다.
- 자정 직후라는 시각은 넣지 않았다.

#### p018 1914년 크리스마스 휴전 — 통과

출처
- W = [Wikipedia, 'Christmas truce'](https://en.wikipedia.org/wiki/Christmas_truce)
- B = [Bruce Bairnsfather, 『Bullets & Billets』, Project Gutenberg](https://www.gutenberg.org/ebooks/11232) (현장에 있던 영국 장교의 회고록 원전, 8~9장. 원문 텍스트 https://www.gutenberg.org/cache/epub/11232/pg11232.txt 를 직접 읽음)
- IWM, Britannica, 1914-1918-online은 접근이 막혀(403·봇 차단) 열지 못했다.

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 1914년 겨울 서부 전선에서 영국군과 독일군이 참호를 사이에 두고 마주했다 | W: 1914년 크리스마스 무렵 서부 전선, 영국·독일 병사. B: 크리스마스 1914, 얼어붙은 늪 건너편의 독일군 참호 | 직접 2곳 |
| 몇 달째 서로 총과 포를 쏘던 사이였다 | W: 전쟁 시작 다섯 달 뒤. B: "After months of vindictive sniping and shelling" | 직접 2곳 |
| 크리스마스이브 밤 양쪽 참호에서 노래가 오갔다 | W: 독일군이 캐럴을 부르고 영국군이 화답. B: 독일 쪽 노래·밴드, 영국 쪽 하모니카로 응답 | 직접 2곳 |
| 이튿날 병사들이 참호 밖으로 나와 담배·음식·기념품을 주고받았다 | W: 무인지대에서 음식·담배·기념품 교환. B: 이브에 시가·담배와 통조림 교환, 크리스마스 당일 무인지대에서 단추 교환과 "souvenir hunting" | 직접 2곳 |
| 위에서 내린 명령이 아니라 병사들 사이에서 저절로 생겼다 | W: "unofficial ceasefires", "spontaneous ceasefire". B: 병사들끼리 소리쳐 부르다 만남이 이루어진 과정 | 직접 2곳 |
| 양쪽 지휘부가 이런 어울림을 달가워하지 않았다 | W: 독일군 1914년 12월 29일 친교 금지 명령, 연합군 지휘관들의 금지 명령. B: "the authorities on both sides were not very enthusiastic about this fraternizing" | 직접 2곳 |
| 며칠 뒤 다시 각자의 참호로 돌아갔고 전쟁은 계속되었다 | W: 크리스마스 밤 또는 새해까지 이어진 뒤 1915년 전투 계속. B: 크리스마스 이틀 뒤까지 평온, 이후 "Trenches once more" | 직접 2곳 |

고친 내용:
- 양쪽이 함께 축구를 했다는 이야기는 W에 "역사가들 사이에서 진위가 논란"으로 나온다. 이 논란을 두 번째 목록 안 출처에서 확인하지 못해(Guardian 기사는 언론, IWM은 접근 불가) 카드에서 뺐다. 넣는다면 "~했다는 이야기도 전해지지만 얼마나 있었는지는 의견이 갈립니다"로 써야 하며, 그때는 출처를 하나 더 확인해야 한다.
- 전사자를 함께 묻었다는 내용은 W에만 있고 B에는 없어 뺐다.
- "약 10만 명"이라는 숫자, "이듬해에는 거의 없었다"는 내용은 W 한 곳뿐이라 넣지 않았다.

#### p019 훈민정음 반대 상소 — 통과

출처
- S1 = [『세종실록』 세종 26년 2월 20일, 최만리 등의 상소](https://sillok.history.go.kr/id/kda_12602020_001) (원전, 국역·원문)
- S2 = [『세종실록』 세종 25년 12월 30일, 훈민정음을 창제하다](https://sillok.history.go.kr/id/kda_12512030_002) (원전)
- E = [한국민족문화대백과사전, '최만리'](https://encykorea.aks.ac.kr/Article/E0057279) (한국학중앙연구원)
- K = [위키백과, '최만리'](https://ko.wikipedia.org/wiki/%EC%B5%9C%EB%A7%8C%EB%A6%AC) (영문판 'Choe Manli'도 함께 보았으나 같은 한 곳으로 셈)
- S1과 S2는 같은 원전(세종실록)이므로 한 곳으로 센다.

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 1443년 세종이 훈민정음을 만들었다 | S2: 세종 25년(1443) 12월 "임금이 친히 언문 28자를 지었는데 ... 훈민정음이라고 일렀다". K: "1443년 12월 세종이 훈민정음을 반포하자" | 직접 2곳 |
| 이듬해 집현전 부제학 최만리 등이 반대 상소를 올렸다 | S1: 세종 26년(1444) "집현전 부제학 최만리 등이 상소하기를". E: 1444년 반대상소. K: 1444년 2월 20일 | 직접 3곳 |
| 중국과 다른 글자는 대국을 섬기는 도리에 어긋난다고 했다 | S1: "대국을 섬기고 중화를 사모하는 데에 부끄러움이 없사오리까". K: "사대모화(事大慕華)에 어긋나며" | 직접 2곳 |
| 학문에 도움이 되지 않는다고 했다 | S1: "학문에 방해됨이 있고 정치에 유익함이 없으므로". K: 언문은 이두와 달리 "유익함이 없다". E: "한글의 무용론" | 직접 3곳 |
| 널리 의논하지 않고 서두른다고 비판했다 | S1: "넓게 여러 사람의 의논을 채택하지도 않고 갑자기 ... 급하게 널리 반포하려 하시니". K: "널리 의견을 묻지 않고 갑자기 ... 신중하지 못하다" | 직접 2곳 |
| 세종이 상소한 학자들을 의금부에 가두었다가 이튿날 풀어 주었다 | S1: "의금부에 내렸다가 이튿날 석방하라 명하였는데, 오직 정창손만은 파직". E: "즉일 친국을 받고 다음날 석방, 복직" | 직접 2곳 (K는 "투옥"까지만) |
| 최만리는 그 뒤 벼슬을 내려놓고 고향으로 돌아갔다 | E: "복직되었으나 사직하고 고향으로 돌아가 여생을 마쳤다". K: "1444년 사직하고 고향으로 낙향하였다" | 직접 2곳 |

고친 내용:
- E는 상소의 진의가 『고금운회거요』 번역(한자음 개혁)에 대한 반대였다는 견해를 싣고 있다. 흥미로운 관점이지만 다른 출처에서 확인하지 못해 카드에 넣지 않았다.
- 상소 날짜는 K 안에서도 2월 17일과 2월 20일이 함께 나와 날짜를 쓰지 않았다.
- 정창손만 파직된 일은 카드에 넣지 않았다. "모두 풀어 주었다"로 읽히지 않도록 "가두었다가 이튿날 풀어 주었습니다"로 실록 표현을 따랐다.
- 4번째 카드의 "지켜야 한다고 믿은 질서가 있었다"는 해석 문장으로 보고 사실 주장에서 뺐다.

#### p020 장영실과 부서진 가마 — 통과

출처
- S = 『세종실록』(원전, 한 곳으로 셈)
  - [세종 15년 9월 16일, 장영실에게 호군의 관직을 더하는 일](https://sillok.history.go.kr/id/kda_11509016_003)
  - [세종 24년 3월 16일, 안여가 견실하지 못하여 의금부에서 국문](https://sillok.history.go.kr/id/kda_12403016_002)
  - [세종 24년 4월 27일, 장영실에게 두 등급 감형](https://sillok.history.go.kr/id/kda_12404027_002)
  - [세종 24년 5월 3일, 장영실 등을 불경죄로 다스림](https://sillok.history.go.kr/id/kda_12405003_002)
- E = [한국민족문화대백과사전, '장영실'](https://encykorea.aks.ac.kr/Article/E0048697)
- K = 위키백과 '장영실'(한글)·'Jang Yeong-sil'(영문), 한 곳으로 셈

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 원나라 출신 아버지와 기생 어머니 사이에서 태어났다 | S(15년 9월 16일): "그 아비가 본래 원나라의 소주·항주 사람이고, 어미는 기생". K: 아버지 원나라 유민, 어머니 동래현 기생. E: "중국계 귀화인과 기녀 사이에서 태어났다" | 직접 3곳 |
| 동래현의 관노로 지냈다 | E: "동래현의 관노로 있을 때". K: "본래 동래현의 관노", 영문 "born a nobi" | 직접 2곳 (실록 15년 9월 16일 기사에는 '관노'라는 말이 직접 나오지 않음) |
| 세종이 그의 솜씨를 아껴 대신들과 의논한 끝에 벼슬을 주었다 | S: "공교한 솜씨가 보통 사람에 뛰어나므로 ... 나도 역시 이를 아낀다", 대신들과 다시 의논해 상의원 별좌에 임명. K: "다시 대신들의 의논을 거쳐 종5품 상의원 별좌에 임명" | 직접 2곳 |
| 스스로 시각을 알리는 물시계 자격루를 만들었다 | S: "이제 자격궁루를 만들었는데 ... 이 사람이 아니더라면 ... 만들어 내지 못했을 것". E: 1434년 완성된 자격루 제작. K: 자격루 제작 | 직접 3곳 |
| 세종이 그 공으로 벼슬을 높였다 | S: "그 공이 작지 아니하므로 호군의 관직을 더해 주고자 한다". E: "그 공로로 대호군에까지 승진" | 직접 2곳 |
| 1442년 그가 감독해 만든 임금의 가마가 부러지고 부서졌고, 의금부에서 국문을 받았다 | S(24년 3월 16일): "장영실이 안여를 감조하였는데, 견실하지 못하여 부러지고 허물어졌으므로 의금부에 내려 국문". K: 1442년 가마가 부서져 책임을 물음 | 직접 2곳 |
| 세종이 형벌을 두 등급 낮춰 주었다 | S(24년 4월 27일): "임금이 장영실에게는 두 등급을 감형". K: "임금이 형벌을 두 등급만큼 낮추어 주었다고 한다" | 직접 2곳 |
| 불경죄로 벼슬을 빼앗기고 곤장을 맞는 벌을 받았다 | S(24년 5월 3일): "죄는 불경에 관계되니, 마땅히 직첩을 회수하고 곤장을 집행 ... 그대로 따랐다". K: 불경죄, 곤장과 삭탈관직, 영문 "flogged ... and expelled" | 직접 2곳 |

고친 내용:
- 처음 초안에는 "그 뒤 그의 삶과 죽음은 기록에 남아 있지 않다"는 카드를 넣었으나, 이 주장은 K(한글·영문)에서만 확인되었다. E에는 가마 사건과 그 이후가 나오지 않는다. 기준에 못 미쳐 카드에서 빼고, 질문 카드로 끝내도록 고쳤다.
- 곤장 대수는 출처마다 달라(실록 4월 27일: 의금부가 100대를 청함, 위키백과 한글: 80대 구형, 영문: 80대) 숫자를 쓰지 않았다.
- 실록 15년 9월 16일 기사에 허조가 "기생의 소생"이라며 반대했다는 대목이 있으나, 다른 출처에서 확인하지 못해 넣지 않았다.
- 가묘, 아산 장씨 족보, 중국 파견 연도처럼 출처 간에 엇갈리거나 종친회 주장에 기댄 세부는 넣지 않았다.

---

#### 요약

| id | 제목 | 판정 |
| --- | --- | --- |
| p016 | 젬멜바이스와 손 씻기 | 통과 |
| p017 | 페트로프의 경보 | 통과 |
| p018 | 1914년 크리스마스 휴전 | 통과 |
| p019 | 훈민정음 반대 상소 | 통과 |
| p020 | 장영실과 부서진 가마 | 통과 |

남은 점:
- p017·p018은 목록 안 출처가 위키백과와 각각 기관 페이지(NPS)·연구 페이지(Podvig)·원전 회고록(Bairnsfather)이다. IWM, Britannica는 접근이 막혀 열지 못했다. 접근되는 환경에서 한 번 더 대조하면 좋다.
- p017의 Podvig 페이지는 개인 연구자가 운영하는 연구 프로젝트 사이트다. 이 페이지를 빼더라도 p017의 모든 주장은 위키백과와 NPS 두 곳에서 직접 확인된다.

### 2026-11-05 · 생각 탭 성경·불교 이야기 검증 기록 (p021~p025)

검증일: 2026-11-05. 기준은 위 생각 탭 검증 기준과 같습니다(주장마다 서로 다른 출처 두 곳에서 직접 확인).

#### 사용한 출처와 확인 방법

- **WS** 위키문헌 「개역한글판」 문서. `action=raw`로 원문(위키텍스트)을 내려받아 해당 절을 직접 읽었습니다.
  - 누가복음 https://ko.wikisource.org/wiki/개역한글판/누가복음
  - 요한복음 https://ko.wikisource.org/wiki/개역한글판/요한복음
  - 요나 https://ko.wikisource.org/wiki/개역한글판/요나
- **BO** Bíblia Online 개역한글(KRV). 페이지 메타데이터에 "개역한글 (Korean Revised)", "1938년 번역의 개정판, 1961년 대한성서공회 발간"이라고 적혀 있어 개역개정이 아님을 확인했습니다.
  - https://www.bibliaonline.com.br/kor/lc/10 , /kor/lc/15 , /kor/jo/4 , /kor/jn/3 , /kor/jn/4
- **WP** 영문 위키백과(원문 `action=raw`): Parable of the Good Samaritan, Parable of the Prodigal Son, Book of Jonah, Kisa Gotami, Parable of the Poisoned Arrow.
- **SC** SuttaCentral Sujato 영역(CC0). API(`/api/bilarasuttas/mn63/sujato`, `/thig10.1/sujato`)로 영역 전문을 받아 읽었습니다.
- **BL** Burlingame, *Buddhist Legends* VIII.13(법구경 주석 영역, 1921), https://ancient-buddhist-texts.net/English-Texts/Buddhist-Legends/08-13.htm
- **TW** Turning Wheel, "Kisa Gotami and the Mustard Seed", https://www.turningwheel.org.uk/buddhist_stories/kisa-gotami-and-the-mustard-seed/ (WP가 인용한 2차 출처, 직접 열어 확인)

성경 줄거리는 본문(WS)과 WP를 서로 다른 두 곳으로 셉니다. BO는 개역한글 인용문의 글자 대조용 두 번째 본문입니다.
위키문헌 본문에는 오타가 있습니다(누가복음 15:14 "훙년", 15:16 "배을"). 이 절들은 인용하지 않았습니다.

#### 개역한글 직접 인용 대조

| 인용 | 위치 | WS | BO | 결과 |
| --- | --- | --- | --- | --- |
| 얘 너는 항상 나와 함께 있으니 내 것이 다 네 것이로되 | 누가복음 15:31 | 일치 | 일치 | 통과 |

그 밖의 카드는 따옴표 인용 없이 요약했습니다. 불교 이야기는 한국어 번역본 문장을 쓰지 않았고, 영역본을 읽고 직접 요약했습니다.

---

#### p021 선한 사마리아인 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 누가복음에 율법사가 예수에게 "내 이웃이 누구냐"고 묻는 장면이 있다 | WS 눅 10:25-29 ("그러면 내 이웃이 누구오니이까"), WP 도입부 | 직접 2곳 |
| 예수가 이야기로 답했다 | WS 10:30, WP | 직접 2곳 |
| 예루살렘에서 여리고로 내려가다 강도를 만나 거의 죽은 채 버려졌다 | WS 10:30 ("거반 죽은 것을 버리고"), WP ("leaving him half dead") | 직접 2곳 |
| 제사장과 레위인이 보고 피하여 지나갔다 | WS 10:31-32, WP | 직접 2곳 |
| 여행 중이던 사마리아인이 상처를 싸매고 주막에 데려가 돈을 맡겼다 | WS 10:33-35 (데나리온 둘), WP | 직접 2곳 |
| 당시 유대인과 사마리아인은 서로 가까이하지 않던 사이로 알려져 있다 | WP ("Samaritans and Jews were generally antagonistic"), WS·BO 요 4:9 ("유대인이 사마리아인과 상종치 아니함이러라") | 직접 2곳 |
| 예수가 누가 강도 만난 자의 이웃이 되었느냐고 되물었다 | WS 10:36, WP | 직접 2곳 |

고친 내용: 사마리아인과 유대인의 관계는 "적대"처럼 단정하지 않고 "서로 가까이하지 않던 사이로 알려져 있습니다"로 완화했습니다. 비유의 우의적 해석(교부들의 해석 등)은 교단마다 달라 넣지 않았습니다.

#### p022 돌아온 동생과 큰아들 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 누가복음에 두 아들을 둔 아버지 이야기가 있다 | WS 눅 15:11, WP | 직접 2곳 |
| 작은아들이 미리 받은 재산을 먼 나라에서 허비하고 돌아왔다 | WS 15:12-20, WP | 직접 2곳 |
| 아버지가 멀리 있는 아들을 보고 달려가 안았다 | WS 15:20, WP (KJV 15:20 인용) | 직접 2곳 |
| 제일 좋은 옷을 입히고 살진 송아지를 잡아 잔치했다 | WS 15:22-24, WP ("finest robe", "fatted calf") | 직접 2곳 |
| 밭에서 돌아온 큰아들이 화가 나 들어가지 않았다 | WS 15:25-28, WP ("becomes angry") | 직접 2곳 |
| 큰아들이 여러 해 섬겼으나 염소 새끼도 받지 못했다고 말했다 | WS 15:29, WP (KJV 15:29 인용) | 직접 2곳 |
| 아버지의 대답(15:31 인용) | WS, BO 글자 대조 일치 | 직접 2곳 |
| 이야기는 큰아들이 들어갔는지 알려 주지 않고 끝난다 | WS 15:32가 장의 마지막 절이고 큰아들의 반응이 없음, WP ("The parable stops with the father explaining …") | 직접 2곳 |

고친 내용: 큰아들이 바리새인을 상징한다는 해석은 해석이 갈려 넣지 않았습니다.

#### p023 요나와 박넝쿨 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 요나가 니느웨로 가라는 말씀을 듣고 다시스로 도망쳤다 | WS 욘 1:2-3, 4:2, WP ch.1 | 직접 2곳 |
| 결국 니느웨에 가서 경고를 전했다 | WS 3:4, WP ch.3 | 직접 2곳 |
| 니느웨 사람들이 돌이키자 하나님이 재앙을 거두었다 | WS 3:10, BO 3:10, WP | 직접 2곳 |
| 요나가 몹시 싫어하며 화를 냈다 | WS·BO 4:1, WP ("displeased") | 직접 2곳 |
| 성 밖에 앉은 요나 위로 박넝쿨이 자라 그늘을 드리웠고 요나가 기뻐했다 | WS 4:5-6, WP | 직접 2곳 |
| 이튿날 벌레가 넝쿨을 씹어 시들었고 요나가 죽기를 구했다 | WS 4:7-8, WP | 직접 2곳 |
| 하나님이 넝쿨과 니느웨를 견주어 물었다 | WS·BO 4:10-11, WP (4:9-11 인용) | 직접 2곳 |
| 요나서는 요나의 대답 없이 이 질문으로 끝난다 | WS 4:11이 책의 마지막 절, WP ("The Book of Jonah closes abruptly") | 직접 2곳 |

고친 내용: "반대 방향으로 도망쳤다"는 본문에 없는 표현이라 뺐습니다. 큰 물고기 대목은 "우여곡절 끝에"로 줄였고, 기적의 사실성 논쟁은 다루지 않았습니다. 니느웨의 인구 숫자(십이만여 명)는 카드에 넣지 않았습니다.

#### p024 키사 고타미와 겨자씨 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 사왓티에 살던 키사 고타미가 어린 아들을 잃었다고 전해진다 | WP ("wife of a wealthy man of Shravasti", "losing her only child"), BL (Sāvatthi, 아들의 죽음) | 직접 2곳 |
| 죽음을 받아들이지 못하고 아이를 안고 집집마다 약을 구했다 | BL (carried on hip, house to house, medicine), TW ("going from door to door asking", medicine) | 직접 2곳 |
| 한 사람이 붓다를 찾아가 보라고 했다 | WP ("an old man"), BL ("a wise man"), TW ("a wise elder") | 직접 3곳 |
| 붓다가 아무도 죽은 적 없는 집에서 흰 겨자씨를 얻어 오라고 했다 | WP ("white mustard seeds from a family where no one had died"), BL ("a pinch of white mustard seed") | 직접 2곳 |
| 죽음을 겪지 않은 집을 찾지 못했다 | WP, BL, TW | 직접 3곳 |
| 죽음이 모든 집에 찾아온다는 것을 깨달았다 | WP ("no house free from mortality"), BL | 직접 2곳 |
| 붓다에게 돌아갔고 출가해 비구니가 되었다 | WP (returned to the Buddha, bhikṣuṇī), BL (Order, nun), TW ("ordained as a nun"), SC Thig 10.1 ("The senior nun Kisāgotamī") | 직접 3곳 이상 |

고친 내용: "걸음마를 뗄 무렵의 아이"는 BL에서만 직접 확인되어 "어린 아들"로 바꿨습니다. "붓다가 아이를 살려 주겠다고 했다"(WP)는 BL·TW와 표현이 달라 넣지 않았습니다. 겨자씨 일화는 경전 본문(Thig 10.1)이 아니라 주석서 전승이므로 "~라고 전해집니다"로 썼습니다. 아이 시신을 숲에 두었다는 대목(BL)은 한 곳뿐이라 뺐습니다.

#### p025 독화살의 비유 — 통과

| 주장 | 근거 | 강도 |
| --- | --- | --- |
| 말룽꺄뿟따가 붓다가 답하지 않은 질문들로 고민했다 | SC MN 63, WP | 직접 2곳 |
| 질문은 세계의 영원성, 깨달은 이(여래)의 사후 존재 같은 것이었다 | SC ("the cosmos is eternal", "after death, a realized one still exists"), WP ("nature of the cosmos and life after the death of a Buddha") | 직접 2곳 |
| 답을 못 들으면 수행을 그만두겠다며 찾아갔다 | SC ("I shall resign the training"), WP ("will renounce his teachings") | 직접 2곳 |
| 붓다가 독화살 맞은 사람의 이야기를 들려주었다 | SC, WP | 직접 2곳 |
| 그 사람은 쏜 사람, 활과 화살의 재료를 알기 전에는 뽑지 않겠다고 한다 | SC (bow, bow-string, shaft, feathers …), WP (dhammatalks 영역 인용) | 직접 2곳 |
| 답을 다 알기 전에 죽고 말 것이다 | SC ("meanwhile they'd die"), WP ("The man would die") | 직접 2곳 |
| 그 질문들이 수행의 근본에 도움이 되지 않아 답하지 않았다 | SC ("they aren't beneficial or relevant to the fundamentals of the spiritual life"), WP ("those questions are irrelevant to his teachings") | 직접 2곳 |

고친 내용: "사람이 죽은 뒤에도 존재하는지"는 원문이 "깨달은 이(realized one)"에 관한 질문이므로 "깨달은 이는 죽은 뒤에도 존재하는지"로 고쳤습니다. 질문의 개수(10가지/14가지)는 전승마다 달라 넣지 않았습니다.

---

#### 자체 점검

- [x] 확인되지 않은 따옴표 인용 없음 (따옴표 인용은 눅 15:31 한 곳, 두 본문 글자 대조 일치)
- [x] 개역개정 미사용 (BO 판본 메타데이터 확인, WS는 「개역한글판」 문서)
- [x] 불교 이야기에 한국어 번역본 문장 미사용, 전승은 "~라고 전해집니다"
- [x] 성경은 "~라고 전합니다"처럼 기록으로 다루고, 교단마다 갈리는 우의적·상징 해석은 넣지 않음
- [x] 두 전통 사이의 우열을 암시하는 표현 없음
- [x] 카드 4~5장, 한 장 2문장 이하, 마지막 장은 '나'에게 돌아오는 질문
- [x] JSON.parse 확인 완료

## 오늘의 질문

질문 q002~q031의 개역한글 구절 대조와 질문 품질 기준(docs/PLAN.md 4.3) 점검 기록이다. 구절은 위키문헌 "개역한글판"과 대한성서공회 성경 읽기(version=HAN) 두 곳에서 글자·띄어쓰기 단위로 일치해야 통과이며, version=GAE와 비교해 개역개정이 섞이지 않았는지 확인했다. 두 출처의 글자가 다른 구절은 쓰지 않았다. 분포(pct), 참여 수, 의견은 데모용 값이다.

### 2026-11-05 · 오늘의 질문 1차(q031~q022) 검증 기록

- 확인일: 2026-11-05
- 대조 출처 A: 한국어 위키문헌 "개역한글판/책이름" 문서 원문(`action=raw`)을 직접 내려받아 비교
- 대조 출처 B: 대한성서공회 성경 읽기 페이지 `version=HAN`(개역한글)을 직접 내려받아 비교
- 섞임 확인: 같은 페이지의 `version=GAE`(개역개정)를 함께 내려받아 차이를 확인
- 방법: JSON의 `verse` 문자열이 A·B 해당 절 본문 안에 글자(띄어쓰기 포함) 그대로 들어 있는지 스크립트로 확인했습니다.
- 결과: 10개 모두 통과, 보류 0개

#### q031 내게만 들려준 이야기 — 통과

- 구절: 잠언 11:13 "두루 다니며 한담하는 자는 남의 비밀을 누설하나 마음이 신실한 자는 그런 것을 숨기느니라"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=11 | 일치 |

- 비고: 개역개정도 같은 문장입니다(이 절은 두 판이 동일). 개역한글 두 곳과 글자 단위 일치를 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [38, 54, 8], 합 100, 최대 54 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q030 부모님이 바라는 길 — 통과

- 구절: 잠언 15:22 "의논이 없으면 경영이 파하고 모사가 많으면 경영이 성립하느니라"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=15 | 일치 |

- 비고: 개역개정은 "무너지고 지략이"로 달라, 개역한글 "파하고 모사가"임을 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [46, 33, 21], 합 100, 최대 46 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q029 단톡방의 침묵 — 통과

- 구절: 잠언 3:27 "네 손이 선을 베풀 힘이 있거든 마땅히 받을 자에게 베풀기를 아끼지 말며"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=3 | 일치 |

- 비고: 처음 후보 잠언 31:8은 위키문헌 "열지니라", 성서공회 "열찌니라"로 두 곳이 달라 쓰지 않고 이 구절로 바꿨습니다. 개역개정도 같은 문장입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [41, 37, 22], 합 100, 최대 41 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q028 돌려받지 못한 돈 — 통과

- 구절: 로마서 13:8 "피차 사랑의 빚 외에는 아무에게든지 아무 빚도 지지 말라"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EB%A1%9C%EB%A7%88%EC%84%9C | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=rom&chap=13 | 일치 |

- 비고: 절의 앞부분만 썼습니다. 개역개정도 같은 문장입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [63, 22, 15], 합 100, 최대 63 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q027 잠금이 풀린 휴대폰 — 통과

- 구절: 고린도전서 13:7 "모든 것을 참으며 모든 것을 믿으며 모든 것을 바라며 모든 것을 견디느니라"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EA%B3%A0%EB%A6%B0%EB%8F%84%EC%A0%84%EC%84%9C | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=1co&chap=13 | 일치 |

- 비고: 개역개정도 같은 문장입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [71, 17, 12], 합 100, 최대 71 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q026 비교하는 말 — 통과

- 구절: 갈라디아서 6:4 "각각 자기의 일을 살피라 그리하면 자랑할 것이 자기에게만 있고 남에게는 있지 아니하리니"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EA%B0%88%EB%9D%BC%EB%94%94%EC%95%84%EC%84%9C | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=gal&chap=6 | 일치 |

- 비고: 개역개정은 "자기에게는 있어도"로 달라, 개역한글 "자기에게만 있고"임을 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [58, 27, 15], 합 100, 최대 58 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q025 건너 들은 험담 — 통과

- 구절: 야고보서 1:19 "사람마다 듣기는 속히 하고 말하기는 더디 하며"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%95%BC%EA%B3%A0%EB%B3%B4%EC%84%9C | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=jas&chap=1 | 일치 |

- 비고: 절 전체는 끝부분 띄어쓰기가 두 곳에서 달라("더디하라"/"더디 하라"), 두 곳이 일치하는 앞부분만 썼습니다. 개역개정은 "너희가 알지니"로 앞부분이 다르지만 쓴 부분은 같습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [56, 24, 20], 합 100, 최대 56 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q024 겹쳐버린 날 — 통과

- 구절: 전도서 3:1 "천하에 범사가 기한이 있고 모든 목적이 이룰 때가 있나니"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%A0%84%EB%8F%84%EC%84%9C | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=ecc&chap=3 | 일치 |

- 비고: 기억으로 떠올린 "범사에 기한이 있고"는 개역개정 본문이어서 버리고, 개역한글 "천하에 범사가 기한이 있고"로 썼습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [47, 39, 14], 합 100, 최대 47 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q023 멀어진 오랜 친구 — 통과

- 구절: 잠언 17:17 "친구는 사랑이 끊이지 아니하고"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=17 | 일치 |

- 비고: 절 전체는 "때까지"/"때 까지" 띄어쓰기가 두 곳에서 달라, 일치하는 앞부분만 썼습니다. 개역개정은 "끊어지지"로 다릅니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [52, 36, 12], 합 100, 최대 52 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

#### q022 친구의 새 연인 — 통과

- 구절: 잠언 27:6 "친구의 통책은 충성에서 말미암은 것이나 원수의 자주 입맞춤은 거짓에서 난 것이니라"

| 대조처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=27 | 일치 |

- 비고: 개역개정은 "아픈 책망은 충직으로"로 달라, 개역한글 "통책은 충성에서"임을 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 납득할 만한 이유를 opinions에 3~4개 담았습니다 |
| (2) 응답이 갈림 | pct [48, 43, 9], 합 100, 최대 48 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 친구·연인·가족 사이의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다 |
| (4) 선택지 3개 | 3개 |

### 2026-11-05 · 오늘의 질문 2차 검증 기록 (q021–q012)

확인일: 2026-11-05

#### 구절 대조 방법

- 출처 1: 한국어 위키문헌 "개역한글판/(책 이름)" 문서의 원문(`action=raw`)을 직접 받아 해당 절을 추출했습니다.
- 출처 2: 대한성서공회 성경 읽기 페이지(`version=HAN`, 개역한글)를 직접 받아 해당 절을 추출했습니다.
- 개역개정 혼입 확인: 같은 사이트의 `version=GAE`(개역개정) 페이지와 비교했습니다.
- 판정: `verse` 문자열이 두 출처의 해당 절 본문에 글자·띄어쓰기까지 그대로 포함되면 통과입니다. 스크립트로 부분 문자열 일치를 검사했습니다.

#### 교체한 후보 구절

위키문헌 판본이 일부 표기를 현대식으로 바꿔 두 출처가 어긋난 구절은 쓰지 않았습니다.

| 후보 | 위키문헌 | 대한성서공회 HAN | 처리 |
|---|---|---|---|
| 골로새서 3:23 | 주께 하듯 하고 … 하듯 하지 | 주께 하듯하고 … 하듯하지 | 띄어쓰기 불일치, 사용 안 함 |
| 잠언 4:7 | 얻을지니라 | 얻을찌니라 | 불일치, 사용 안 함 |
| 디모데전서 5:18 | 일꾼이 | 일군이 | 불일치, 사용 안 함 |
| 누가복음 10:7 | 일꾼이 | 일군이 | 불일치, 사용 안 함 |
| 레위기 19:13 | 품꾼의 | 품군의 | 불일치, 사용 안 함 |
| 누가복음 6:31 | 받고자 하는 대로 | 받고자 하는대로 | 띄어쓰기 불일치, 사용 안 함 |
| 마태복음 5:41 | 오 리를 … 십 리를 | 오리를 … 십리를 | 띄어쓰기 불일치, 사용 안 함 |
| 갈라디아서 6:9 | 말지니 | 말찌니 | 불일치, 사용 안 함 |
| 잠언 11:1 (기억 속 문구) | — | — | 처음 떠올린 "미워하시나"는 개역개정 표현이었습니다. 개역한글 "미워하셔도"로 확인해 썼습니다. |

#### 다른 묶음과 겹친 구절 교체

다른 질문 묶음과 같은 구절을 쓰지 않도록 아래 세 질문의 구절을 바꾸고, 성경 관점 body도 새 구절에 맞게 다듬었습니다. 새 구절은 전달받은 사용 금지 목록과 이 묶음의 다른 구절에 들어 있지 않습니다.

| 질문 | 이전 구절 | 새 구절 |
|---|---|---|
| q021 | 잠언 3:27 (q029와 겹침) | 히브리서 13:16 |
| q017 | 갈라디아서 6:4 (q026과 겹침) | 잠언 18:15 |
| q012 | 로마서 13:8 (q028과 겹침) | 잠언 25:11 |

#### 질문별 기록

#### q021 선배에게 받은 기출 자료 — 통과

- 구절: 히브리서 13:16 — "오직 선을 행함과 서로 나눠주기를 잊지 말라 이같은 제사는 하나님이 기뻐하시느니라" (다른 질문 묶음과 겹쳐 교체한 구절)
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%ED%9E%88%EB%B8%8C%EB%A6%AC%EC%84%9C — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=heb&chap=13 — 일치
- 개역개정 혼입: 개역개정은 "나누어 주기를", "하나님은 이같은 제사를 기뻐하시느니라"로 다릅니다. 인용문은 개역한글입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 허락받고 나눈다 54 / 나만 참고한다 29 / 바로 공유한다 17, 합 100, 최대 54 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q020 남은 동아리 회비 — 통과

- 구절: 고린도후서 8:21 — "이는 우리가 주 앞에서만 아니라 사람 앞에서도 선한 일에 조심하려 함이라"
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EA%B3%A0%EB%A6%B0%EB%8F%84%ED%9B%84%EC%84%9C — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=2co&chap=8 — 일치
- 개역개정 혼입: 개역개정은 "주 앞에서뿐 아니라"로 달라, 개역한글 "앞에서만 아니라"임을 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 모두에게 묻는다 48 / 다음 학기로 넘긴다 37 / 임원 회식에 쓴다 15, 합 100, 최대 48 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q019 무리한 부탁을 하는 손님 — 통과

- 구절: 잠언 15:1 — "유순한 대답은 분노를 쉬게 하여도 과격한 말은 노를 격동하느니라"
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=15 — 일치
- 개역개정 혼입: 이 절은 개역한글과 개역개정 본문이 글자 단위로 같습니다. 개역한글 페이지(version=HAN) 두 곳에서 일치함을 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 정중히 거절한다 46 / 점장님께 넘긴다 38 / 새로 만들어 드린다 16, 합 100, 최대 46 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q018 지원서에 쓰는 내 역할 — 통과

- 구절: 에베소서 4:25 — "그런즉 거짓을 버리고 각각 그 이웃으로 더불어 참된 것을 말하라"
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%97%90%EB%B2%A0%EC%86%8C%EC%84%9C — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=eph&chap=4 — 일치
- 개역개정 혼입: 개역개정은 "이웃과 더불어", "됨이라"로 다릅니다. 인용한 앞부분은 개역한글 "이웃으로 더불어"입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 있는 그대로 쓴다 57 / 조금 크게 쓴다 31 / 다른 경험을 쓴다 12, 합 100, 최대 57 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q017 AI로 쓰는 과제 — 통과

- 구절: 잠언 18:15 — "명철한 자의 마음은 지식을 얻고 지혜로운 자의 귀는 지식을 구하느니라" (다른 질문 묶음과 겹쳐 교체한 구절)
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=18 — 일치
- 개역개정 혼입: 이 절은 개역한글과 개역개정 본문이 글자 단위로 같습니다. 개역한글 페이지(version=HAN) 두 곳에서 일치함을 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 먼저 여쭤본다 44 / 정리에만 쓴다 41 / AI 초안을 다듬는다 15, 합 100, 최대 44 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q016 장학금과 아르바이트 사이 — 통과

- 구절: 전도서 4:6 — "한 손에만 가득하고 평온함이 두 손에 가득하고 수고하며 바람을 잡으려는 것보다 나으니라"
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%A0%84%EB%8F%84%EC%84%9C — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=ecc&chap=4 — 일치
- 개역개정 혼입: 개역개정은 어순이 다릅니다("두 손에 가득하고 … 더 나으니라"). 인용문은 개역한글 어순입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 아르바이트를 줄인다 42 / 둘 다 유지한다 39 / 근무를 늘린다 19, 합 100, 최대 42 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q015 시험 기간에 온 선배의 부탁 — 통과

- 구절: 빌립보서 2:4 — "각각 자기 일을 돌아볼 뿐더러 또한 각각 다른 사람들의 일을 돌아보아 나의 기쁨을 충만케 하라"
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EB%B9%8C%EB%A6%BD%EB%B3%B4%EC%84%9C — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=php&chap=2 — 일치
- 개역개정 혼입: 개역개정은 "돌볼뿐더러", "돌보아", "충만하게"로 다릅니다. 인용문은 개역한글입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 이번에는 거절한다 43 / 시험 뒤로 미룬다 40 / 만들어 드린다 17, 합 100, 최대 43 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q014 퇴근 뒤의 15분 — 통과

- 구절: 잠언 14:23 — "모든 수고에는 이익이 있어도 입술의 말은 궁핍을 이룰 뿐이니라"
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=14 — 일치
- 개역개정 혼입: 이 절은 개역한글과 개역개정 본문이 글자 단위로 같습니다. 개역한글 페이지(version=HAN) 두 곳에서 일치함을 확인했습니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 근무로 쳐 달라고 한다 47 / 시간 안에 끝낸다 36 / 그냥 넘어간다 17, 합 100, 최대 47 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q013 중고로 파는 물건의 흠 — 통과

- 구절: 잠언 11:1 — "속이는 저울은 여호와께서 미워하셔도 공평한 추는 그가 기뻐하시느니라"
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=11 — 일치
- 개역개정 혼입: 개역개정은 "미워하시나"로 다릅니다. 인용문은 개역한글 "미워하셔도"입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 적고 값을 낮춘다 63 / 만나서 말한다 28 / 말하지 않는다 9, 합 100, 최대 63 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### q012 잊힌 듯한 빌려준 돈 — 통과

- 구절: 잠언 25:11 — "경우에 합당한 말은 아로새긴 은쟁반에 금사과니라" (다른 질문 묶음과 겹쳐 교체한 구절)
- 위키문헌: https://ko.wikisource.org/wiki/%EA%B0%9C%EC%97%AD%ED%95%9C%EA%B8%80%ED%8C%90/%EC%9E%A0%EC%96%B8 — 일치
- 대한성서공회(HAN): https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=25 — 일치
- 개역개정 혼입: 개역개정은 "은 쟁반에 금 사과니라"로 띄어 씁니다. 인용문은 개역한글 "은쟁반에 금사과니라"입니다.

| 품질 기준 | 점검 |
|---|---|
| (1) 모든 선택지에 정당한 근거 | 선택지마다 실제로 남길 법한 이유를 3개씩 두었고, 어느 쪽도 명백한 잘못으로 그리지 않았습니다. |
| (2) 응답이 갈림 | 가볍게 꺼낸다 58 / 기억할 때까지 기다린다 24 / 없던 일로 한다 18, 합 100, 최대 58 (80 이하) |
| (3) 하루 안에 겪을 법한 크기 | 학교·아르바이트·동아리·돈의 일상 장면이며 거대 쟁점·종교 논쟁이 아닙니다. |
| (4) 선택지 3개 | 3개 |

#### 기존 질문과의 중복 점검

기존 6개(시험 부정행위 목격, 먼저 사과하기, 팀 과제 무임승차, 급여를 더 받음, 도움 청하기, 지키기 어려운 약속)와 상황이 겹치지 않습니다. q021(기출 자료)은 부정행위가 아닌 자료 공유, q014(무급 마감 정리)는 급여 초과와 반대 방향의 상황입니다. 기존 질문의 ref로 쓰인 구절(에베소서 4:15, 마태복음 5:23–24·5:37, 갈라디아서 6:2–5, 누가복음 16:10, 전도서 4:9–10)은 다시 쓰지 않았습니다.

#### 참고

- JSON에는 성경 관점 하나만 넣었습니다. 앱의 PLACEHOLDER_PERSPECTIVES(철학, 오늘의 연구)는 반영할 때 코드에서 덧붙이면 됩니다.
- participants, pct, opinions는 데모용 값입니다.

### 2026-11-05 · 오늘의 질문 3차 (q011–q002) 검증 기록

검증일: 2026-11-05

#### 대조 방법

- 출처 1: 위키문헌 `개역한글판/<책>` 문서 원문(`action=raw`)을 직접 내려받아 해당 장·절을 뽑았습니다.
- 출처 2: 대한성서공회 성경읽기 `https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=<약어>&chap=<장>` (version=HAN, 개역한글)을 직접 내려받아 해당 절을 뽑았습니다.
- 개역개정 혼입 확인: 같은 페이지를 `version=GAE`로 내려받아 비교했습니다.
- JSON의 `verse` 문자열이 두 출처의 해당 절 본문 안에 글자 그대로(공백 포함) 들어 있는지 스크립트로 부분 문자열 비교를 했습니다.
- 교체 3건:
  - 처음 후보였던 잠언 27:2(q004)는 위키문헌 '말지니라', 대한성서공회 '말찌니라'로 두 출처의 글자가 달라 쓰지 않았고, 고린도전서 3:6으로 바꾸었습니다.
  - q006 잠언 3:27, q005 전도서 3:1은 다른 묶음 질문(q029, q024)과 구절이 겹쳐 각각 출애굽기 18:18(일부), 마가복음 1:35로 바꾸고 성경 관점 body도 새 구절에 맞게 고쳤습니다. 이미 쓰인 구절(잠언 11:13, 15:22, 17:17, 27:6, 로마서 13:8, 고린도전서 13:7, 갈라디아서 6:4, 야고보서 1:19)은 피했습니다.
  - 검토 중 버린 후보: 고린도후서 9:7(위키문헌 '말지니', 대한성서공회 HAN '말찌니'로 다름), 마태복음 5:41(위키문헌 '오 리', 대한성서공회 HAN '오리'로 다름), 누가복음 5:16(두 곳 일치했으나 개역개정과 글자가 같아 마가복음 1:35를 택함).

#### 품질 기준(4개)

1) 모든 선택지에 정당한 근거 2) 응답이 갈림(최대 pct ≤ 80, 합 100) 3) 하루 안에 겪을 법한 크기(정치·종교 쟁점 없음) 4) 선택지 3개

기존 질문 6개(부정행위 목격, 먼저 사과, 무임승차, 급여 초과, 도움 청하기, 지키기 어려운 약속)와 상황이 겹치지 않는지도 확인했습니다. q004(칭찬과 공 나누기)는 팀 과제 장면이지만 쟁점이 무임승차가 아니라 칭찬을 나누는 일이라 겹치지 않는다고 판단했습니다.

#### q011 올릴 사진을 고르는 마음 (2026-08-30) — 통과

- 구절: 사무엘상 16:7 — "사람은 외모를 보거니와 나 여호와는 중심을 보느니라"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/사무엘상 (16장 7절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=1sa&chap=16 (7절) | 일치 |

- 개역개정 대조: 구절 일부는 개역개정과 같습니다. 같은 절의 앞부분은 개역개정에서 '그의 용모와 키', '내가 보는 것은'으로 다르며, 끝에 '하시더라'가 붙습니다. 인용한 부분은 개역한글 두 곳과 일치합니다.

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [46, 33, 21], 합 100, 최대 46 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q010 길에서 주운 지갑 (2026-08-29) — 통과

- 구절: 신명기 22:3 — "무릇 형제의 잃은 아무 것이든지 네가 얻거든 다 그리하고 못본체 하지 말 것이며"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/신명기 (22장 3절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=deu&chap=22 (3절) | 일치 |

- 개역개정 대조: 개역개정: '형제가 잃어버린 어떤 것이든지 … 못 본 체하지 말 것이며' — 다름(개역한글은 '무릇 형제의 잃은 아무 것이든지', '못본체').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [55, 28, 17], 합 100, 최대 55 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q009 지하철의 빈자리 (2026-08-28) — 통과

- 구절: 레위기 19:32 — "너는 센 머리 앞에 일어서고 노인의 얼굴을 공경하며"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/레위기 (19장 32절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=lev&chap=19 (32절) | 일치 |

- 개역개정 대조: 개역개정: '센 머리 앞에서 일어서고' — 다름(개역한글은 '앞에').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [62, 27, 11], 합 100, 최대 62 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q008 쉬고 싶은 날의 약속 (2026-08-27) — 통과

- 구절: 마가복음 6:31 — "너희는 따로 한적한 곳에 와서 잠간 쉬어라"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/마가복음 (6장 31절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=mrk&chap=6 (31절) | 일치 |

- 개역개정 대조: 개역개정: '한적한 곳에 가서 잠깐 쉬어라' — 다름(개역한글은 '와서 잠간').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [44, 39, 17], 합 100, 최대 44 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q007 웃음거리가 된 영상 (2026-08-26) — 통과

- 구절: 잠언 17:9 — "허물을 덮어 주는 자는 사랑을 구하는 자요 그것을 거듭 말하는 자는 친한 벗을 이간하는 자니라"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/잠언 (17장 9절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=pro&chap=17 (9절) | 일치 |

- 개역개정 대조: 이 절은 개역개정과 글자가 같습니다. 개역한글 두 곳과 일치합니다.

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [38, 35, 27], 합 100, 최대 38 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q006 거절하기 어려운 부탁 (2026-08-25) — 통과

- 구절: 출애굽기 18:18 — "이 일이 그대에게 너무 중함이라 그대가 혼자 할 수 없으리라"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/출애굽기 (18장 18절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=exo&chap=18 (18절) | 일치 |

- 개역개정 대조: 개역개정은 '이 일이 네게 너무 중함이라 네가 혼자 할 수 없으리라' — 다름(개역한글은 '그대에게', '그대가').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [47, 41, 12], 합 100, 최대 47 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q005 혼자 있고 싶은 저녁 (2026-08-24) — 통과

- 구절: 마가복음 1:35 — "새벽 오히려 미명에 예수께서 일어나 나가 한적한 곳으로 가사 거기서 기도하시더니"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/마가복음 (1장 35절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=mrk&chap=1 (35절) | 일치 |

- 개역개정 대조: 개역개정은 '새벽 아직도 밝기 전에' — 다름(개역한글은 '새벽 오히려 미명에').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [43, 36, 21], 합 100, 최대 43 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q004 나에게 돌아온 칭찬 (2026-08-23) — 통과

- 구절: 고린도전서 3:6 — "나는 심었고 아볼로는 물을 주었으되 오직 하나님은 자라나게 하셨나니"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/고린도전서 (3장 6절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=1co&chap=3 (6절) | 일치 |

- 개역개정 대조: 개역개정: '오직 하나님께서 자라나게' — 다름(개역한글은 '하나님은').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [57, 34, 9], 합 100, 최대 57 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q003 축하하기 어려운 소식 (2026-08-22) — 통과

- 구절: 로마서 12:15 — "즐거워하는 자들로 함께 즐거워하고 우는 자들로 함께 울라"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/로마서 (12장 15절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=rom&chap=12 (15절) | 일치 |

- 개역개정 대조: 개역개정: '자들과 함께' — 다름(개역한글은 '자들로 함께').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [41, 45, 14], 합 100, 최대 45 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |

#### q002 윗집의 발소리 (2026-08-21) — 통과

- 구절: 로마서 12:18 — "할 수 있거든 너희로서는 모든 사람으로 더불어 평화하라"

| 출처 | URL | 일치 |
|---|---|---|
| 위키문헌 개역한글판 | https://ko.wikisource.org/wiki/개역한글판/로마서 (12장 18절) | 일치 |
| 대한성서공회 개역한글 | https://www.bskorea.or.kr/bible/korbibReadpage.php?version=HAN&book=rom&chap=12 (18절) | 일치 |

- 개역개정 대조: 개역개정: '모든 사람과 더불어 화목하라' — 다름(개역한글은 '사람으로 더불어 평화하라').

| 기준 | 점검 |
|---|---|
| 1 선택지 근거 | 세 선택지 모두 opinions에 실제로 있을 법한 이유를 담았습니다 |
| 2 응답 분산 | pct [36, 48, 16], 합 100, 최대 48 ≤ 80 |
| 3 일상 크기 | 대학생·청년의 하루 안의 장면, 정치·종교 쟁점 없음 |
| 4 선택지 수 | 3개 |
