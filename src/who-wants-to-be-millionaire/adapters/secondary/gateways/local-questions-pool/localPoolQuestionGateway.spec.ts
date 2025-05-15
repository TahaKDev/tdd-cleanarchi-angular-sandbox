import { LocalPoolQuestionGateway } from './localPoolQuestionGateway';
import { Question } from '../../../../core-logic/models/question';
import { DeterministicQuestionsPoolPicker } from './question-picker/deterministicQuestionsPoolPicker';

describe('LocalPoolQuestionGateway', () => {
  let questionGateway: LocalPoolQuestionGateway;
  let questionPoolPicker: DeterministicQuestionsPoolPicker;
  let questionsPool: Question[];

  beforeEach(() => {
    questionsPool = [aQuestion, anotherQuestion];
    questionPoolPicker = new DeterministicQuestionsPoolPicker();
    questionGateway = new LocalPoolQuestionGateway(
      questionPoolPicker,
      questionsPool,
      { 1: 'A' },
    );
  });

  describe('Question retrieval', () => {
    it('should retrieve a random question from the pool', async () => {
      questionPoolPicker.nextQuestionId = '2';
      expect(await questionGateway.nextQuestion()).toEqual(anotherQuestion);
    });

    it('should prevent retrieving a question that has already been retrieved', async () => {
      questionPoolPicker.nextQuestionId = '2';
      await questionGateway.nextQuestion();
      expect(questionsPool).toEqual([aQuestion]);
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
