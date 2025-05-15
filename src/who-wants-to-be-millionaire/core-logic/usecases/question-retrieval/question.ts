export type Question = {
  id: string;
  label: string;
  possibleAnswers: Record<AnswerLetter, string>;
};

export type AnswerLetter = 'A' | 'B' | 'C' | 'D';
