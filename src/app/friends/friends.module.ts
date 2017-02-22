import {NgModule} from "@angular/core";
import {FriendsComponent} from "./friends.component";
import {FriendsRoutingModule} from "./friends-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FriendCardComponent} from "./friend-card/friend-card.component";
import {FriendsService} from "./friends.service";

@NgModule({
  imports: [CommonModule, FormsModule, FriendsRoutingModule],
  providers: [FriendsService],
  declarations: [FriendsComponent, FriendCardComponent],
})

export class FriendsModule {

}
