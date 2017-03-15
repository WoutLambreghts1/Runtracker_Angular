import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {HistoryService} from "../../history.service";
import {Tracking} from "../../../model/tracking";
import {ActivatedRoute} from "@angular/router";
import {Coordinate} from "../../../model/coordinate";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {SebmGoogleMap} from "angular2-google-maps/esm/core/directives/google-map";

@Component({
  selector: 'trackingDetailComponent',
  templateUrl: 'tracking-detail.component.html',
  styleUrls: ['tracking-detail.component.css']
})

export class TrackingDetailComponent implements OnInit {
  private trackingId:number;
  private tracking:Tracking;

  // Chart parameters
  private lineChartData:Array<any> = [{data: []}];
  private lineChartLabels:Array<any> = [];
  private lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(12, 214, 239, 0.2)',
      borderColor: '#2e87fe',
      pointBackgroundColor: '#2e87fe',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2e87fe'
    }
  ];
  private lineChartLegend:boolean = false;
  private lineChartType:string = 'line';
  private lineChartOptions:any = {
    responsive: true,
    scales: {}
  };

  constructor(private activeRoute:ActivatedRoute, private historyService:HistoryService) {
  }

  ngOnInit():void {
    this.activeRoute.params.subscribe(params => {
      this.trackingId = +params['id'];
      this.historyService.getTracking(this.trackingId).subscribe(val => {
        this.tracking = val;
        this.setChartData(this.tracking);
        //this.loadMap();
      });
    });
  }

  setChartData(tracking:Tracking) {
    this.lineChartData[0] = {data: tracking.coordinates.map(x => x.speed.toFixed(2))};

    //Prevent having too much labels
    let length = tracking.coordinates.length;
    if (length > 20) {
      let labels:Coordinate[] = [];
      labels[0] = tracking.coordinates[0];
      for (let i = 1; i < 20; i++) {
        labels[i] = tracking.coordinates[Math.round((length * (0.05 * i)))];
      }
      labels[20] = tracking.coordinates[length - 1];

      this.lineChartLabels = labels.map(x => this.formatTime(x.time));

    }
    else {
      this.lineChartLabels = this.tracking.coordinates.map(x => this.formatTime(x.time));
    }
  }


  // chart events
  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }

  private formatTime(seconds) {
    let date = new Date(seconds);
    let hh = ((date.getHours()-1) < 10) ? "0" + (date.getHours()-1) : (date.getHours()-1);
    let mm = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    let ss = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
    return hh + ":" + mm + ":" + ss;
  }

}
