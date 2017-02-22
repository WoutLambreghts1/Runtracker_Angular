import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {FriendsComponent} from "./friends.component";
import {FriendProfilePageComponent} from "./profile/friend-profilepage.component";

const routes: Routes = [
  { path: '',    component: FriendsComponent},
  { path: ':username',    component: FriendProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FriendsRoutingModule{

}
