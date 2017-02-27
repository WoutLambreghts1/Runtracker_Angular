import {Component, Input} from "@angular/core";
import {Competition} from "../../../model/competition";
@Component({
  selector: 'competition-list-item',
  templateUrl: 'competition-list-item.component.html',
  styleUrls: ['competition-list-item.component.css']
})

export class CompetitionListItemComponent {
  @Input() competition: Competition;
}
