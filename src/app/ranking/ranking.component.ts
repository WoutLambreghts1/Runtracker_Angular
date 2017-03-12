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
  private friends: boolean;
  private btnWorld;
  private btnFriends;
  constructor(private rankingService:RankingService) {
  }

  ngOnInit(): void {
    this.btnWorld = document.getElementById('button-world');
    this.btnFriends = document.getElementById('button-friends');
    this.btnWorld.click();
  }

  onChangeOrder(option):void{
    (this.friends)?this.getFriends(option):this.getUsers(option);
  }

  getFriends(option):void{
    RankingComponent.setButtonPassive(this.btnWorld);
    RankingComponent.setButtonActive(this.btnFriends);

    this.friends = true;
    this.rankingService.getFriends(option).subscribe(
      (users) => {
        this.users = users.slice(0,10);
      },
      error => {
        console.log(error as string);
      }
    );
  }

  getUsers(option):void{
    RankingComponent.setButtonPassive(this.btnFriends);
    RankingComponent.setButtonActive(this.btnWorld);

    this.friends = false;
    this.rankingService.getUsers(option).subscribe(
      (users) => {
        this.users = users.slice(0,10);
      },
      error => {
        console.log(error as string);
      }
    );
  }

  static setButtonActive(button):void{
    button.classList.remove('btn-default');
    button.classList.add('btn-active');
  };

  static setButtonPassive(button):void{
    button.classList.remove('btn-active');
    button.classList.add('btn-default');
  };
}
