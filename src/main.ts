import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './who-wants-to-be-millionaire/app.config';
import { AppComponent } from './who-wants-to-be-millionaire/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
