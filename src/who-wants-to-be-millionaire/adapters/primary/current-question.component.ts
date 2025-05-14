import { Component, EventEmitter, Output } from '@angular/core';
import { QuestionTitleComponent } from './question-title.component';
import { NgOptimizedImage } from '@angular/common';
import { PossibleAnswersComponent } from './possible-answers.component';
import { CountdownComponent } from './countdown.component';

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
      <game-countdown></game-countdown>
      <question-title title="Que signifie l'acronyme TDD ?"></question-title>
      <possible-answers
        (onGivenAnswer)="onGivenAnswer.emit($event)"
      ></possible-answers>
    </div>
  `,
  imports: [
    QuestionTitleComponent,
    NgOptimizedImage,
    PossibleAnswersComponent,
    CountdownComponent,
  ],
})
export class CurrentQuestionComponent {
  @Output() onGivenAnswer: EventEmitter<string> = new EventEmitter<string>();
}
