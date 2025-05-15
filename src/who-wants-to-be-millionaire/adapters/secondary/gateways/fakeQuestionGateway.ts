import { QuestionGateway } from '../../../core-logic/gateways/questionGateway';
import {
  AnswerLetter,
  Question,
} from '../../../core-logic/usecases/question-retrieval/question';

export class FakeQuestionGateway implements QuestionGateway {
  correctAnswerByQuestionId: Record<Question['id'], AnswerLetter> = {};
  currentQuestion: Question | undefined = undefined;

  async nextQuestion(): Promise<Question> {
    return this.currentQuestion!;
  }

  async submitAnswer(
    questionId: Question['id'],
    givenAnswer: AnswerLetter,
  ): Promise<boolean> {
    return this.correctAnswerByQuestionId[questionId] === givenAnswer;
  }
}
