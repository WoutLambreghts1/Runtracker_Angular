import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {FriendsComponent} from "./friends.component";

const routes: Routes = [
  { path: '',    component: FriendsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FriendsRoutingModule{

}
