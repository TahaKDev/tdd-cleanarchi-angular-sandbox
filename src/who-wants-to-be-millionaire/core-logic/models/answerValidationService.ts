import { signal } from '@angular/core';

export class AnswerValidationService {
  answerValidationSignal = signal<{ validation: boolean } | undefined>(
    undefined,
  );

  storeValidationStatus(status: boolean) {
    this.answerValidationSignal.set({ validation: status });
  }
}
