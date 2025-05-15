import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { CountdownService } from '../../../core-logic/countdown.service';

@Component({
  selector: 'game-countdown',
  template: `
    <div [@countdownAnimation]="seconds">
      <span> {{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }} </span>
    </div>
  `,
  styles: [
    `
      div {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        display: inline-block;
      }
    `,
  ],
  animations: [
    trigger('countdownAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(1)' })),
      transition(':enter', [
        animate(
          '300ms ease-in',
          style({ opacity: 1, transform: 'scale(1.2)' }),
        ),
      ]),
    ]),
  ],
})
export class CountdownComponent implements OnInit {
  countdown$!: Observable<number>; // Declare, but don't initialize here
  minutes: number = 0;
  seconds: number = 0;

  constructor(private countdownService: CountdownService) {} // Just inject the service

  ngOnInit() {
    this.countdown$ = this.countdownService.getSecondsLeft(); // Initialize in ngOnInit()
    this.countdownService.startCountdown(15); // Start the countdown

    this.countdown$.subscribe((secondsLeft) => {
      this.minutes = Math.floor(secondsLeft / 60);
      this.seconds = secondsLeft % 60;
    });
  }
}
