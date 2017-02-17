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
  private competitionsAvailable: Competition[];
  private competitionsRun: Competition[];
  private dataLoaded: boolean = false;
  constructor(private challengeService: ChallengeService,private auth:AuthService){
    this.dataLoaded = false;
    this.goals = [];
    this.competitionsAvailable = [];
    this.competitionsRun = [];
    this.onClickNewCompetition();
    this.loadData();
  }

  private loadData(): void{

    //Get goals (to create competition), available competitions (to compete), all competing competitions
    this.challengeService.getGoals().subscribe(
      (goals) => {
        this.goals = goals;
      },
      error => {
        console.log(error as string);
      }
    );

    /*
     this.challengeService.getAllAvailableCompetitions().subscribe(
     (competitions: Competition[]) => {
     this.competitionsAvailable = competitions;
     console.log(competitions);
     },
     error => {
     console.log(error as string);
     }
     );
     */

    this.challengeService.getAllCompetitionsRun().subscribe(
      (competitions) => {
        this.competitionsRun = competitions;
        this.dataLoaded = true;
        console.log("all loaded");
      },
      error => {
        console.log(error as string);
      }
    );
  }

  ngOnInit(): void {


  }

  //Create new competition
  private onClickNewCompetition(): void{
    this.newCompetition = new Competition();
    this.newCompetition.maxParticipants = 2;
    this.newCompetition.deadline = new Date();
    this.newCompetition.competitionType="NOT_REALTIME";
    console.log(this.goals);
    console.log(this.dataLoaded);
  }


  private onClickAddCompetition(competition: Competition): void {
    this.challengeService.createCompetition(competition);
  }



}
