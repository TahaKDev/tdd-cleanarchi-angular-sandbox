import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionTitleComponent } from '../question-title/question-title.component';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { PossibleAnswersComponent } from '../possible-answers/possible-answers.component';
import { CountdownComponent } from '../countdown/countdown.component';
import { Question } from '../../../../../core-logic/models/question';

@Component({
  selector: 'current-question',
  templateUrl: './current-question.component.html',
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
