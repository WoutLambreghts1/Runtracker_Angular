import {Injectable}      from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {Http} from "@angular/http";

// Avoid name not found warnings
declare let auth0: any;
declare var Auth0Lock: any;


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

  // Configure Auth0
  lock = new Auth0Lock('FIml7bePvyWfc2y9UzaRUPjYDenDQSNE', 'runtrackminds.eu.auth0.com', {});

  //Store profile object in auth class
  userProfile: Object;

  constructor(private router: Router, private http: Http) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        console.log(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
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
        console.log(authResult);
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
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['']);
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}
