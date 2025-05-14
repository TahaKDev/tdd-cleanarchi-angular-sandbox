import {
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideRedux } from '@reduxjs/angular-redux';
import { store } from './store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { pyramidFactory } from './core-logic/usecases/answer-submission/pyramidFactory';

export const providePyramid: Provider = {
  provide: 'PYRAMID',
  useFactory: () => {
    return pyramidFactory();
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRedux({ store }),
    provideAnimationsAsync(),
    providePyramid,
  ],
};
