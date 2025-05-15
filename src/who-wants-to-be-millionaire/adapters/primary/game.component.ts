import { Component } from '@angular/core';
import { JokersComponent } from './jokers.component';
import { PyramidComponent } from './pyramid.component';
import { CurrentQuestionComponent } from './current-question.component';
import { SubmitAnswer } from '../../core-logic/usecases/answer-submission/submitAnswer';

@Component({
  selector: 'game',
  template: ` <div class="flex justify-between mx-3">
    <div class="flex flex-col w-6/12">
      <current-question (onGivenAnswer)="_submitAnswer($event)" />
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
export class GameComponent {
  constructor(private submitAnswer: SubmitAnswer) {}

  async _submitAnswer(answer: string) {
    await this.submitAnswer.execute(answer);
  }
}
