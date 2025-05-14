import { QuestionGateway } from '../../../core-logic/gateways/questionGateway';

export class FakeQuestionGateway implements QuestionGateway {
  correctAnswer: string | undefined = undefined;

  async submitAnswer(givenAnswer: string): Promise<boolean> {
    return this.correctAnswer === givenAnswer;
  }
}
