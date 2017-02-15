import {Component} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {LoginMessage} from "./loginMessage";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  private messages: LoginMessage = {errorMessage: '', succesMessage: ''};

  constructor(private auth: AuthService) {
  }

  allFieldsFilledIn(username, password): boolean {
    if (username == '' && password == '') {
      this.messages.errorMessage = 'Username and password need to be filled in.';
      this.messages.succesMessage = '';
      return false;
    } else if (username == '') {
      this.messages.errorMessage = 'Username need to be filled in.';
      this.messages.succesMessage = '';
      return false;
    } else if (password == '') {
      this.messages.errorMessage = 'Password need to be filled in.';
      this.messages.succesMessage = '';
      return false;
    }
    return true;
  }

  loginWithErrorHandling(username, password) {
    if (this.allFieldsFilledIn(username, password)) {
      this.auth.login(username, password).subscribe(data => {
        console.log('login succes');
        this.messages.errorMessage = '';
        this.messages.succesMessage = '';
      }, err => {
        console.log('login error');
        this.messages.errorMessage = 'An error has occurred while logging in.';
        this.messages.succesMessage = '';
      });
    }
  }

  signUpWithErrorHandling(username, password) {
    if (this.allFieldsFilledIn(username, password)) {

      this.auth.signup(username, password).subscribe(data => {
          console.log('signup succes');
          this.messages.errorMessage = '';
          this.messages.succesMessage = 'A verification email will be sent.';
        }, err => {
          console.log('signup error');
          this.messages.errorMessage = 'The user already exists.';
          this.messages.succesMessage = '';
        }
      );
    }
  }
}


