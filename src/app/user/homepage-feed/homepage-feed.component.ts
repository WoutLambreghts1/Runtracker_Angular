import {Component, OnInit, Input} from "@angular/core";
import {User} from "../../model/user";
@Component({
  selector: 'homepage-feed',
  templateUrl: 'homepage-feed.component.html',
  styleUrls: ['homepage-feed.component.css']
})

export class HomepageFeedComponent implements OnInit{
  @Input() friends: User[];

  ngOnInit(): void {
    console.log(this.friends);
  }
}
