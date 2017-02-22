import {Component, OnInit} from "@angular/core";
import {HistoryService} from "./history.service";
import {Tracking} from "../model/tracking";
@Component({
  selector: 'history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})

export class HistoryComponent implements OnInit {
  private trackings: Tracking[];

  constructor(private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.historyService.getAllTrackings().subscribe(data => this.trackings = data, err => {

    });
  }
}
