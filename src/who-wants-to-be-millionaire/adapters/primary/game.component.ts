import { Component, Inject, Input } from '@angular/core';
import { JokersComponent } from './jokers.component';
import { PyramidComponent } from './pyramid.component';
import { CurrentQuestionComponent } from './current-question.component';
import { Pyramid } from '../../core-logic/usecases/answer-submission/pyramidFactory';
import { submitAnswer } from '../../core-logic/usecases/answer-submission/submitAnswer';

@Component({
  selector: 'game',
  template: ` <div class="flex justify-between mx-3">
    <div class="flex flex-col w-6/12">
      <current-question (onGivenAnswer)="submitAnswer($event)" />
    </div>
    <div class="flex flex-col w-6/12 bg-gradient-to-r from-indigo-900 ml-5">
      <div>
        <jokers />
        <pyramid [pyramid]="pyramid" />
      </div>
    </div>
  </div>`,
  imports: [CurrentQuestionComponent, JokersComponent, PyramidComponent],
})
export class GameComponent {
  @Input() pyramid: Pyramid | undefined = undefined;

  constructor(@Inject('PYRAMID') private pyramidValue: Pyramid) {}

  ngOnInit() {
    this.pyramid = this.pyramidValue;
  }

  submitAnswer(answer: string) {
    submitAnswer(answer, this.pyramid!);
  }
}
