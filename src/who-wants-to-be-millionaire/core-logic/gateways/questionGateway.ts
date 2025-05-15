import {
  AnswerLetter,
  Question,
} from '../usecases/question-retrieval/question';

export interface QuestionGateway {
  submitAnswer(
    questionId: Question['id'],
    givenAnswer: AnswerLetter,
  ): Promise<boolean>;
  nextQuestion(): Promise<Question>;
}
