import { Pyramid, pyramidFactory } from './pyramidFactory';
import { beforeEach, vi } from 'vitest';
import { SubmitAnswer } from './submitAnswer';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Answer submission Use Case', () => {
  let pyramid: Pyramid;
  let httpClientMock: { post: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    pyramid = pyramidFactory();
    pyramid.reachedStepIndex = 0;
    httpClientMock = {
      post: vi.fn(),
    };
  });

  it('Before submitting an answer, the pyramid should be reset', () => {
    expect(pyramid.reachedStepIndex).toBe(0);
  });

  it('After submitting a right answer, the pyramid should increase step', async () => {
    simulateAnswerSubmissionAPI(true);
    await submitAnswer('A');
    expect(pyramid.reachedStepIndex).toBe(1);
  });

  it('After submitting a wrong answer, the pyramid should reset', async () => {
    simulateAnswerSubmissionAPI(false);
    await submitAnswer('A');
    expect(pyramid.reachedStepIndex).toBe(0);
  });

  const submitAnswer = async (givenAnswer: string) => {
    return new SubmitAnswer(
      pyramid,
      httpClientMock as unknown as HttpClient,
    ).execute(givenAnswer);
  };

  const simulateAnswerSubmissionAPI = (shouldBeRightAnswer: boolean) => {
    httpClientMock.post.mockReturnValue(of(shouldBeRightAnswer));
  };
});
