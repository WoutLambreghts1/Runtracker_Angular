import {NgModule} from "@angular/core";
import {FriendsComponent} from "./friends.component";
import {FriendsRoutingModule} from "./friends-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, FriendsRoutingModule],
  providers: [],
  declarations: [FriendsComponent],
})

export class FriendsModule {

}
