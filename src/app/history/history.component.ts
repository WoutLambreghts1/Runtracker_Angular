import {Component, OnInit} from "@angular/core";
import {HistoryService} from "./history.service";
import {HistoryWrapper} from "../model/history-wrapper";
import {timeInterval} from "rxjs/operator/timeInterval";

@Component({
  selector: 'history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})

export class HistoryComponent implements OnInit {
  // Wrapper element for chronological overview with trackings AND competitions
  private historyWrapperElements: HistoryWrapper[];

  private historyEventTypes: string[];
  private comparisonCriteria: string[];

  // Chart data
  private lineChartData: Array<any> = [{data: [0]}];
  private lineChartLabels: Array<any> = [];
  private lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  private lineChartLegend: boolean = false;
  private lineChartType: string = 'line';
  private lineChartOptions: any = {responsive: true};

  constructor(private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.historyService.getAllHistoryEvents().subscribe((val: HistoryWrapper[]) => {
      this.historyWrapperElements = val;
      this.setChartData();
    }, err => console.log(err));
  }

  setChartData() {
    setTimeout(() => {
     this.lineChartData = this.historyWrapperElements.map(x => {
        if (x.type == 'competition') {
          return x.competition.trackings[0].avgSpeed; // geeft nog problemen door slechte trackings in de DB
        } else {
          return x.tracking.avgSpeed;
        }
      });
      this.lineChartLabels = this.historyWrapperElements.map(x => {
        if (x.type == 'competition') {
          return x.competition.competitionId;
        } else {
          return x.tracking.trackingId;
        }
      });
    }, 4000);
  }


// chart events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
