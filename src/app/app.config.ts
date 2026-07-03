import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()), //intancia del Http se agrega en withFetch() para trabajar con el nuevo estandar, si se deja vacio trabaja en el fondo con las peticiones xhr o peticiones tradicionales.
  ]
};
