import {Component} from "@angular/core";
import {ChallengeService} from "./challenge.service";
import {AuthService} from "./../authentication/auth.service";
import {Competition} from "../model/competition";

@Component({
  selector: 'challenge',
  templateUrl: 'challenge.component.html',
  styleUrls: ['challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent{
  private newCompetition: Competition;
  constructor(private challengeService: ChallengeService,private auth:AuthService){

  }

  ngOnInit(): void {
    this.newCompetition = new Competition();
    this.newCompetition.maxParticipants = 2;
    this.newCompetition.deadline = new Date();
  }

  private onClickAddCompetition(competition: Competition): void {
    alert(competition.deadline);
  }

}
