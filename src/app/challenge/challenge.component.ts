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
  private goals: Goal[] = [new Goal(1,"run 100m",100),new Goal(2,"run 200m",200),new Goal(3,"run 300m",300)];
  private competitionsAvailable: Competition[] = [];
  private competitionsRun: Competition[] = [];
  private competitionToCompete:Competition;
  constructor(private challengeService: ChallengeService,private auth:AuthService){
    this.onClickNewCompetition();
    this.competitionToCompete = new Competition();
  }


  ngOnInit(): void {
    //Get goals (to create competition), available competitions (to compete), all competing competitionss

    /*
    this.challengeService.getGoals().subscribe(
      (goals) => {
        this.goals = goals;
      },
      error => {
        console.log(error as string);
      }
    );
*/

     this.challengeService.getAllAvailableCompetitions().subscribe(
     (competitions: Competition[]) => {
     this.competitionsAvailable = competitions;
     console.log(competitions);
     },
     error => {
     console.log(error as string);
     }
     );

    this.challengeService.getAllCompetitionsRun().subscribe(
      (competitions) => {
        this.competitionsRun = competitions;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  //Create new competition
  private onClickNewCompetition(): void{
    this.newCompetition = new Competition();
    this.newCompetition.maxParticipants = 2;
    this.newCompetition.deadline = new Date();
    this.newCompetition.competitionType="NOT_REALTIME";
    console.log(this.goals);
  }


  private onClickAddCompetition(competition: Competition): void {
    this.challengeService.createCompetition(competition);
    console.log(competition.goal);
    console.log(this.competitionsRun);
  }



}
