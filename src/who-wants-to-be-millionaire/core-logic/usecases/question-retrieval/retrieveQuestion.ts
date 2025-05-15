import { QuestionGateway } from '../../gateways/questionGateway';
import { Question } from './question';
import { signal } from '@angular/core';

export class RetrieveQuestion {
  private currentQuestion$ = signal<Question | undefined>(undefined);

  readonly currentQuestionSignal = this.currentQuestion$.asReadonly();

  constructor(private questionGateway: QuestionGateway) {}

  async execute(): Promise<void> {
    const question = await this.questionGateway.nextQuestion();
    this.currentQuestion$.set(question);
  }
}
