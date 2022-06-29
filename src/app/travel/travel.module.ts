import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { AuthInterceptor } from '../auth.interceptor';
import { CreateEditComponent } from './createOrEdit/create-edit.component';
import { MyTravelComponent } from './mytravel/mytravel.component';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelService } from './travel.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    HttpClientModule,
    ReactiveFormsModule,
    TravelRoutingModule,
  ],
  declarations: [CreateEditComponent, MyTravelComponent],
  providers: [
    TravelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class TravelModule {}
