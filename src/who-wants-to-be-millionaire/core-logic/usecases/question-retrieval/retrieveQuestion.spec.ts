import { Question } from './question';
import { FakeQuestionGateway } from '../../../adapters/secondary/gateways/fakeQuestionGateway';
import { RetrieveQuestion } from './retrieveQuestion';

describe('Question retrieval Use Case', () => {
  let retrieveQuestion: RetrieveQuestion;
  let questionGateway: FakeQuestionGateway;

  beforeEach(() => {
    questionGateway = new FakeQuestionGateway();
    retrieveQuestion = new RetrieveQuestion(questionGateway);
  });

  it('should retrieve the next question', async () => {
    questionGateway.currentQuestion = aQuestion;
    await retrieveQuestion.execute();
    expect(retrieveQuestion.currentQuestionSignal()).toEqual(aQuestion);
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
