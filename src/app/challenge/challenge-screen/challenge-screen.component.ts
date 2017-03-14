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
    let result = 0;
    if (this.competition != null && this.competition.goal != null) {
      result = (progress / this.competition.goal.distance * 100);
      if (result > 100) {
        result = 100;
      } else if (result < 0) {
        result = 0;
      }
    }
    return {'height': result + '%'}
  }
}
