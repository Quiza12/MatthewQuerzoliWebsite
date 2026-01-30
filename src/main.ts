import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),

    importProvidersFrom(
      NgbModule,
      ClipboardModule
    ),

    provideRouter(
      routes,
      withHashLocation(), // replaces useHash: true
      withInMemoryScrolling({ anchorScrolling: 'enabled' }),
      withEnabledBlockingInitialNavigation()
    )
  ]
});
