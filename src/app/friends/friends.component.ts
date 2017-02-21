import {Component} from "@angular/core";
import {FriendsService} from "./friends.service";
import {User} from "../model/user";
@Component({
  selector: 'friends',
  templateUrl: 'friends.component.html',
  styleUrls: ['friends.component.css'],
  providers: [FriendsService]
})

export class FriendsComponent {
  private potentialFriends: User[] = [];
  private friends: User[] = [];

  constructor(private FriendsService:FriendsService) {
  }

  ngOnInit():void {
    this.FriendsService.getPotentialFriends().subscribe(
      (users) => {
        this.potentialFriends = users;
      },
      error => {
        console.log(error as string);
      }
    );
    this.FriendsService.getFriends().subscribe(
      (friends) => {
        this.friends = friends;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  onClickAddFriend(username):void{
    this.FriendsService.addFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }

  onClickRemoveFriend(username):void{
    this.FriendsService.deleteFriend(username).subscribe(val => console.log(val), err => console.log(err));
    setTimeout(() => this.ngOnInit(), 2000);
  }


}
