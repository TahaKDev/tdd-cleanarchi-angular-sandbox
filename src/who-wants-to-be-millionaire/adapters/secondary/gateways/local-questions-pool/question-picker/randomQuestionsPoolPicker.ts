import { Question } from '../../../../../core-logic/models/question';
import { QuestionsPoolPicker } from './questionsPoolPicker';

export class RandomQuestionsPoolPicker implements QuestionsPoolPicker {
  pickQuestion(questions: Question[]): Question {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
}
