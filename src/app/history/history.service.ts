import {Injectable} from "@angular/core";
import {Tracking} from "../model/tracking";
import {Observable} from "rxjs";
import {Http, Headers, Response} from "@angular/http";
import * as myGlobals from "./../globals";

@Injectable()
export class HistoryService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();
  private authHeaderTwo = new Headers();

  constructor(private http: Http) {
    if (this.jwt) {
      this.authHeader.append('token', this.jwt);
      this.authHeaderTwo.append('token', this.jwt);
      this.authHeaderTwo.append('Content-Type', 'application/json');
    }
  }

  getAllTrackings(): Observable<Tracking[]> {
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/trackings', {
      headers: this.authHeader
    })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
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
