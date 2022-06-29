import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, switchMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenObs = from(this.keycloakService.getToken());

    return tokenObs.pipe(
      switchMap((value, index) => {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${value}`),
        });
        return next.handle(authReq);
      })
    );
  }
}
