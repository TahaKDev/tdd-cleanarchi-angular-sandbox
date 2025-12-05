import { Component, OnInit, signal, Signal } from '@angular/core';
import { JokersComponent } from '../jokers/jokers.component';
import { PyramidComponent } from '../pyramid/pyramid.component';
import { CurrentQuestionComponent } from '../current-question/current-question.component';
import { SubmitAnswer } from '../../../../../core-logic/usecases/answer-submission/submitAnswer';
import { AnswerLetter, Question } from '../../../../../core-logic/models/question';
import { RetrieveQuestion } from '../../../../../core-logic/usecases/question-retrieval/retrieveQuestion';
import { QuestionService } from '../../../../../core-logic/models/questionService';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  imports: [CurrentQuestionComponent, JokersComponent, PyramidComponent],
})
export class GameComponent implements OnInit {
  currentQuestionSignal: Signal<Question | undefined> = signal(undefined);

  constructor(
    private readonly retrieveQuestion: RetrieveQuestion,
    private readonly questionService: QuestionService,
    private readonly submitAnswer: SubmitAnswer,
  ) {
    this.currentQuestionSignal = this.questionService.currentQuestionSignal;
  }

  async ngOnInit() {
    await this.retrieveQuestion.execute();
  }

  async _submitAnswer(answer: string) {
    await this.submitAnswer.execute(
      this.currentQuestionSignal()!.id,
      answer as AnswerLetter,
    );
  }
}
