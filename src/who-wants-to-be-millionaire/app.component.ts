import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentQuestionComponent } from './adapters/primary/current-question.component';
import { JokersComponent } from './adapters/primary/jokers.component';
import { PyramidComponent } from './adapters/primary/pyramid';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CurrentQuestionComponent,
    JokersComponent,
    PyramidComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tdd-cleanarchi-angular-15-mai-2025';
}
