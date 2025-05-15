import { afterEach, beforeEach } from 'vitest';
import { SubmitAnswer } from './submitAnswer';
import { FakeQuestionGateway } from '../../../adapters/secondary/gateways/fakeQuestionGateway';
import { Question } from '../../models/question';
import { RetrieveQuestion } from '../question-retrieval/retrieveQuestion';
import { vi } from 'vitest';
import { PyramidService } from '../../models/pyramidService';
import { AnswerValidationService } from '../../models/answerValidationService';
import { QuestionService } from '../../models/questionService';

describe('Answer submission Use Case', () => {
  let pyramidService: PyramidService;
  let questionGateway: FakeQuestionGateway;
  let submitAnswer: SubmitAnswer;
  let retrieveQuestion: RetrieveQuestion;
  let answerValidationService: AnswerValidationService;
  let questionService: QuestionService;

  beforeEach(() => {
    pyramidService = new PyramidService({
      levelIndexes: [],
      reachedStepIndex: 0,
    });
    questionGateway = new FakeQuestionGateway();
    questionService = new QuestionService();
    retrieveQuestion = new RetrieveQuestion(questionGateway, questionService);
    answerValidationService = new AnswerValidationService();
    submitAnswer = new SubmitAnswer(
      pyramidService,
      questionGateway,
      retrieveQuestion,
      answerValidationService,
    );
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Before submitting an answer, the pyramid should be reset', () => {
    expect(pyramidService.pyramidIndexSignal()).toBe(0);
  });

  it('After submitting a right answer, the pyramid should increase step', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    await submitAnswer.execute('1', 'A');
    expect(pyramidService.pyramidIndexSignal()).toBe(1);
  });

  it('After submitting two right answers, the pyramid should have increased twice', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    await submitAnswer.execute('1', 'A');
    await submitAnswer.execute('1', 'A');
    expect(pyramidService.pyramidIndexSignal()).toBe(2);
  });

  it('should store the current submission status', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    await submitAnswer.execute('1', 'A');
    expect(answerValidationService.answerValidationSignal()).toEqual({
      validation: true,
    });
  });

  it('After submitting a wrong answer, the pyramid should reset', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    pyramidService.pyramid.reachedStepIndex = 1;
    await submitAnswer.execute('1', 'B');
    expect(pyramidService.pyramidIndexSignal()).toBe(0);
  });

  it('After submitting a wrong answer, the pyramid should fall to the last level', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    pyramidService.pyramid.levelIndexes = [1];
    pyramidService.pyramid.reachedStepIndex = 1;
    await submitAnswer.execute('1', 'B');
    expect(pyramidService.pyramidIndexSignal()).toBe(1);
  });

  it('After submitting a wrong answer, and having reached the second level, the pyramid should fall to the last level', async () => {
    questionGateway.correctAnswerByQuestionId = { 1: 'A' };
    pyramidService.pyramid.levelIndexes = [1, 2, 8];
    pyramidService.pyramid.reachedStepIndex = 2;
    await submitAnswer.execute('1', 'B');
    expect(pyramidService.pyramidIndexSignal()).toBe(2);
  });

  it.each`
    delay   |
    ${2999}
    ${3000}
  `(
    'should retrieve the next question after submitting a right answer and a specific delay',
    async ({ delay }: { delay: number }) => {
      questionGateway.currentQuestion = nextQuestionAfterRightAnswer;
      questionGateway.correctAnswerByQuestionId = { 1: 'A' };
      await submitAnswer.execute('1', 'A');
      await vi.advanceTimersByTimeAsync(delay);
      if (delay === 3000) {
        expect(questionService.currentQuestionSignal()).toEqual(
          nextQuestionAfterRightAnswer,
        );
      } else expect(questionService.currentQuestionSignal()).toBe(undefined);
    },
  );

  const nextQuestionAfterRightAnswer: Question = {
    id: '2',
    label: 'What is the capital of Germany?',
    possibleAnswers: {
      A: 'Berlin',
      B: 'Madrid',
      C: 'Paris',
      D: 'London',
    },
  };
});
