import {Component, Input, OnInit} from "@angular/core";
import {Tracking} from "../../../model/tracking";
@Component({
  selector: 'tracking-list-item',
  templateUrl: 'tracking-list-item.component.html',
  styleUrls: ['tracking-list-item.component.css']
})

export class TrackingListItemComponent {
  @Input() tracking: Tracking;

}
