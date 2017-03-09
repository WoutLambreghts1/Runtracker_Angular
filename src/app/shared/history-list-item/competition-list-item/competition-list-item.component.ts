import {Component, Input} from "@angular/core";
import {Competition} from "../../../model/competition";
import {Router} from "@angular/router";
@Component({
  selector: 'competition-list-item',
  templateUrl: 'competition-list-item.component.html',
  styleUrls: ['competition-list-item.component.css']
})

export class CompetitionListItemComponent {
  @Input() competition: Competition;
  private duration:Date;

  ngOnInit(): void {
    this.duration = new Date(1970, 0, 1,0,0,0);
    this.duration.setSeconds(this.competition.trackings[0].totalDuration);
  }
}
