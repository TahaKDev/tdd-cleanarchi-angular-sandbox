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
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    await submitAnswer.execute('1', 'A');
    expect(submitAnswer.pyramidIndexSignal()).toBe(1);
  });

  it('After submitting two right answers, the pyramid should have increased twice', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    await submitAnswer.execute('1', 'A');
    await submitAnswer.execute('1', 'A');
    expect(submitAnswer.pyramidIndexSignal()).toBe(2);
  });

  it('After submitting a wrong answer, the pyramid should reset', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    pyramid.reachedStepIndex = 1;
    await submitAnswer.execute('1', 'B');
    expect(submitAnswer.pyramidIndexSignal()).toBe(0);
  });

  it('After submitting a wrong answer, the pyramid should fall to the last level', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    pyramid.levelIndexes = [1];
    pyramid.reachedStepIndex = 1;
    await submitAnswer.execute('1', 'B');
    expect(submitAnswer.pyramidIndexSignal()).toBe(1);
  });

  it('After submitting a wrong answer, and having reached the second level, the pyramid should fall to the last level', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    pyramid.levelIndexes = [1, 2, 8];
    pyramid.reachedStepIndex = 2;
    await submitAnswer.execute('1', 'B');
    expect(submitAnswer.pyramidIndexSignal()).toBe(2);
  });
});
