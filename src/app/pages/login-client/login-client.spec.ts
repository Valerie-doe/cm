import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClient } from './login-client';

describe('LoginClient', () => {
  let component: LoginClient;
  let fixture: ComponentFixture<LoginClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
