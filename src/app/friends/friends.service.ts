import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import * as myGlobals from "./../globals";
import {User} from "../model/user";

@Injectable()
export class FriendsService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();
  private authHeaderTwo = new Headers();

  constructor(private http:Http){
    if(this.jwt) {
      this.authHeader.append('token', this.jwt);
      this.authHeaderTwo.append('token', this.jwt);
      this.authHeaderTwo.append('Content-Type', 'application/json');
    }
  }

  getUsers(): Observable<User[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getUsers',{
        headers: this.authHeader
      })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  getFriends(): Observable<User[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getAllFriends',{
        headers: this.authHeader
      })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  getUser(): Observable<User>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/users/getUser', {
        headers: this.authHeader
      })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  addFriend(username): Observable<any> {
    let options = new RequestOptions({headers: this.authHeaderTwo});
    console.log(this.authHeader);
    return this.http.put(myGlobals.BACKEND_BASEURL + '/api/users/addFriend/' + username, "",options)
      .map((res: Response) => {
          res.json();
        console.log(res);
        }
      )
      .catch(err => this.handleErrorObservable(err));
  }

  deleteFriend(username): Observable<any> {
    return this.http.delete(myGlobals.BACKEND_BASEURL + '/api/users/removeFriend/' + username, {
        headers: this.authHeader
      })
      .map((res: Response) => {
          res.json();
        }
      )
      .catch(err => this.handleErrorObservable(err));
  }

  private handleErrorObservable(error: Response | any): Observable<any> {
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
