import { Pyramid } from './pyramidFactory';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export class SubmitAnswer {
  constructor(
    private readonly pyramid: Pyramid,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(givenAnswer: string): Promise<void> {
    const isRightAnswer = await lastValueFrom(
      this.httpClient.post<boolean>('https://api.example.com/validate-answer', {
        answer: givenAnswer,
      }),
    );
    if (isRightAnswer) this.pyramid.reachedStepIndex++;
  }
}
