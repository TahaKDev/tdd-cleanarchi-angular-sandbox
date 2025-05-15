import { signal } from '@angular/core';
import { Pyramid } from './pyramid';

export class PyramidService {
  pyramidIndexSignal = signal<number | undefined>(undefined);

  constructor(public pyramid: Pyramid) {
    this.pyramid = pyramid;
    this.pyramidIndexSignal.set(0);
  }

  increase() {
    this.pyramidIndexSignal.set(++this.pyramid.reachedStepIndex);
  }

  decrease() {
    this.pyramidIndexSignal.set(
      this.pyramid.levelIndexes.length > 0
        ? this.pyramid.levelIndexes[this.findLastReachedLevelIndex()]
        : 0,
    );
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
