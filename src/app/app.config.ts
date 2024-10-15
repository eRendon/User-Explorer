import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'
import { BrowserAnimationsModule, NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule])
  ]
};
