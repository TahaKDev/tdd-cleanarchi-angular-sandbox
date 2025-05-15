import { Component, EventEmitter, Inject, Output, Signal } from '@angular/core';
import { KeyValuePipe, NgClass, NgForOf } from '@angular/common';
import {
  PossibleAnswersVM,
  presentPossibleAnswers,
} from '../presenters/answersPresenter';

@Component({
  selector: 'possible-answers',
  template: `
    <div
      class="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg"
    >
      <div
        *ngFor="let answer of possibleAnswersVM() | keyvalue"
        class="border-0 rounded-lg px-3 py-1"
        [ngClass]="answersStatusColors[answer.value.status]"
        [attr.data-testid]="answer.key + ':'"
        (click)="onGivenAnswer.emit(answer.key)"
      >
        <span class="text-orange-500">{{ answer.key }}:</span>
        {{ answer.value.label }}
      </div>
    </div>
  `,
  imports: [NgForOf, KeyValuePipe, NgClass],
})
export class PossibleAnswersComponent {
  possibleAnswersVM: Signal<PossibleAnswersVM | undefined>;

  constructor(
    @Inject('AnswerPresenter')
    answerPresenter: ReturnType<typeof presentPossibleAnswers>,
  ) {
    this.possibleAnswersVM = answerPresenter();
  }

  @Output() onGivenAnswer: EventEmitter<string> = new EventEmitter<string>();

  answersStatusColors = {
    NOT_HIGHLIGHTED: 'bg-gray-900',
    RIGHT: 'bg-green-500',
    WRONG: 'bg-red-500',
  };
}
