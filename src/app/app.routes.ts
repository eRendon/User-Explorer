import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component'

export const routes: Routes = [
  {
    path: '', title: 'home', component: DefaultLayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
];
