import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { AuthInterceptor } from 'src/app/auth.interceptor';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './photo.component';
import { PhotoService } from './photo.service';

@NgModule({
  imports: [CommonModule, ClarityModule, HttpClientModule, PhotoRoutingModule],
  declarations: [PhotoComponent],
  providers: [
    PhotoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class PhotoModule {}
