import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CreateEditComponent } from './createOrEdit/create-edit.component';
import { MyTravelComponent } from './mytravel/mytravel.component';

const routes: Routes = [
  {
    path: '',
    component: MyTravelComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['user'],
    },
  },
  {
    path: ':id',
    component: CreateEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['user'],
    },
  },
  {
    path: ':id/photos',
    loadChildren: () =>
      import('./photo/photo.module').then((m) => m.PhotoModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class TravelRoutingModule {}
