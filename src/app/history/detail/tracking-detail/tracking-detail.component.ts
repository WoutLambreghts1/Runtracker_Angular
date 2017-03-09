import {Component, OnInit} from "@angular/core";
import {HistoryService} from "../../history.service";
import {Tracking} from "../../../model/tracking";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'trackingDetailComponent',
  templateUrl: 'tracking-detail.component.html',
  styleUrls: ['tracking-detail.component.css']
})

export class TrackingDetailComponent implements OnInit {
  private trackingId: number;
  private tracking: Tracking;

  constructor(private activeRoute: ActivatedRoute, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.trackingId = +params['id'];
    });
    console.log(this.trackingId);
  }
}
