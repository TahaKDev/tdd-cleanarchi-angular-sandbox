import { Pyramid } from './pyramidFactory';
import { QuestionGateway } from '../../gateways/questionGateway';
import { signal } from '@angular/core';

export class SubmitAnswer {
  private pyramidIndex$ = signal<number | undefined>(undefined);

  readonly pyramidIndexSignal = this.pyramidIndex$.asReadonly();

  constructor(
    private readonly pyramid: Pyramid,
    private readonly questionGateway: QuestionGateway,
  ) {
    this.pyramidIndex$.set(0);
  }

  async execute(givenAnswer: string): Promise<void> {
    const isRightAnswer = await this.questionGateway.submitAnswer(givenAnswer);
    if (isRightAnswer) this.pyramid.reachedStepIndex++;
    else this.pyramid.reachedStepIndex = 0;
    this.pyramidIndex$.set(this.pyramid.reachedStepIndex);
  }
}
