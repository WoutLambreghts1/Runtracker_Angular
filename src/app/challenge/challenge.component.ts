import {Component,OnInit} from "@angular/core";
import {ChallengeService} from "./challenge.service";
import {AuthService} from "./../authentication/auth.service";
import {Competition} from "../model/competition";
import {Goal} from "../model/goal";
import {User} from "../model/user";
import {position} from "../model/position";

@Component({
  selector: 'challenge',
  templateUrl: 'challenge.component.html',
  styleUrls: ['challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent implements OnInit{
  private competitionsLive:Competition[] = [];
  private competitionSelected:Competition = new Competition();

  private startPosOne:position;
  private startPosTwo:position;

  constructor(private challengeService:ChallengeService, private auth:AuthService) {
    let u1:User = new User("","","","");
    let u2:User = new User("","","","");
    this.competitionSelected.usersRun = [u1,u2];


    //Set start positions for both players
    this.startPosOne = new position(50.52,4.22);
    this.startPosTwo = new position(51.2192,4.4029);
  }

  onClickSetCompetition(c:Competition){
    this.competitionSelected=c;
  }

  ngOnInit():void {
    this.challengeService.getLiveCompetitions().subscribe(
      (competitions) => {
        competitions.forEach(c => c.time = new Date(c.time));
        this.competitionsLive = competitions ;
      },
      error => {
        console.log(error as string);
      }
    );
  }



}
