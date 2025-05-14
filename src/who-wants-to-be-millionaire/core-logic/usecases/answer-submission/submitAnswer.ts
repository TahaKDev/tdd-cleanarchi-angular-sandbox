import { Pyramid } from './pyramidFactory';
import { QuestionGateway } from '../../gateways/questionGateway';

export class SubmitAnswer {
  constructor(
    private readonly pyramid: Pyramid,
    private readonly questionGateway: QuestionGateway,
  ) {}

  async execute(givenAnswer: string): Promise<void> {
    const isRightAnswer = await this.questionGateway.submitAnswer(givenAnswer);
    if (isRightAnswer) this.pyramid.reachedStepIndex++;
    else this.pyramid.reachedStepIndex = 0;
  }
}
