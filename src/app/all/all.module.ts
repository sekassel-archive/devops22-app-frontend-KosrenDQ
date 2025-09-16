import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { AuthInterceptor } from '../auth.interceptor';
import { TravelService } from '../travel/travel.service';
import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';

@NgModule({
  imports: [AllRoutingModule, ClarityModule, CommonModule, HttpClientModule],
  declarations: [AllComponent],
  providers: [
    TravelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AllModule {}
