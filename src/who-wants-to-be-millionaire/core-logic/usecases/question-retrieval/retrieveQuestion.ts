import { QuestionGateway } from '../../gateways/questionGateway';
import { QuestionService } from '../../models/questionService';

export class RetrieveQuestion {
  constructor(
    private questionGateway: QuestionGateway,
    private questionService: QuestionService,
  ) {}

  async execute(): Promise<void> {
    const question = await this.questionGateway.nextQuestion();
    this.questionService.storeCurrentQuestion(question);
  }
}
