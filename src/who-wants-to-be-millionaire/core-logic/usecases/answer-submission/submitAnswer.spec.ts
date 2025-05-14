import { Pyramid, pyramidFactory } from './pyramidFactory';
import { beforeEach } from 'vitest';
import { submitAnswer } from './submitAnswer';

describe('Answer submission Use Case', () => {
  let pyramid: Pyramid;

  beforeEach(() => {
    pyramid = pyramidFactory();
    pyramid.reachedStepIndex = 0;
  });

  it('After submitting a right answer, the pyramid should increase step', () => {
    submitAnswer('A', pyramid);
    expect(pyramid.reachedStepIndex).toBe(1);
  });

  it('Before submitting an answer, the pyramid should be reset', () => {
    expect(pyramid.reachedStepIndex).toBe(0);
  });
});
