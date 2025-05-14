import { Pyramid, pyramidFactory } from './pyramidFactory';
import { beforeEach, MockInstance, vi } from 'vitest';
import { SubmitAnswer } from './submitAnswer';
import { HttpClient } from '@angular/common/http';

describe('Answer submission Use Case', () => {
  let pyramid: Pyramid;
  let httpClientMock: MockInstance;

  beforeEach(() => {
    pyramid = pyramidFactory();
    pyramid.reachedStepIndex = 0;
    httpClientMock = vi.fn();
  });

  it('Before submitting an answer, the pyramid should be reset', () => {
    expect(pyramid.reachedStepIndex).toBe(0);
  });

  it('After submitting a right answer, the pyramid should increase step', () => {
    simulateAnswerSubmissionAPI(true);
    submitAnswer('A');
    expect(pyramid.reachedStepIndex).toBe(1);
  });

  it('After submitting a wrong answer, the pyramid should reset', () => {
    simulateAnswerSubmissionAPI(false);
    submitAnswer('A');
    expect(pyramid.reachedStepIndex).toBe(0);
  });

  const submitAnswer = (givenAnswer: string) => {
    new SubmitAnswer(pyramid, httpClientMock as unknown as HttpClient).execute(
      givenAnswer,
    );
  };

  const simulateAnswerSubmissionAPI = (shouldBeRightAnswer: boolean) => {
    httpClientMock.mockImplementation(() => ({
      post: () => ({
        subscribe: (callback: (response: boolean) => void) => {
          callback(shouldBeRightAnswer); // Simulate a right answer
        },
      }),
    }));
  };
});
