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
    this.auth.login(username, password).subscribe(data => {
      console.log('login succes');
      this.messages.errorMessage = '';
      this.messages.succesMessage = '';
    }, err => {
      console.log('login error');
      this.messages.errorMessage = 'Username and password need to be filled in.';
      this.messages.succesMessage = '';
    });
  }

  signUpWithErrorHandling(username, password) {
    this.auth.signup(username, password).subscribe(data => {
      console.log('signup succes');
      this.messages.errorMessage = '';
      this.messages.succesMessage = 'A verification email will be sent.';
      }, err => {
      console.log('signup error');
      this.messages.errorMessage = 'An error has occurred whilst signing up.';
      this.messages.succesMessage = '';
      }
    );
  }
}


