import { Component, EventEmitter, Inject, Output, Signal } from '@angular/core';
import { KeyValuePipe, NgClass, NgForOf } from '@angular/common';
import {
  PossibleAnswersVM,
  presentPossibleAnswers,
} from '../../presenters/answersPresenter';

@Component({
  selector: 'possible-answers',
  templateUrl: './possible-answers.component.html',
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
