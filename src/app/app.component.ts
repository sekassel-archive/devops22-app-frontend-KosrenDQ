import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public authenticated = false;

  private authSubscription: Subscription = new Subscription();
  private roles: string[] = [];

  constructor(private keycloakService: KeycloakService, private window: Window) {}

  ngOnInit(): void {
    this.authSubscription = this.keycloakService.keycloakEvents$.subscribe((event) => {
      if (event.type === KeycloakEventType.OnAuthSuccess) {
        this.authenticated = true;
        this.roles = this.keycloakService.getUserRoles(true);   
      } else if (event.type === KeycloakEventType.OnAuthLogout) {
        this.authenticated = false;
      }
    });

    this.keycloakService.isLoggedIn().then((auth) => {
      this.authenticated = auth;
      this.roles = this.keycloakService.getUserRoles(true);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public login() {
    this.keycloakService.login();
  }

  public logout() {
    this.keycloakService.logout(this.window.location.origin);
  }

  public hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
