import {Component, OnInit} from "@angular/core";
import {RankingService} from "./ranking-table/ranking-table.service.ts";


@Component({
  selector: 'ranking',
  templateUrl: 'ranking.component.html',
  styleUrls: ['ranking.component.css'],
  providers: [RankingService]
})

export class RankingComponent implements OnInit{

  ngOnInit(): void {
  }
  constructor() {
  }

}