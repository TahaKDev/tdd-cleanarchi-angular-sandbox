import {Component, Input} from '@angular/core';

@Component({
  selector: 'question-title',
  template: `
    <div class="bg-gray-900 my-6 rounded-lg text-white p-2 text-center">
      {{ title }}
    </div>
  `,
  styleUrls: ['./question-title.component.scss']
})
export class QuestionTitleComponent {
  @Input() title = '';
}
