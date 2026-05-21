import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'), //necesita un defaul en el componente para que no genere error, de lo contrario necesitaria .then etc..
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page'), //con loadComponent (carga perezosa), necesita un defaul en el componente para que no genere error, de lo contrario necesitaria .then etc..
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page'),
      },
        {
        path: '**',
        redirectTo:'trending'
      }
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
