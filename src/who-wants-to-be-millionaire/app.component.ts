import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentQuestionComponent } from './adapters/primary/angular/current-question.component';
import { JokersComponent } from './adapters/primary/angular/jokers.component';
import { PyramidComponent } from './adapters/primary/angular/pyramid.component';
import { GameComponent } from './adapters/primary/angular/game.component';
import { Pyramid } from './core-logic/usecases/answer-submission/pyramidFactory';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tdd-cleanarchi-angular-15-mai-2025';
}
