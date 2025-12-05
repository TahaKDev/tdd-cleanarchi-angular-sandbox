import { Component, Signal, signal } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { PyramidService } from '../../../../../core-logic/models/pyramidService';

@Component({
  selector: 'pyramid',
  templateUrl: './pyramid.component.html',
  imports: [NgForOf, NgClass],
})
export class PyramidComponent {
  pyramidIndexSignal: Signal<number | undefined> = signal<number | undefined>(
    undefined,
  );

  constructor(private readonly pyramidService: PyramidService) {
    this.pyramidIndexSignal = this.pyramidService.pyramidIndexSignal;
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
