import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionTitleComponent } from './question-title.component';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { PossibleAnswersComponent } from './possible-answers.component';
import { CountdownComponent } from './countdown.component';
import { Question } from '../../../../core-logic/models/question';

@Component({
  selector: 'current-question',
  template: `
    <div class="text-center">
      <img
        ngSrc="/img/jfoucault.jpeg"
        alt="Jean-Pierre Foucault"
        height="500"
        width="1200"
      />
      <br />
      <div *ngIf="question" data-testid="question-bloc">
        <game-countdown></game-countdown>
        <question-title [label]="question.label"></question-title>
        <possible-answers
          (onGivenAnswer)="onGivenAnswer.emit($event)"
        ></possible-answers>
      </div>
    </div>
  `,
  imports: [
    QuestionTitleComponent,
    NgOptimizedImage,
    PossibleAnswersComponent,
    CountdownComponent,
    NgIf,
  ],
})
export class CurrentQuestionComponent {
  @Output() onGivenAnswer: EventEmitter<string> = new EventEmitter<string>();
  @Input() question: Question | undefined = undefined;
}
