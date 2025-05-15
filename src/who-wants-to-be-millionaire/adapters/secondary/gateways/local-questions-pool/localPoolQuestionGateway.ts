import { QuestionGateway } from '../../../../core-logic/gateways/questionGateway';
import { AnswerLetter, Question } from '../../../../core-logic/models/question';
import { QuestionsPoolPicker } from './question-picker/questionsPoolPicker';

export class LocalPoolQuestionGateway implements QuestionGateway {
  constructor(
    private readonly questionPoolPicker: QuestionsPoolPicker,
    private readonly questions: Question[],
    private readonly correctAnswers: Record<Question['id'], AnswerLetter>,
  ) {}

  async submitAnswer(
    questionId: Question['id'],
    givenAnswer: AnswerLetter,
  ): Promise<boolean> {
    return this.correctAnswers[questionId] === (givenAnswer as AnswerLetter);
  }

  async nextQuestion(): Promise<Question> {
    const nextQuestion = this.questionPoolPicker.pickQuestion(this.questions);
    this.questions.splice(this.questions.indexOf(nextQuestion), 1);
    return nextQuestion;
  }
}
