import {Component, Input, OnInit} from "@angular/core";
import {Competition} from "../../model/competition";

@Component({
  selector: 'challenge-screen',
  templateUrl: 'challenge-screen.component.html',
  styleUrls: ['challenge-screen.component.css']
})

export class ChallengeScreenComponent implements OnInit {
  @Input() competition:Competition;
  private badgeOne;
  private badgeTwo;

  private percentFromFinishP1;
  private percentFromFinishP2;


  ngOnInit():void {

    this.badgeOne = document.getElementById('badge-player-one');
    this.badgeTwo = document.getElementById('badge-player-two');
    
    this.percentFromFinishP1 = 100;
    this.percentFromFinishP2 = 100;

    this.updateBadge(this.badgeOne, this.percentFromFinishP1);
    this.updateBadge(this.badgeTwo, this.percentFromFinishP2);

  }

  private updateBadge(badge, percentFromFinish:number) {
    badge.style.top = percentFromFinish.toString() + "%";
  }

  //TEST
  onclickUpdate():void {
    if ((this.percentFromFinishP1 - 10 >= 0))
      this.percentFromFinishP1 -= 10;
    this.updateBadge(this.badgeOne, this.percentFromFinishP1);

  }

}
