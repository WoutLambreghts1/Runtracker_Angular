import {Component, OnInit} from "@angular/core";
import {HomepageFeedService} from "./homepage-feed.service";
import {HistoryWrapper} from "../../model/history-wrapper";
@Component({
  selector: 'homepage-feed',
  templateUrl: 'homepage-feed.component.html',
  styleUrls: ['homepage-feed.component.css']
})

export class HomepageFeedComponent implements OnInit {
  // Wrapper element for chronological overview with trackings AND competitions
  private historyWrapperElements:HistoryWrapper[];

  ngOnInit():void {
    this.homepageFeedService.getAllHistoryEvents().subscribe((val) => {
      console.log(val);
      this.historyWrapperElements = val;
    }, err => console.log(err));
  }


  constructor(private homepageFeedService:HomepageFeedService) {
  }
}
