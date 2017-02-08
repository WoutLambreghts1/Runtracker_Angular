import {Component} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {LoginMessage} from "./loginMessage";
import {Observable} from "rxjs";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  private messages: LoginMessage = {errorMessage: '', succesMessage: ''};

  constructor(private auth: AuthService) {
  }

  loginWithErrorHandling(username, password) {
    this.auth.login(username, password);
  }

  signUpWithErrorHandling(username, password) {
    this.auth.signup(username, password);

  }
}


