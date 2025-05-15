import {
  DeterministicQuestionPoolPicker,
  LocalPoolQuestionGateway,
} from './localPoolQuestionGateway';
import { Question } from '../../../core-logic/usecases/question-retrieval/question';

describe('LocalPoolQuestionGateway', () => {
  let questionGateway: LocalPoolQuestionGateway;
  let questionPoolPicker: DeterministicQuestionPoolPicker;

  beforeEach(() => {
    questionPoolPicker = new DeterministicQuestionPoolPicker();
    questionGateway = new LocalPoolQuestionGateway(
      questionPoolPicker,
      [aQuestion, anotherQuestion],
      { 1: 'A' },
    );
  });

  describe('Question retrieval', () => {
    it('should retrieve a random question from the pool', async () => {
      questionPoolPicker.nextQuestionId = '2';
      expect(await questionGateway.nextQuestion()).toEqual(anotherQuestion);
    });
  });

  describe('Answer submission', () => {
    it('should have submitted a right answer', async () => {
      expect(await questionGateway.submitAnswer('1', 'A')).toBeTruthy();
    });

    it('should have submitted a wrong answer', async () => {
      expect(await questionGateway.submitAnswer('1', 'B')).toBeFalsy();
    });
  });

  const aQuestion: Question = {
    id: '1',
    label: 'What is the capital of France?',
    possibleAnswers: {
      A: 'Paris',
      B: 'London',
      C: 'Berlin',
      D: 'Madrid',
    },
  };

  const anotherQuestion: Question = { ...aQuestion, id: '2' };
});
