import {Component, Input} from "@angular/core";
import {User} from "../../model/user";

@Component({
  selector: 'friend-card',
templateUrl: 'friend-card.component.html',
  styleUrls: ['friend-card.component.css']
})

export class FriendCardComponent{
  @Input() friend: User;
}
