import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../authentication/auth.service";

@Injectable()
export class UserHomepageService {
  private BASEURL = 'http://localhost:8080';
  private authHeader;

  constructor(private http: Http,private auth: AuthService) {
    this.authHeader = new Headers();
  }

  storeUserTokens(url: string) {
    localStorage.setItem('access_token', url.split('=')[1].split('&')[0]);
    localStorage.setItem('id_token', url.split('=')[5]);
  }

  getUser(): Observable<User> {
    let jwt = localStorage.getItem('id_token');
    if (jwt) {
      this.authHeader.append('token', jwt);
    }
    return this.http.get(this.BASEURL + '/api/users/getUser', {
      headers: this.authHeader
    })
      .map((res: Response) => res.json())
      .catch(err => this.handleUserError(err))
  }

  private handleUserError(error: Response | any): Observable<any> {
    if (error.status == 404) {
      return this.createUser();
    } else {
      return this.handleError(error);
    }
  }

  createUser(): Observable<User> {
    this.authHeader.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: this.authHeader});

    //Social login ==> extra info
    let firstname: string = "";
    let lastname: string = "";
    let gender: string = "UNDEFINED";
    if(this.auth.getUserInfo().sub.indexOf("facebook") >= 0 || this.auth.getUserInfo().sub.indexOf("google") >= 0){
        firstname = this.auth.getUserInfo().givenName;
        lastname = this.auth.getUserInfo().familyName;
        gender = this.auth.getUserInfo().gender.toUpperCase();
    }

    let newUser =
    {
      "userId":0,
      "username": this.auth.getUserInfo().nickname,
      "firstname": firstname,
      "lastname": lastname,
      "gender": gender,
      "city": "",
      "birthday": null,
      "friends": [],
      "competitionsCreated": [],
      "trackings": [],
      "competitionsWon": [],
      "competitionsRun": [],
      "maxSpeed": 0,
      "avgSpeed": 0,
      "maxDistance": 0,
      "avgDistance": 0,
      "totalDistance": 0,
      "ranTenKm": false,
      "ranTwentyKm": false,
      "ranMarathon": false,
      "nrOfCompetitionsWon": 0
    };
    console.log(this.auth.getUserInfo());
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
