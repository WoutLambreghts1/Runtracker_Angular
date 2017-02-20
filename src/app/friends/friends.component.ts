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
  private users: User[] = [];
  private friends: User[] = [];
  private user: User;


  constructor(private friendService:FriendsService) {
  }

  ngOnInit():void {
    this.friendService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error as string);
      }
    );
  }


}
