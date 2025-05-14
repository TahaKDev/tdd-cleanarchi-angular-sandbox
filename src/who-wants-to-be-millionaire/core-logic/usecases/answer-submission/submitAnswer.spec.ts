import { Pyramid, pyramidFactory } from './pyramidFactory';
import { beforeEach } from 'vitest';
import { SubmitAnswer } from './submitAnswer';
import { FakeQuestionGateway } from '../../../adapters/secondary/gateways/fakeQuestionGateway';

describe('Answer submission Use Case', () => {
  let pyramid: Pyramid;
  let questionGateway: FakeQuestionGateway;

  beforeEach(() => {
    pyramid = pyramidFactory();
    pyramid.reachedStepIndex = 0;
    questionGateway = new FakeQuestionGateway();
  });

  it('Before submitting an answer, the pyramid should be reset', () => {
    expect(pyramid.reachedStepIndex).toBe(0);
  });

  it('After submitting a right answer, the pyramid should increase step', async () => {
    questionGateway.correctAnswer = 'A';
    await new SubmitAnswer(pyramid, questionGateway).execute('A');
    expect(pyramid.reachedStepIndex).toBe(1);
  });

  it('After submitting a wrong answer, the pyramid should reset', async () => {
    questionGateway.correctAnswer = 'B';
    pyramid.reachedStepIndex = 1;
    await new SubmitAnswer(pyramid, questionGateway).execute('A');
    expect(pyramid.reachedStepIndex).toBe(0);
  });
});
