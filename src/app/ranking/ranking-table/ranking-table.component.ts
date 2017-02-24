import {Component, OnInit,Input} from "@angular/core";
import {User} from "../../model/user";
import {RankingService} from "./ranking-table.service";


@Component({
  selector: 'ranking-table',
  templateUrl: 'ranking-table.component.html',
  styleUrls: ['ranking-table.component.css'],
  providers: [RankingService]
})

export class RankingTableComponent implements OnInit{
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

  onChangeOrder(option): void{
    this.orderOption = option;
    this.orderUsers(option);
  }

  private orderFriends(option):void{
    this.rankingService.getFriends(option).subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error as string);
      }
    );
  }


  private orderUsers(option):void{
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
