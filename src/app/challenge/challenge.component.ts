import {Component} from "@angular/core";
import {ChallengeService} from "./challenge.service";
import {AuthService} from "./../authentication/auth.service";
import {Competition} from "../model/competition";
import {Goal} from "../model/goal";

@Component({
  selector: 'challenge',
  templateUrl: 'challenge.component.html',
  styleUrls: ['challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent{
  private newCompetition: Competition;
  private goals: Goal[];
  private competitions: Competition[];
  constructor(private challengeService: ChallengeService,private auth:AuthService){
  }

  ngOnInit(): void {
    this.newCompetition = new Competition();
    this.newCompetition.maxParticipants = 2;
    this.newCompetition.deadline = new Date();
    this.newCompetition.competitionType="NOT_REALTIME";

    this.challengeService.getGoals().subscribe(
      (goals: Goal[]) => {
        this.goals = goals;
      },
      error => {
        console.log(error as string);
      }
    );

    this.challengeService.getCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions;
        console.log(competitions);
      },
      error => {
        console.log(error as string);
      }
    );
  }

  private onClickAddCompetition(competition: Competition): void {
    alert("add comp");
    this.challengeService.createCompetition(competition);
  }

}
