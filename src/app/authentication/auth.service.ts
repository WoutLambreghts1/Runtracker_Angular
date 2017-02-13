import {Injectable}      from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Profileinfo} from "../model/profileinfo";

// Avoid name not found warnings
declare let auth0: any;

@Injectable()
export class AuthService {

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    domain: 'runtrackminds.eu.auth0.com',
    clientID: 'FIml7bePvyWfc2y9UzaRUPjYDenDQSNE',
    // specify your desired callback URL
    callbackURL: 'http://localhost:4200',
    responseType: 'token id_token'
  });

  userProfile: Profileinfo;

  constructor(private router: Router, private http: Http) {

  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.router.navigate(['/home']);
      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error);
      }
    });

  }

  public login(username: string, password: string): Observable<any> {
    return new Observable(obs => this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      if (err) {
        return obs.error();
      }
      else if (authResult && authResult.idToken && authResult.accessToken) {
        this.setUser(authResult);
        this.router.navigate(['/home']);
        return obs.complete();
      }
    }));
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2',
      redirectUri: 'http://localhost:4200/home'
    });
  }

  public loginWithFacebook(): void {
    this.auth0.authorize({
      connection: 'facebook',
      redirectUri: 'http://localhost:4200/home'
    });
  }

  public signup(email: string, password: string): Observable<any> {
    return new Observable(obs => this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, (err) => {
      if (err) {
        return obs.error();
      }
      return obs.complete();
    }));
  }

  public forgotPassword(email): void {
    this.auth0.changePassword({
      client_id: 'FIml7bePvyWfc2y9UzaRUPjYDenDQSNE',
      email: email,
      connection: 'Username-Password-Authentication',
    }, function (err) {
      if (err) {
        console.log('forgotPassword error');
      }
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    return tokenNotExpired();
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.router.navigate(['']);
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);


  }

  public getUserInfo(): Profileinfo{
    console.log(localStorage.getItem('access_token'));
    if(localStorage.getItem('access_token').length > 0){
      // Fetch profile information
      this.auth0.client.userInfo(localStorage.getItem('access_token'), (error, profile) => {
        if (error) {
          // Handle error
          console.log(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;

      });
      return this.userProfile;
    }
    return new Profileinfo();

  }

}
