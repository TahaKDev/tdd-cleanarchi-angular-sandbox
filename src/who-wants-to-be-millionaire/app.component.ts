import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './adapters/primary/angular/components/game/game.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tdd-cleanarchi-angular-15-mai-2025';
}
