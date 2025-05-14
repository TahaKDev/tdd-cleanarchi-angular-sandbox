import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentQuestionComponent } from './adapters/primary/current-question.component';
import { JokersComponent } from './adapters/primary/jokers.component';
import { PyramidComponent } from './adapters/primary/pyramid.component';
import { GameComponent } from './adapters/primary/game.component';
import { Pyramid } from './core-logic/usecases/answer-submission/pyramidFactory';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @Input() pyramid: Pyramid | undefined = undefined;

  title = 'tdd-cleanarchi-angular-15-mai-2025';
}
