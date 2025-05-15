import { Question } from '../../../../../core-logic/models/question';

export interface QuestionsPoolPicker {
  pickQuestion(questions: Question[]): Question;
}
