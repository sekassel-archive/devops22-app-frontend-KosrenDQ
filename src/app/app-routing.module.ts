import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: {
      public: true,
    },
  },
  {
    path: 'all',
    loadChildren: () => import('./all/all.module').then((m) => m.AllModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['admin'],
    },
  },
  {
    path: 'mytravel',
    loadChildren: () =>
      import('./travel/travel.module').then((m) => m.TravelModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user'],
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
