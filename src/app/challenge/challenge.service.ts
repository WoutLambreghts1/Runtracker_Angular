import {Http,Headers,Response} from '@angular/http';
import {User} from "./../../model/user";
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import * as myGlobals from "../../globals";

@Injectable()
export class ChallengeService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();

  constructor(private http:Http){
    if(this.jwt) {
      this.authHeader.append('token', this.jwt);
    }
  }

}
