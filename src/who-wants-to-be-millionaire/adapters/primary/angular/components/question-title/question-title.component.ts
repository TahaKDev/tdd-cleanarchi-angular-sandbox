import { Component, Input } from '@angular/core';

@Component({
  selector: 'question-title',
  templateUrl: './question-title.component.html',
})
export class QuestionTitleComponent {
  @Input() label: string | undefined = '';
}
