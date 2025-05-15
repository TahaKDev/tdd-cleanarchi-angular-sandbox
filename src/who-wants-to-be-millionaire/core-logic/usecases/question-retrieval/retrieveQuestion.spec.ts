import { Question } from '../../models/question';
import { FakeQuestionGateway } from '../../../adapters/secondary/gateways/fakeQuestionGateway';
import { RetrieveQuestion } from './retrieveQuestion';
import { QuestionService } from '../../models/questionService';

describe('Question retrieval Use Case', () => {
  let retrieveQuestion: RetrieveQuestion;
  let questionGateway: FakeQuestionGateway;
  let questionService: QuestionService;

  beforeEach(() => {
    questionGateway = new FakeQuestionGateway();
    questionService = new QuestionService();
    retrieveQuestion = new RetrieveQuestion(questionGateway, questionService);
  });

  it('should retrieve the next question', async () => {
    questionGateway.currentQuestion = aQuestion;
    await retrieveQuestion.execute();
    expect(questionService.currentQuestionSignal()).toEqual(aQuestion);
  });

  const aQuestion: Question = {
    id: '1',
    label: "Que signifie l'acronyme TDD ?",
    possibleAnswers: {
      A: 'Third-Driven Development',
      B: 'Test-Driven Development',
      C: 'Test-Deep Development',
      D: 'Test-Driven Design',
    },
  };
});
