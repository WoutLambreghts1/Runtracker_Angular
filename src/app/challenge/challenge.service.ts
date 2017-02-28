import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import * as myGlobals from "./../globals";
import {Goal} from "../model/goal";
import {Competition} from "../model/competition";
import {User} from "../model/user";

@Injectable()
export class ChallengeService {
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();

  constructor(private http: Http) {
    if (this.jwt) {
      this.authHeader.append('token', this.jwt);
    }
  }

  //TODO:Get topic from MQTT
  getLiveCompetitions():Observable<Competition[]>{
    //Testdata
    let competitionsLive:Competition[] = [];
    let c:Competition=new Competition();
    let u1:User = new User("woutl","Wout","Lambreghts","MALE");
    let u2:User = new User("alexvr","Alexander","van Ravestyn","MALE");
    let g:Goal = new Goal(1,"1000 meters",1000);
    c.usersRun = [];
    c.usersRun[0]=u1;
    c.usersRun[1]=u2;
    c.goal=g;
    c.name="Let's run 5000 meters!";
    competitionsLive[0]=c;
    c=new Competition();
    u1 = new User("jellem","Jelle","Mannaerts","MALE");
    u2 = new User("alexvr","Alexander","van Ravestyn","MALE");
    g = new Goal(2,"5000 meters",5000);
    c.usersRun = [];
    c.usersRun[0]=u1;
    c.usersRun[1]=u2;
    c.goal=g;
    c.name="Let's run 5000 meters!";
    competitionsLive[1]=c;
    c =new Competition();
    u1 = new User("Jenss","Jens","Schadron","MALE");
    u2 = new User("Stijne","Stijn","Ergeerts","MALE");
    g = new Goal(3,"2000 meters",2000);
    c.usersRun = [];
    c.usersRun[0]=u1;
    c.usersRun[1]=u2;
    c.goal=g;
    c.name="Let's run 2000 meters!";
    competitionsLive[2]=c;
    return Observable.of(competitionsLive);
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
