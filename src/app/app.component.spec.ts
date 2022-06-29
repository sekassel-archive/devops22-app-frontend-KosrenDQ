import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, KeycloakAngularModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: Window,
          useValue: window,
        },
      ],
    }).compileComponents();
  });

  it('should load the component', () => {
    const component =
      TestBed.createComponent(AppComponent).debugElement.componentInstance;
    expect(component).toBeDefined();
  });
});
