import {Component, OnInit} from "@angular/core";
import {RankingService} from "./ranking.service";
import {User} from "../model/user";


@Component({
  selector: 'ranking',
  templateUrl: 'ranking.component.html',
  styleUrls: ['ranking.component.css'],
  providers: [RankingService]
})

export class RankingComponent implements OnInit{
  private users: User[];
  private orderOption = 1;

  constructor(private rankingService:RankingService) {
  }

  ngOnInit(): void {
    this.rankingService.getUsers(this.orderOption).subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  orderFriends(option):void{
    this.rankingService.getFriends(option).subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error as string);
      }
    );
  }


  orderUsers(option):void{
    this.rankingService.getUsers(option).subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error as string);
      }
    );
  }
}
