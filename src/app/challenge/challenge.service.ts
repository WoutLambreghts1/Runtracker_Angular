import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import * as myGlobals from "./../globals";
import {Goal} from "../model/goal";
import {Competition} from "../model/competition";

@Injectable()
export class ChallengeService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();

  constructor(private http:Http){
    if(this.jwt) {
      this.authHeader.append('token', this.jwt);
    }
  }

  getGoals(): Observable<Goal[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/goals')
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  getCompetitions(): Observable<Competition[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/competitions',{
        headers: this.authHeader
      })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  createCompetition(competition: Competition): Observable<any>{
    this.authHeader.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: this.authHeader});

    console.log(options);

    let newCompetition = {
      "competitionType":"NOT_REALTIME",
      "deadline":"2017-02-20",
      "maxParticipants":4,
      "goal":null,
      "userCreated":null,
      "userWon":null,
      "trackings":[],
      "usersRun":[]
    }

    return this.http.post(myGlobals.BACKEND_BASEURL + '/api/competitions/createCompetition', newCompetition, options)
      .map((res: Response) => res.json()).catch(err => this.handleErrorObservable(err));
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
