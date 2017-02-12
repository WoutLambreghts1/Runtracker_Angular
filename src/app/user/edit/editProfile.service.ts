import {Http,Headers,Response} from '@angular/http';
import {User} from "./../../model/user";
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';

@Injectable()
export class EditProfileService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();

  constructor(private http:Http){
    if(this.jwt) {
      this.authHeader.append('token', this.jwt);
    }
  }

  getUser(): Observable<User>{
    return this.http.get('http://localhost:8080/api/users/getUser', {
        headers: this.authHeader
      })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  updateUser(user : User): Observable<User>{
    return this.http.put('http://localhost:8080/api/users/updateUser',user, {
        headers: this.authHeader
      })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  checkUsernameAvailable(username): boolean{
    return true;
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
