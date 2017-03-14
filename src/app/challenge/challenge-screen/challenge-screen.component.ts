import {Component, Input, OnInit} from "@angular/core";
import {Competition} from "../../model/competition";

@Component({
  selector: 'challenge-screen',
  templateUrl: 'challenge-screen.component.html',
  styleUrls: ['challenge-screen.component.css']
})

export class ChallengeScreenComponent implements OnInit {
  @Input() competition: Competition;
  @Input() hashmap: { [key: number]: number; };

  ngOnInit(): void {

  }

  setProgressbar(progress) {
    return {'height': (progress / this.competition.goal.distance * 100) + '%'}
  }
}
