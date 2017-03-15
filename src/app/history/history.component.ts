import {Component, OnInit} from "@angular/core";
import {HistoryService} from "./history.service";
import {HistoryWrapper} from "../model/history-wrapper";
import {User} from "../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.css']
})

export class HistoryComponent implements OnInit {

  // Wrapper element for chronological overview with trackings AND competitions
  private historyWrapperElements: HistoryWrapper[];
  private user: User;

  // select options
  private timeFrame = ['Day', 'Week', 'Month', 'Year'];
  private activeTimeFrame = 'Month';
  private historyTypes = ['Competition', 'Tracking', 'All'];
  private activeHistoryType = 'All';
  private data = ['Average speed', 'Maximum speed', 'Total distance', 'Total duration (in s)'];
  private activeData = 'Average speed';

  // Chart parameters
  private lineChartData: Array<any> = [{data: []}];
  private lineChartLabels: Array<any> = [];
  private lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(12, 214, 239, 0.2)',
      borderColor: '#2e87fe',
      pointBackgroundColor: '#2e87fe',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2e87fe'
    }
  ];
  private lineChartLegend: boolean = false;
  private lineChartType: string = 'line';
  private lineChartOptions: any = {
    responsive: true,
    scales: {}
  };

  constructor(private router: Router, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.historyService.getUser().subscribe(val => this.user = val, err => console.log(err));
    this.historyService.getAllHistoryEvents().subscribe((val) => {
      console.log(val);
      (val.length > 25)?this.historyWrapperElements = val.slice(0,25):this.historyWrapperElements = val;
      this.setChart(this.activeTimeFrame, this.activeData, this.activeHistoryType);
    }, err => console.log(err));
  }

  setChart(timeframe: string, data: string, historyType: string) {
    let filteredArray: HistoryWrapper[];

    switch (historyType) {
      case 'All':
        filteredArray = this.historyWrapperElements.filter(x => x.type == 'tracking' || x.type == 'competition');
        break;
      case 'Competition':
        filteredArray = this.historyWrapperElements.filter(x => x.type == 'competition');
        break;
      case 'Tracking':
        filteredArray = this.historyWrapperElements.filter(x => x.type == 'tracking');
        break;
    }

    this.setChartData(timeframe, data, filteredArray);
    this.setChartLabels(timeframe, filteredArray);
  }

  private setChartData(timeframe: string, data: string, filteredArray: HistoryWrapper[]) {

    // filter for timeframe
    filteredArray = filteredArray.filter(x => {
      return this.checkTimeFrame(x.date, timeframe);
    });

    // get the data
    let result: any[];
    switch (data) {
      case 'Total duration (in s)':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return fa.competition.trackings[0].totalDuration.toFixed(2);
          } else {
            return fa.tracking.totalDuration.toFixed(2);
          }
        })
        ;
        break;
      case 'Total distance':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return (fa.competition.trackings[0].totalDistance/1000).toFixed(2);
          } else {
            return (fa.tracking.totalDistance/1000).toFixed(2);
          }
        })
        ;
        break;
      case 'Maximum speed':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return fa.competition.trackings[0].maxSpeed.toFixed(2);
          } else {
            return fa.tracking.maxSpeed.toFixed(2);
          }
        })
        ;
        break;
      case 'Average speed':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return fa.competition.trackings[0].avgSpeed.toFixed(2);
          } else {
            return fa.tracking.avgSpeed.toFixed(2);
          }
        })
        ;
        break;
    }
    console.log(result);

    this.lineChartData[0] = {data: result}
  }

  private checkTimeFrame(dateToCheck: Date, timeframe: string): boolean {
    let result = false;
    let timeframeBarrier;
    switch (timeframe) {
      case 'Day':
        timeframeBarrier = new Date();
        timeframeBarrier.setHours(0, 0, 0);
        result = dateToCheck >= timeframeBarrier;
        break;
      case 'Week':
        timeframeBarrier = new Date();
        timeframeBarrier = this.getMonday(timeframeBarrier);
        timeframeBarrier.setHours(0, 0, 0);
        result = dateToCheck >= timeframeBarrier;
        break;
      case 'Month':
        timeframeBarrier = new Date();
        timeframeBarrier.setDate(1);
        timeframeBarrier.setHours(0, 0, 0);
        result = dateToCheck >= timeframeBarrier;
        break;
      case 'Year':
        timeframeBarrier = new Date();
        timeframeBarrier.setMonth(0, 1);
        timeframeBarrier.setHours(0, 0, 0);
        result = dateToCheck >= timeframeBarrier;
        break;
    }
    //console.log('checktimeframe (' + timeframe + ') : ' + timeframeBarrier.toDateString() + ' ' + timeframeBarrier.toTimeString() + " ==> " + result);
    return result;
  }

  private setChartLabels(timeframe: string, filteredArray: HistoryWrapper[]) {

    // filter for timeframe
    filteredArray = filteredArray.filter(x => {
      return this.checkTimeFrame(x.date, timeframe);
    });

    // get the data
    let result = filteredArray.map(fa => {
      return fa.date;
    });
    console.log(result);
    this.lineChartLabels = result;

    switch (timeframe) {
      case 'Day':
        this.lineChartOptions.scales = {
          xAxes: [{
            type: 'time', time: {
              format: "HH:mm",
              unit: 'hour',
              unitStepSize: 2,
              displayFormats: {
                'minute': 'HH:mm',
                'hour': 'HH:mm',
              }
            }
          }]
        };
        break;
      case 'Week':
        this.lineChartOptions.scales = {
          xAxes: [{
            type: 'time', time: {
              format: "ll",
              unit: 'day',
              unitStepSize: 1,
              displayFormats: {
                'day': 'll'
              }
            }
          }]
        };
        break;
      case 'Month':
        this.lineChartOptions.scales = {
          xAxes: [{
            type: 'time', time: {
              format: "ll",
              unit: 'day',
              unitStepSize: 1,
              displayFormats: {
                'day': 'll'
              }
            }
          }]
        };
        break;
      case 'Year':
        this.lineChartOptions.scales = {
          xAxes: [{
            type: 'time', time: {
              format: "ll",
              unit: 'day',
              unitStepSize: 5,
              displayFormats: {
                'day': 'll'
              }
            }
          }]
        };
        break;
    }
  }

  private getMonday(d): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  // chart events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  // Select options
  onDataChange(e) {
    this.activeData = e;
    this.setChart(this.activeTimeFrame, this.activeData, this.activeHistoryType);
  }

  onHistoryTypesChange(e) {
    this.activeHistoryType = e;
    this.setChart(this.activeTimeFrame, this.activeData, this.activeHistoryType);
  }

  onTimeFrameChange(e) {
    this.activeTimeFrame = e;
    this.setChart(this.activeTimeFrame, this.activeData, this.activeHistoryType);
  }

}
