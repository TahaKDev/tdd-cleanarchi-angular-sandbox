import { AnswerLetter, Question } from '../models/question';

export interface QuestionGateway {
  submitAnswer(
    questionId: Question['id'],
    givenAnswer: AnswerLetter,
  ): Promise<boolean>;
  nextQuestion(): Promise<Question>;
}
