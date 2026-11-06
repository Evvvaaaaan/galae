export const choiceOf = (question, sel) => question.choices.find(c => c.id === sel);
export const dateLabel = date => `${Number(date.slice(0, 4))}년 ${Number(date.slice(5, 7))}월 ${Number(date.slice(8, 10))}일`;
