import {Component, OnInit} from "@angular/core";
import {FriendsService} from "./friends.service";
import {User} from "../model/user";

@Component({
  selector: 'friends',
  templateUrl: 'friends.component.html',
  styleUrls: ['friends.component.css'],
})

export class FriendsComponent implements OnInit {
  private potentialFriends: User[] = [];
  private friends: User[] = [];
  private requests: User[] = [];
  queryString: string = "";
  queryStringMyFriends: string = "";

  constructor(private FriendsService: FriendsService) {
  }

  ngOnInit(): void {
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

    this.FriendsService.getFriendrequests().subscribe(
      (friends) => {
        this.requests = friends;
      },
      error => {
        console.log(error as string);
      }
    );
  }

  onClickAddFriend(username): void {
    this.FriendsService.addFriend(username).subscribe(val =>{
      this.ngOnInit();
      console.log(val);
    } , err => console.log(err));
  }

  onClickRemoveFriend(username): void {
    this.FriendsService.deleteFriend(username).subscribe(val => {
        console.log(val);
        this.ngOnInit();
    }
      , err => console.log(err));
  }

  onClickAcceptFriend(username): void {
    this.FriendsService.acceptFriend(username).subscribe(val => {
      this.ngOnInit();
      console.log(val);
    }, err => console.log(err));
  }
}
