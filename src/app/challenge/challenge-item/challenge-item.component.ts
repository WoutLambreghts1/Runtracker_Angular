import {Component, Input} from "@angular/core";
import {Competition} from "../../model/competition";

@Component({
  selector: 'challenge-item',
  templateUrl: 'challenge-item.component.html',
  styleUrls: ['challenge-item.component.css']
})

export class ChallengeItemComponent{
  @Input() competition: Competition;
}
