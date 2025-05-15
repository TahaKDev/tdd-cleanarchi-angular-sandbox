import { Component, Input, Signal, signal } from '@angular/core';
import { Pyramid } from '../../../core-logic/usecases/answer-submission/pyramidFactory';
import { NgClass, NgForOf } from '@angular/common';
import { SubmitAnswer } from '../../../core-logic/usecases/answer-submission/submitAnswer';

@Component({
  selector: 'pyramid',
  template: `
    <div class="mt-3 justify-center rounded-lg text-yellow-500">
      <div class="flex flex-col justify-center">
        <ul class="flex flex-col mx-auto pyramid-values">
          <li
            *ngFor="let value of pyramidValues; let last = last; let i = index"
            class="mb-2"
            [ngClass]="{ 'text-white font-bold': last }"
          >
            <div
              [ngClass]="[
                'mb-2',
                pyramidIndexSignal() === pyramidValues.length - 1 - i
                  ? 'p-2 rounded-full bg-orange-500'
                  : '',
              ]"
            >
              {{ value.amount }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  imports: [NgForOf, NgClass],
})
export class PyramidComponent {
  pyramidIndexSignal: Signal<number | undefined> = signal<number | undefined>(
    undefined,
  );

  constructor(private readonly submitAnswer: SubmitAnswer) {
    this.pyramidIndexSignal = this.submitAnswer.pyramidIndexSignal;
  }

  pyramidValues: { amount: string }[] = [
    { amount: '1 MILLION €' },
    { amount: '300.000 € - Palier' },
    { amount: '150.000 €' },
    { amount: '72.000 €' },
    { amount: '48.000 € - Palier' },
    { amount: '24.000 €' },
    { amount: '12.000 €' },
    { amount: '6.000 €' },
    { amount: '3.000 € - Palier' },
    { amount: '1.500 €' },
    { amount: '800 €' },
    { amount: '200 €' },
    { amount: '0 € - Palier' },
  ];
}
