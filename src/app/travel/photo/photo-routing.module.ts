import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { PhotoComponent } from './photo.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoComponent,
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
export class PhotoRoutingModule {}
