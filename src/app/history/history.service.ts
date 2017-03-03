import {Injectable} from "@angular/core";
import {Tracking} from "../model/tracking";
import {Observable} from "rxjs";
import {Http, Headers, Response} from "@angular/http";
import * as myGlobals from "./../globals";
import {Competition} from "../model/competition";
import {HistoryWrapper} from "../model/history-wrapper";

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
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/trackings/getTrackings', {
      headers: this.authHeader
    })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getAllCompetitions(): Observable<Competition[]> {
    return this.http.get(myGlobals.BACKEND_BASEURL + '/api/competitions/getRanCompetitions', {
      headers: this.authHeader
    })
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  getAllHistoryEvents(): Observable<any> {
    //let obs1 = this.getAllTrackings();
    //let obs2 = this.getAllCompetitions();

    //return Observable.forkJoin(obs1, obs2);


    return new Observable(obs => {
        let historyWrapperElements: HistoryWrapper[] = [];

        // get all trackings and put them in a wrapper
        this.getAllTrackings()
          .subscribe(data => {
              if (data != null) {
                data.forEach(x => {
                  let temp = new HistoryWrapper();
                  temp.type = 'tracking';
                  temp.makeTrackingHistory(x);
                  historyWrapperElements.push(temp);
                })
              }
              // get all competitions and put them in a wrapper
              this.getAllCompetitions()
                .subscribe(data => {
                    if (data != null) {
                      data.forEach(x => {
                        x.time = new Date(x.time);
                        let temp = new HistoryWrapper();
                        temp.type = 'competition';
                        temp.makeCompetitionHistory(x);
                        historyWrapperElements.push(temp);
                      });
                    }
                    // sort the wrapperelements on date
                    historyWrapperElements.sort((a, b) => {
                      if (a.type == 'competition' && b.type == 'competition') {
                        return a.competition.time.getDate() - b.competition.time.getDate();
                      } else if (a.type == 'competition' && b.type == 'tracking') {
                        return a.competition.time.getDate() - b.tracking.time.getDate();
                      } else if (a.type == 'tracking' && b.type == 'competition') {
                        return a.tracking.time.getDate() - b.competition.time.getDate();
                      } else {
                        return a.tracking.time.getDate() - b.tracking.time.getDate();
                      }
                    });

                    obs.next(historyWrapperElements);
                    obs.complete();
                  }
                  , err => {
                    obs.error();
                  });
            }
            , err => {
              obs.error();
            });
      }
    )
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
