import {Component, Input, OnInit} from "@angular/core";
import {Tracking} from "../../../model/tracking";
@Component({
  selector: 'tracking-list-item',
  templateUrl: 'tracking-list-item.component.html',
  styleUrls: ['tracking-list-item.component.css']
})

export class TrackingListItemComponent implements OnInit{
  @Input() tracking: Tracking;
  private duration:Date;


  ngOnInit(): void {
    this.duration = new Date(1970, 0, 1,0,0,0);
    this.duration.setSeconds(this.tracking.totalDuration);
  }

}
