import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private secondsLeft$ = new BehaviorSubject<number>(15);

  constructor() {}

  startCountdown(initialSeconds: number) {
    this.secondsLeft$.next(initialSeconds);
    interval(1000)
      .pipe(takeWhile(() => this.secondsLeft$.value > 0))
      .subscribe(() => {
        const currentValue = this.secondsLeft$.value;
        this.secondsLeft$.next(currentValue - 1);
      });
  }

  getSecondsLeft() {
    return this.secondsLeft$.asObservable();
  }
}
