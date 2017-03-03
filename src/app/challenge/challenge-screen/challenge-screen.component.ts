import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../model/user";
import {Competition} from "../../model/competition";

@Component({
  selector: 'challenge-screen',
  templateUrl: 'challenge-screen.component.html',
  styleUrls: ['challenge-screen.component.css']
})

export class ChallengeScreenComponent implements OnInit {
  @Input() competition:Competition;
  private distanceP1FromFinishInPercentage:number;
  private distanceP2FromFinishInPercentage:number;
  private badgeOne;
  private badgeTwo;

  ngOnInit():void {
    this.badgeOne = document.getElementById('badge-player-one');
    this.badgeTwo = document.getElementById('badge-player-two');
    
    this.distanceP1FromFinishInPercentage = 40;
    this.distanceP2FromFinishInPercentage = 60;
    this.badgeOne.style.top = this.distanceP1FromFinishInPercentage.toString() + "%";
    this.badgeTwo.style.top = this.distanceP2FromFinishInPercentage.toString() + "%";
  }
}
