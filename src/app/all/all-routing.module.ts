import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AllComponent } from './all.component';

const routes: Routes = [
  {
    path: '',
    component: AllComponent,
    data: {
      roles: ['adminF'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AllRoutingModule {}
