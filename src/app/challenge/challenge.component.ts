import {Component,OnInit} from "@angular/core";
import {ChallengeService} from "./challenge.service";
import {AuthService} from "./../authentication/auth.service";
import {Competition} from "../model/competition";
import {Goal} from "../model/goal";
import {User} from "../model/user";

@Component({
  selector: 'challenge',
  templateUrl: 'challenge.component.html',
  styleUrls: ['challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent implements OnInit{
  private competitionsLive:Competition[] = [];
  private competitionSelected:Competition = new Competition();

  constructor(private challengeService:ChallengeService, private auth:AuthService) {
    let u1:User = new User("","","","");
    let u2:User = new User("","","","");
    this.competitionSelected.usersRun = [u1,u2];
  }

  onClickSetCompetition(c:Competition){
    this.competitionSelected=c;
  }

  ngOnInit():void {
    this.challengeService.getLiveCompetitions().subscribe(
      (competitions) => {
        this.competitionsLive = competitions;
      },
      error => {
        console.log(error as string);
      }
    );
  }



}
