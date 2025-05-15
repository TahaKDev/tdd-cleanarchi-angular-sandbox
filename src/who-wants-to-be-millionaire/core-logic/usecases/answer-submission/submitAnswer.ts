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

    if (isRightAnswer)
      this.pyramidIndex$.set(this.pyramid.reachedStepIndex + 1);
    else {
      this.pyramidIndex$.set(this.pyramid.levelIndexes.length > 0 ? this.pyramid.levelIndexes[this.findLastReachedLevelIndex()] : 0);
    }
  }

  private findLastReachedLevelIndex(): number {
    for (let i = this.pyramid.levelIndexes.length - 1; i >= 0; i--) {
      if (this.pyramid.levelIndexes[i] <= this.pyramid.reachedStepIndex) {
        return i;
      }
    }
    return 0;
  }

}
