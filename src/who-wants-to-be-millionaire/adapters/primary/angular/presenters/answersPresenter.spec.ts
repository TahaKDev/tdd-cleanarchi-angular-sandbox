import { presentPossibleAnswers } from './answersPresenter';
import { beforeEach } from 'vitest';
import { AnswerValidationService } from '../../../../core-logic/models/answerValidationService';
import { QuestionService } from '../../../../core-logic/models/questionService';

describe('AnswersPresenter', () => {
  let answerValidationService: AnswerValidationService;
  let questionService: QuestionService;
  let _answerPresenter: ReturnType<typeof presentPossibleAnswers>;

  beforeEach(() => {
    answerValidationService = new AnswerValidationService();
    questionService = new QuestionService();
    _answerPresenter = presentPossibleAnswers(
      questionService,
      answerValidationService,
    );
  });

  describe('When the game starts', () => {
    it('before the question is retrieved', () => {
      expect(_answerPresenter()()).toBe(undefined);
    });

    it('when retrieved question, should not highlight any possible answer', () => {
      questionService.currentQuestionSignal.set(aQuestion);
      expect(_answerPresenter()()).toEqual({
        A: { label: 'Paris', status: 'NOT_HIGHLIGHTED' },
        B: { label: 'London', status: 'NOT_HIGHLIGHTED' },
        C: { label: 'Berlin', status: 'NOT_HIGHLIGHTED' },
        D: { label: 'Madrid', status: 'NOT_HIGHLIGHTED' },
      });
    });
  });

  describe('When an answer has been submitted', () => {
    beforeEach(() => {
      questionService.currentQuestionSignal.set(aQuestion);
    });

    describe('On a right answer', () => {
      beforeEach(async () => {
        answerValidationService.answerValidationSignal.set({
          validation: true,
        });
      });

      it('should highlight it', () => {
        expect(_answerPresenter()()).toEqual({
          A: { label: 'Paris', status: 'RIGHT' },
          B: { label: 'London', status: 'NOT_HIGHLIGHTED' },
          C: { label: 'Berlin', status: 'NOT_HIGHLIGHTED' },
          D: { label: 'Madrid', status: 'NOT_HIGHLIGHTED' },
        });
      });
    });
  });

  const aQuestion = {
    id: '123abc',
    label: 'What is the capital of France?',
    possibleAnswers: {
      A: 'Paris',
      B: 'London',
      C: 'Berlin',
      D: 'Madrid',
    },
  };
});
