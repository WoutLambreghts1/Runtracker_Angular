import {Component} from "@angular/core";
import {HistoryService} from "../../history.service";
import {Competition} from "../../../model/competition";

@Component({
  selector: 'competitionDetailComponent',
  templateUrl: 'competition-detail.component.html',
  styleUrls: ['competition-detail.component.css']
})

export class CompetitionDetailComponent {
  private competition: Competition;

  constructor(){
  }
}
