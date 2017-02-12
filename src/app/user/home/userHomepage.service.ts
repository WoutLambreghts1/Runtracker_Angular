import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User} from "./../../model/user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserHomepageService {
  private BASEURL = 'http://localhost:8080';

  constructor(private http: Http) {
  }

  storeUserTokens(url: string) {
    localStorage.setItem('access_token', url.split('=')[1].split('&')[0]);
    localStorage.setItem('id_token', url.split('=')[5]);
  }

  getUser(): Observable<User> {
    var jwt = localStorage.getItem('id_token');
    var authHeader = new Headers();
    if (jwt) {
      authHeader.append('token', jwt);
    }
    return this.http.get(this.BASEURL + '/api/users/getUser', {
      headers: authHeader
    })
      .map((res: Response) => res.json())
      .catch(this.handleUserError)
  }

  private handleUserError(error: Response | any): Observable<any> {
    if (error.status == 404) {
      return this.createUser();
    } else {
      return this.handleError(error);
    }
  }

  createUser(): Observable<User> {
    var jwt = localStorage.getItem('id_token');
    let headers = new Headers({'Content-Type': 'application/json'});
    if (jwt) {
      headers.append('token', jwt);
    }
    let options = new RequestOptions({headers: headers});

    let newUser = new User();

    return this.http.post(this.BASEURL + '/api/users/createUser', newUser, options)
      .map((res: Response) => res.json()).catch(err => this.handleError(err));
  }

  private handleError(error: Response | any): Observable<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
