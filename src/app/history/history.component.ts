import {Component, OnInit} from "@angular/core";
import {HistoryService} from "./history.service";
import {HistoryWrapper} from "../model/history-wrapper";
import {DateFormatter} from "@angular/common/src/facade/intl";
import {Chartdata} from "../model/chartdata";

@Component({
  selector: 'history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})

export class HistoryComponent implements OnInit {

  // Wrapper element for chronological overview with trackings AND competitions
  private historyWrapperElements: HistoryWrapper[];

  private historyEventTypes: ['competition', 'tracking', 'all'];
  private comparisonCriteria: ['average speed', 'total distance', 'average distance'];
  // Chart data
  private lineChartData: Array<Chartdata> = [{data: [0]}];
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
    this.historyService.getAllHistoryEvents().subscribe((val) => {
      console.log(val);
      this.historyWrapperElements = val;
      this.setChartData();
    }, err => console.log(err));
  }

  setChartData() {
    //set the chart data
    this.lineChartData[0] = {
      data: this.historyWrapperElements.map(x => {
        if (x.type == 'competition') {
          if (x.competition.trackings != null && x.competition.trackings.length > 0) {
            return x.competition.trackings[0].avgSpeed;
          }
        } else {
          if (x.tracking != null)
            return x.tracking.avgSpeed;
        }
        return null;
      }).filter(x => x != null)
    };

    //set the chart labels
    this.lineChartLabels = this.historyWrapperElements.map(x => {
      if (x.type == 'competition') {
        return x.competition.time.toDateString();
      } else {
        return x.tracking.time.toDateString();
      }
    });
  }


// chart events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
