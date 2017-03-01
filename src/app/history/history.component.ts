import {Component, OnInit} from "@angular/core";
import {HistoryService} from "./history.service";
import {HistoryWrapper} from "../model/history-wrapper";

@Component({
  selector: 'history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})

export class HistoryComponent implements OnInit {
  // Wrapper element for chronological overview with trackings AND competitions
  private historyWrapperElements: HistoryWrapper[];

  constructor(private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.historyWrapperElements = [];

    // get all trackings and put them in a wrapper
    this.historyService.getAllTrackings()
      .subscribe(data => {
          if (data != null) {
            data.forEach(x => {
              let temp = new HistoryWrapper();
              temp.type = 'tracking';
              temp.makeTrackingHistory(x);
              this.historyWrapperElements.push(temp);
            })
          }
        }
        , err => {
        });

    // get all competitions and put them in a wrapper
    this.historyService.getAllCompetitions()
      .subscribe(data => {
          if (data != null) {
            data.forEach(x => {
              x => x.time = new Date(x.time);
              let temp = new HistoryWrapper();
              temp.type = 'competition';
              temp.makeCompetitionHistory(x);
              this.historyWrapperElements.push(temp);
            })
          }
        }
        , err => {
        });

    // sort the wrapperelements on date
    this.historyWrapperElements.sort((a, b) => {
      if (a.type == 'competition' && b.type == 'competition') {
        return a.competition.trackings[0].time.getDate() - b.competition.trackings[0].time.getDate();
      } else if (a.type == 'competition' && b.type == 'tracking') {
        return a.competition.trackings[0].time.getDate() - b.tracking.time.getDate();
      } else if (a.type == 'tracking' && b.type == 'competition') {
        return a.tracking.time.getDate() - b.competition.trackings[0].time.getDate();
      } else {
        return a.tracking.time.getDate() - b.tracking.time.getDate();
      }
    });
  }
}
