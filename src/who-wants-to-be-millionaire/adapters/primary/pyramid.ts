import { Component } from '@angular/core';

@Component({
  selector: 'pyramid',
  template: `
    <div class="mt-3 justify-center rounded-lg text-yellow-500">
      <div class="flex flex-col justify-center">
        <ul class="flex flex-col mx-auto">
          <li class="mb-2">1 MILLION €</li>
          <li class="mb-2">300.000 € - Palier</li>
          <li class="mb-2">150.000 €</li>
          <li class="mb-2">72.000 €</li>
          <li class="mb-2">48.000 € - Palier</li>
          <li class="mb-2">24.000 €</li>
          <li class="mb-2">12.000 €</li>
          <li class="mb-2">6.000 €</li>
          <li class="mb-2">3.000 € - Palier </li>
          <li class="mb-2">1.500 €</li>
          <li class="mb-2">800 €</li>
          <li class="mb-2">200 €</li>
          <li class="text-white font-bold">
            <div class="mb-2 p-2 rounded-full bg-orange-500">0 € - Palier</div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./pyramid.component.scss']
})
export class PyramidComponent {}
