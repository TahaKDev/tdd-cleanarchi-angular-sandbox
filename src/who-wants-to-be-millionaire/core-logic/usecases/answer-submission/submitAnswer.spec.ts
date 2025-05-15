import { Pyramid, pyramidFactory } from './pyramidFactory';
import { beforeEach } from 'vitest';
import { SubmitAnswer } from './submitAnswer';
import { FakeQuestionGateway } from '../../../adapters/secondary/gateways/fakeQuestionGateway';

describe('Answer submission Use Case', () => {
  let pyramid: Pyramid;
  let questionGateway: FakeQuestionGateway;
  let submitAnswer: SubmitAnswer;

  beforeEach(() => {
    pyramid = pyramidFactory();
    questionGateway = new FakeQuestionGateway();
    submitAnswer = new SubmitAnswer(pyramid, questionGateway);
  });

  it('Before submitting an answer, the pyramid should be reset', () => {
    expect(submitAnswer.pyramidIndexSignal()).toBe(0);
  });

  it('After submitting a right answer, the pyramid should increase step', async () => {
    questionGateway.correctAnswer = 'A';
    await submitAnswer.execute('A');
    expect(submitAnswer.pyramidIndexSignal()).toBe(1);
  });

  it('After submitting a wrong answer, the pyramid should reset', async () => {
    questionGateway.correctAnswer = 'B';
    pyramid.reachedStepIndex = 1;
    await submitAnswer.execute('A');
    expect(submitAnswer.pyramidIndexSignal()).toBe(0);
  });
});
