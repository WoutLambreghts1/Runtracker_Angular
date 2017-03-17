import {Component, OnInit} from "@angular/core";
import {HistoryService} from "../../history.service";
import {Competition} from "../../../model/competition";
import {ActivatedRoute} from "@angular/router";
import {Coordinate} from "../../../model/coordinate";

@Component({
  selector: 'competitionDetailComponent',
  templateUrl: 'competition-detail.component.html',
  styleUrls: ['competition-detail.component.css']
})

export class CompetitionDetailComponent implements OnInit {
  private competitionId: number;
  private competition: Competition;

  // Chart parameters
  private lineChartData: Array<any> = [{data: []}];
  private lineChartLabels: Array<any> = [];
  private lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(12, 214, 239, 0.2)',
      borderColor: '#2e87fe',
      pointBackgroundColor: '#2e87fe',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2e87fe'
    },
    { // dark grey
      backgroundColor: 'rgba(12, 214, 239, 0.2)',
      borderColor: '#153972',
      pointBackgroundColor: '#153972',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#153972'
    }
  ];
  private lineChartLegend: boolean = true;
  private lineChartType: string = 'line';
  private lineChartOptions: any = {
    responsive: true,
    scales: {}
  };

  constructor(private activeRoute: ActivatedRoute, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.competitionId = +params['id'];
      this.historyService.getCompetition(this.competitionId).subscribe(val => {
        this.competition = val;
        this.setChartData(this.competition);
      });
    });
  }

  setChartData(competition: Competition) {
    this.lineChartData[0] = {
      data: competition.trackings[0].coordinates.map(x => x.speed.toFixed(2)),
      label: competition.usersRun[0].username
    };
    this.lineChartData[1] = {
      data: competition.trackings[1].coordinates.map(x => x.speed.toFixed(2)),
      label: competition.usersRun[1].username
    };

    //Prevent having too much labels
    let length = competition.trackings[0].coordinates.length;
    if (length > 20) {
      let labels: Coordinate[] = [];
      labels[0] = competition.trackings[0].coordinates[0];
      for (let i = 1; i < 20; i++) {
        labels[i] = competition.trackings[0].coordinates[Math.round((length * (0.05 * i)))];
      }
      labels[20] = competition.trackings[0].coordinates[length - 1];

      this.lineChartLabels = labels.map(x => this.formatTime(x.time));

    }
    else {
      this.lineChartLabels = this.competition.trackings[0].coordinates.map(x => this.formatTime(x.time));
    }
  }


  // chart events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  private formatTime(seconds) {
    let date = new Date(seconds);
    let hh = ((date.getHours()-1) < 10) ? "0" + (date.getHours()) : (date.getHours());
    let mm = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    let ss = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
    return hh + ":" + mm + ":" + ss;
  }

}
