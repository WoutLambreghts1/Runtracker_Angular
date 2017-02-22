import {NgModule} from "@angular/core";
import {FriendsComponent} from "./friends.component";
import {FriendsRoutingModule} from "./friends-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FriendProfilePageComponent} from "./profile/friend-profilepage.component";
import {FriendsService} from "./friends.service";
import {FriendProfilePageService} from "./profile/friend-profilepage.service";

@NgModule({
  imports: [CommonModule, FormsModule, FriendsRoutingModule],
  providers: [FriendsService,FriendProfilePageService],
  declarations: [FriendsComponent,FriendProfilePageComponent],
})

export class FriendsModule {

}
