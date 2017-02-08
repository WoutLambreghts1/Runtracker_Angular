import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import {LoginMessage} from "./loginMessage";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  private loginMessage: LoginMessage = {errorMessage: '', succesMessage: ''};

  constructor(private auth: AuthService) {}

  loginWithErrorHandling(username, password){
    if(this.auth.login(username, password)){
      this.loginMessage.errorMessage = '';
      console.log('login');
    }else {
      this.loginMessage.errorMessage = 'Username and password need to be filled in.';
      console.log('loginFail');
    }
  }

  signUpWithErrorHandling(username, password){
    if(this.auth.signup(username, password)){
      this.loginMessage.succesMessage = 'You will receive a verification mail';
      console.log('signup');
    }else{
      this.loginMessage.errorMessage = 'An error has occurred';
      console.log('signupFail');
    }
  }
}


