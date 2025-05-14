import { Component, EventEmitter, Output } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'possible-answers',
  template: `
    <div
      class="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg"
    >
      <div
        *ngFor="let answer of answers"
        class="border-0 rounded-lg px-3 py-1 bg-gray-900"
        [attr.data-testid]="answer.id + ':'"
        (click)="onGivenAnswer.emit(answer.id)"
      >
        <span class="text-orange-500">{{ answer.id }}:</span> {{ answer.text }}
      </div>
    </div>
  `,
  imports: [NgForOf],
})
export class PossibleAnswersComponent {
  @Output() onGivenAnswer: EventEmitter<string> = new EventEmitter<string>();

  answers = [
    { id: 'A', text: 'Third-Driven Development' },
    { id: 'B', text: 'Test-Driven Development' },
    { id: 'C', text: 'Test-Deep Development' },
    { id: 'D', text: 'Test-Driven Design' },
  ];
}
