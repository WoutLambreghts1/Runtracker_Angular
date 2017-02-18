import {Component} from "@angular/core";
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

export class ChallengeComponent{
  private newCompetition: Competition;
  private goals: Goal[] = []// [new Goal(1,"run 100m",100),new Goal(2,"run 200m",200),new Goal(3,"run 300m",300)];
  private competitionsAvailable: Competition[] = [];
  private competitionsRun: Competition[] = [];
  private competitionsCreated: Competition[] = [];
  private competitionIdToCompete = 0;
  private username:string;
  constructor(private challengeService: ChallengeService,private auth:AuthService){
    this.onClickNewCompetition();
  }


  ngOnInit(): void {
    //Get goals (to create competition), available competitions (to compete), all competing competitions & all created competitions
    /*
    this.challengeService.getGoals().subscribe(
      (goals) => {
        this.goals = goals;
        console.log(goals);
      },
      error => {
        console.log(error as string);
      }
    );
  */

     this.challengeService.getAllAvailableCompetitions().subscribe(
     (competitions: Competition[]) => {
     this.competitionsAvailable = competitions;
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

    this.challengeService.getAllCompetitionsCreated().subscribe(
      (competitions) => {
        this.competitionsCreated = competitions;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  //Create new competition object
  private onClickNewCompetition(): void{
    this.newCompetition = new Competition();
    this.newCompetition.maxParticipants = 2;
    this.newCompetition.deadline = new Date();
    this.newCompetition.competitionType="NOT_REALTIME";
  }

  //Add competition to user
  private onClickAddCompetition(competitionId): void{
    this.challengeService.addCompetitionToUser(competitionId);
  }

  //Create competition
  private onClickCreateCompetition(competition: Competition): void {
    this.challengeService.createCompetition(competition);
  }

  //Delete competition
  private onClickDeleteCompetition(competitionId): void {
    this.challengeService.deleteCompetition(competitionId);
  }



}
