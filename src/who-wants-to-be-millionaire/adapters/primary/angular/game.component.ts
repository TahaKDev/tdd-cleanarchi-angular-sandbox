import { Component, OnInit, signal, Signal } from '@angular/core';
import { JokersComponent } from './jokers.component';
import { PyramidComponent } from './pyramid.component';
import { CurrentQuestionComponent } from './current-question.component';
import { SubmitAnswer } from '../../../core-logic/usecases/answer-submission/submitAnswer';
import {
  AnswerLetter,
  Question,
} from '../../../core-logic/usecases/question-retrieval/question';
import { RetrieveQuestion } from '../../../core-logic/usecases/question-retrieval/retrieveQuestion';

@Component({
  selector: 'game',
  template: ` <div class="flex justify-between mx-3">
    <div class="flex flex-col w-6/12">
      <current-question
        [question]="currentQuestionSignal()"
        (onGivenAnswer)="_submitAnswer($event)"
      />
    </div>
    <div class="flex flex-col w-6/12 bg-gradient-to-r from-indigo-900 ml-5">
      <div>
        <jokers />
        <pyramid />
      </div>
    </div>
  </div>`,
  imports: [CurrentQuestionComponent, JokersComponent, PyramidComponent],
})
export class GameComponent implements OnInit {
  currentQuestionSignal: Signal<Question | undefined> = signal(undefined);

  constructor(
    private readonly retrieveQuestion: RetrieveQuestion,
    private readonly submitAnswer: SubmitAnswer,
  ) {
    this.currentQuestionSignal = this.retrieveQuestion.currentQuestionSignal;
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
