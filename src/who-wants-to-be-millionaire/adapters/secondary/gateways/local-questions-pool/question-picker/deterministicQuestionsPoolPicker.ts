import { Question } from '../../../../../core-logic/models/question';
import { QuestionsPoolPicker } from './questionsPoolPicker';

export class DeterministicQuestionsPoolPicker implements QuestionsPoolPicker {
  nextQuestionId: string | undefined = undefined;

  pickQuestion(questions: Question[]): Question {
    return questions.find((question) => question.id === this.nextQuestionId)!;
  }
}
