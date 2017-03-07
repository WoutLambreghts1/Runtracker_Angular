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

  // select options
  private timeFrame = ['Day', 'Week', 'Month', 'Year'];
  private activeTimeFrame = 'Month';
  private historyTypes = ['Competition', 'Tracking', 'All'];
  private activeHistoryType = 'All';
  private data = ['Average speed', 'Maximum speed', 'Total distance', 'Total duration'];
  private activeData = 'Average speed';

  // Chart parameters
  private lineChartData: Array<any> = [{data: []}];
  private lineChartLabels: Array<any> = [];
  private lineChartColors: Array<any> = [
    {
      backgroundColor: '#2ddeff',
      borderColor: '#2e87fe',
      pointBackgroundColor: '#6388ef',
      pointBorderColor: '#0cd6ef',
      pointHoverBackgroundColor: '#80d234',
      pointHoverBorderColor: '#168b19'
    }
  ];
  private lineChartLegend: boolean = false;
  private lineChartType: string = 'line';
  private lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{type: 'time'}]
    }
  };

  constructor(private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.historyService.getAllHistoryEvents().subscribe((val) => {
      console.log(val);
      this.historyWrapperElements = val;
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
      case 'Total duration':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return fa.competition.trackings[0].totalDuration;
          } else {
            return fa.tracking.totalDuration;
          }
        })
        ;
        break;
      case 'Total distance':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return fa.competition.trackings[0].totalDistance;
          } else {
            return fa.tracking.totalDistance;
          }
        })
        ;
        break;
      case 'Maximum speed':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return fa.competition.trackings[0].maxSpeed;
          } else {
            return fa.tracking.maxSpeed;
          }
        })
        ;
        break;
      case 'Average speed':
        result = filteredArray.map(fa => {
          if (fa.type == 'competition') {
            return fa.competition.trackings[0].avgSpeed;
          } else {
            return fa.tracking.avgSpeed;
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
