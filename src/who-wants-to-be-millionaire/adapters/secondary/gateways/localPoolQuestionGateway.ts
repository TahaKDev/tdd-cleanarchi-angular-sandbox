import { QuestionGateway } from '../../../core-logic/gateways/questionGateway';
import {
  AnswerLetter,
  Question,
} from '../../../core-logic/usecases/question-retrieval/question';

export class LocalPoolQuestionGateway implements QuestionGateway {
  constructor(
    private readonly questionPoolPicker: QuestionPoolPicker,
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
    return this.questionPoolPicker.pickQuestion(this.questions);
  }
}

interface QuestionPoolPicker {
  pickQuestion(questions: Question[]): Question;
}

export class DeterministicQuestionPoolPicker implements QuestionPoolPicker {
  nextQuestionId: string | undefined = undefined;

  pickQuestion(questions: Question[]): Question {
    return questions.find((question) => question.id === this.nextQuestionId)!;
  }
}

export class RandomQuestionPoolPicker implements QuestionPoolPicker {
  pickQuestion(questions: Question[]): Question {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
}
