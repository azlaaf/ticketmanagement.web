import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';


export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()

  ]
};
