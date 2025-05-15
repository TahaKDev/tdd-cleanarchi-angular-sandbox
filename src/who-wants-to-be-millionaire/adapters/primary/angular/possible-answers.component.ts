import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { Question } from '../../../core-logic/usecases/question-retrieval/question';

@Component({
  selector: 'possible-answers',
  template: `
    <div
      class="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg"
    >
      <div
        *ngFor="let answer of answers | keyvalue"
        class="border-0 rounded-lg px-3 py-1 bg-gray-900"
        [attr.data-testid]="answer.key + ':'"
        (click)="onGivenAnswer.emit(answer.key)"
      >
        <span class="text-orange-500">{{ answer.key }}:</span>
        {{ answer.value }}
      </div>
    </div>
  `,
  imports: [NgForOf, KeyValuePipe],
})
export class PossibleAnswersComponent {
  @Input() answers!: Question['possibleAnswers'];
  @Output() onGivenAnswer: EventEmitter<string> = new EventEmitter<string>();
}
