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
import { SubmitAnswer } from './core-logic/usecases/answer-submission/submitAnswer';
import { QuestionGateway } from './core-logic/gateways/questionGateway';
import { RetrieveQuestion } from './core-logic/usecases/question-retrieval/retrieveQuestion';
import { LocalPoolQuestionGateway } from './adapters/secondary/gateways/local-questions-pool/localPoolQuestionGateway';
import { RandomQuestionsPoolPicker } from './adapters/secondary/gateways/local-questions-pool/question-picker/randomQuestionsPoolPicker';
import { PyramidService } from './core-logic/models/pyramidService';
import { AnswerValidationService } from './core-logic/models/answerValidationService';
import { QuestionService } from './core-logic/models/questionService';
import { presentPossibleAnswers } from './adapters/primary/angular/presenters/answersPresenter';

export const providePyramidService: Provider = {
  provide: PyramidService,
  useFactory: () => {
    return new PyramidService({
      levelIndexes: [0, 4, 8, 11],
      reachedStepIndex: 0,
    });
  },
};

export const provideAnswerPresenter: Provider = {
  provide: 'AnswerPresenter',
  useFactory: (
    questionService: QuestionService,
    answerValidationService: AnswerValidationService,
  ) => {
    return presentPossibleAnswers(questionService, answerValidationService);
  },
  deps: [QuestionService, AnswerValidationService],
};

export const provideQuestionService: Provider = {
  provide: QuestionService,
  useClass: QuestionService,
};

export const provideAnswerValidationService: Provider = {
  provide: AnswerValidationService,
  useClass: AnswerValidationService,
};

export const provideSubmitAnswer = {
  provide: SubmitAnswer,
  useFactory: (
    pyramidService: PyramidService,
    questionGateway: QuestionGateway,
    retrieveQuestion: RetrieveQuestion,
    answerValidationService: AnswerValidationService,
  ) => {
    return new SubmitAnswer(
      pyramidService,
      questionGateway,
      retrieveQuestion,
      answerValidationService,
    );
  },
  deps: [
    PyramidService,
    'QUESTION_GATEWAY',
    RetrieveQuestion,
    AnswerValidationService,
  ],
};

export const provideRetrieveQuestion = {
  provide: RetrieveQuestion,
  useFactory: (
    questionGateway: QuestionGateway,
    questionService: QuestionService,
  ) => {
    return new RetrieveQuestion(questionGateway, questionService);
  },
  deps: ['QUESTION_GATEWAY', QuestionService],
};

export const provideQuestionGateway: Provider = {
  provide: 'QUESTION_GATEWAY',
  useFactory: () => {
    return new LocalPoolQuestionGateway(
      new RandomQuestionsPoolPicker(),
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
  providePyramidService,
  provideQuestionGateway,
  provideSubmitAnswer,
  provideRetrieveQuestion,
  provideAnswerValidationService,
  provideQuestionService,
  provideAnswerPresenter,
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
