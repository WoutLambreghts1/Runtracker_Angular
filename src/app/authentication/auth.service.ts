import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

/* DEFAULT LOGIN
// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('FIml7bePvyWfc2y9UzaRUPjYDenDQSNE', 'runtrackminds.eu.auth0.com', {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }
}
*/

import { Router } from '@angular/router';

// Avoid name not found warnings
declare let auth0: any;

@Injectable()
export class Auth {

  // Configure Auth0
  auth0 = new auth0.WebAuth({
    domain: 'runtrackminds.eu.auth0.com',
    clientID: 'FIml7bePvyWfc2y9UzaRUPjYDenDQSNE',
    // specify your desired callback URL
    callbackURL: 'http://localhost:4200',
    responseType: 'token id_token'
  });

  constructor(private router: Router) {
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.router.navigate(['/succesLogin']);
      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error);
      }
    });
  }

  public login(username: string, password: string): void {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      if (err) {
        alert('Error: ' + err.description);
        return;
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setUser(authResult);
        this.router.navigate(['/succesLogin']);
      }
    });
  }

  public signup(email, password): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function(err) {
      if (err) {
        alert('Error: ' + err.description);
      }
    });
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2',
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
}
