import { QuestionGateway } from '../../gateways/questionGateway';
import { AnswerLetter, Question } from '../../models/question';
import { RetrieveQuestion } from '../question-retrieval/retrieveQuestion';
import { PyramidService } from '../../models/pyramidService';
import { AnswerValidationService } from '../../models/answerValidationService';

export class SubmitAnswer {
  constructor(
    private readonly pyramidService: PyramidService,
    private readonly questionGateway: QuestionGateway,
    private readonly retrieveQuestion: RetrieveQuestion,
    private readonly answerValidationService: AnswerValidationService,
  ) {}

  async execute(
    questionId: Question['id'],
    givenAnswer: AnswerLetter,
  ): Promise<void> {
    const isRightAnswer = await this.questionGateway.submitAnswer(
      questionId,
      givenAnswer,
    );

    if (isRightAnswer) {
      this.answerValidationService.storeValidationStatus(true);
      this.pyramidService.increase();
      setTimeout(async () => {
        await this.retrieveQuestion.execute();
      }, 3000);
    } else {
      this.pyramidService.decrease();
    }
  }
}
