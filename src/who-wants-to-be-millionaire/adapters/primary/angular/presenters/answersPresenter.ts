import { AnswerLetter } from '../../../../core-logic/models/question';
import { AnswerValidationService } from '../../../../core-logic/models/answerValidationService';
import { computed, Signal } from '@angular/core';
import { QuestionService } from '../../../../core-logic/models/questionService';

export type PossibleAnswersVM = Record<AnswerLetter, AnswerContentVM>;
export type AnswerContentVM = {
  label: string;
  status: 'NOT_HIGHLIGHTED' | 'RIGHT' | 'WRONG';
};

export const presentPossibleAnswers =
  (
    questionService: QuestionService,
    answerValidationService: AnswerValidationService,
  ) =>
  (): Signal<PossibleAnswersVM | undefined> => {
    return computed(() => {
      const question = questionService.currentQuestionSignal();
      if (!question) return undefined;
      const answerValidation = answerValidationService.answerValidationSignal();
      return {
        A: {
          label: question.possibleAnswers['A'],
          status: answerValidation ? 'RIGHT' : 'NOT_HIGHLIGHTED',
        },
        B: { label: question.possibleAnswers['B'], status: 'NOT_HIGHLIGHTED' },
        C: { label: question.possibleAnswers['C'], status: 'NOT_HIGHLIGHTED' },
        D: { label: question.possibleAnswers['D'], status: 'NOT_HIGHLIGHTED' },
      };
    });
  };
