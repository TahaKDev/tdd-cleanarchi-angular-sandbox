import { signal } from '@angular/core';
import { Question } from './question';

export class QuestionService {
  currentQuestionSignal = signal<Question | undefined>(undefined);

  storeCurrentQuestion(question: Question) {
    this.currentQuestionSignal.set(question);
  }
}
