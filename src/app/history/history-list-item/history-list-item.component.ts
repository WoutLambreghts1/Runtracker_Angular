import {Component, Input} from "@angular/core";
import {Tracking} from "../../model/tracking";
@Component({
  selector: 'history-list-item',
  templateUrl: 'history-list-item.component.html',
  styleUrls: ['history-list-item.component.css']
})

export class HistoryListItemComponent{
  @Input() tracking: Tracking;
}
