import {
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideRedux } from '@reduxjs/angular-redux';
import { store } from './store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  Pyramid,
  pyramidFactory,
} from './core-logic/usecases/answer-submission/pyramidFactory';
import { SubmitAnswer } from './core-logic/usecases/answer-submission/submitAnswer';
import { QuestionGateway } from './core-logic/gateways/questionGateway';
import { RetrieveQuestion } from './core-logic/usecases/question-retrieval/retrieveQuestion';
import {
  DeterministicQuestionPoolPicker,
  LocalPoolQuestionGateway,
  RandomQuestionPoolPicker,
} from './adapters/secondary/gateways/localPoolQuestionGateway';

export const providePyramid: Provider = {
  provide: 'PYRAMID',
  useFactory: () => {
    return pyramidFactory([0, 4, 8, 11]);
  },
};

export const provideSubmitAnswer = {
  provide: SubmitAnswer,
  useFactory: (pyramid: Pyramid, questionGateway: QuestionGateway) => {
    return new SubmitAnswer(pyramid, questionGateway);
  },
  deps: ['PYRAMID', 'QUESTION_GATEWAY'],
};

export const provideRetrieveQuestion = {
  provide: RetrieveQuestion,
  useFactory: (questionGateway: QuestionGateway) => {
    return new RetrieveQuestion(questionGateway);
  },
  deps: ['QUESTION_GATEWAY'],
};

export const provideQuestionGateway: Provider = {
  provide: 'QUESTION_GATEWAY',
  useFactory: () => {
    return new LocalPoolQuestionGateway(
      new RandomQuestionPoolPicker(),
      [
        {
          id: '1',
          label: 'What is the capital of France?',
          possibleAnswers: {
            A: 'Paris',
            B: 'London',
            C: 'Berlin',
            D: 'Madrid',
          },
        },
        {
          id: '2',
          label: 'What is the capital of Germany?',
          possibleAnswers: {
            A: 'Madrid',
            B: 'London',
            C: 'Paris',
            D: 'Berlin',
          },
        },
      ],
      { 1: 'A', 2: 'D' },
    );
  },
};

export const provideGameDependencies: Provider[] = [
  providePyramid,
  provideQuestionGateway,
  provideSubmitAnswer,
  provideRetrieveQuestion,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRedux({ store }),
    provideAnimationsAsync(),
    ...provideGameDependencies,
  ],
};
