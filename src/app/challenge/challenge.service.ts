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

  //Get goals (to create competition), available competitions (to compete), all competing competitions
  getGoals(): Observable<Goal[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/competitions/getAllGoals',{
      headers: this.authHeader
    })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  getAllAvailableCompetitions(): Observable<Competition[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/competitions/getAvailableCompetitions',{
        headers: this.authHeader
      })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  getAllCompetitionsRun(): Observable<Competition[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/competitions/getRanCompetitions',{
        headers: this.authHeader
      })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  getAllCompetitionsCreated(): Observable<Competition[]>{
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/competitions/getCreatedCompetitions',{
        headers: this.authHeader
      })
      .map((res: Response) =>  res.json())
      .catch(this.handleErrorObservable);
  }

  //Create new competition
  createCompetition(competition: Competition): void{
    this.authHeader.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: this.authHeader});
    console.log(JSON.stringify(competition));
    this.http.post(myGlobals.BACKEND_BASEURL + '/api/competitions/createCompetition',JSON.stringify(competition), options)
      .map((res: Response) => res.json())
      .catch(err => this.handleErrorObservable(err));


  }

  deleteCompetition(competitionId) : Observable<void>{
     return this.http.delete(myGlobals.BACKEND_BASEURL + '/api/competitions/delete/' + competitionId, {
      headers: this.authHeader
    }).map((res: Response) => res.json()).catch(err => this.handleErrorObservable(err));
  }

  addCompetitionToUser(competitionId): void {
    console.log(competitionId);
    this.http.post(myGlobals.BACKEND_BASEURL + '/api/competitions/running/' + competitionId, {
        headers: this.authHeader
      }).map((res: Response) => res.json()).catch(err => this.handleErrorObservable(err));
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
