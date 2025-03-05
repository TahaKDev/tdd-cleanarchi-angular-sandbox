import { Component } from '@angular/core';

@Component({
  selector: 'possible-answers',
  template: `
    <div class="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      <div class="border-0 rounded-lg px-3 py-1 bg-gray-900">
        <span class="text-orange-500">A:</span> Third-Driven Development
      </div>
      <div class="border-0 rounded-lg px-3 py-1 bg-gray-900">
        <span class="text-orange-500">B:</span> Test-Driven Development
      </div>
      <div class="border-0 rounded-lg px-3 py-1 bg-gray-900">
        <span class="text-orange-500">C:</span> Test-Deep Development
      </div>
      <div class="border-0 rounded-lg px-3 py-1 bg-gray-900">
        <span class="text-orange-500">D:</span> Test-Driven Design
      </div>
    </div>
  `,
  styleUrls: ['./possible-answers.component.scss']
})
export class PossibleAnswersComponent {}
