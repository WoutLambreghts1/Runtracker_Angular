import {LoginComponent} from "./login.component";
import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {AuthService} from "../../authentication/auth.service";
import {By} from "@angular/platform-browser";
describe('LoginComponent', () => {

  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub = {};
  let authService;
  let loginBtn, signupBtn, googleBtn;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        declarations: [LoginComponent],
        providers: [{provide: AuthService, useValue: authServiceStub}]
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    authService = TestBed.get(AuthService);

    loginBtn = fixture.debugElement.query(By.css('#login'));
    signupBtn = fixture.debugElement.query(By.css('#signup'));
    googleBtn = fixture.debugElement.query(By.css('#googleLogin'));
  });

  it('login should contain a login button', () => {
    expect(loginBtn.nativeElement.textContent).toContain('Log In')
  });

  it('login should contain a signin button', () => {
    expect(signupBtn.nativeElement.textContent).toContain('Sign Up')
  });

  it('login should contain a login with google button', () => {
    expect(googleBtn.nativeElement.textContent).toContain('Log In with Google')
  });
});


