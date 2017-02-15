import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./home/user-homepage.component";
import {EditProfileComponent} from "./edit/edit-profile.component";
import {ChallengeComponent} from "../challenge/challenge.component";

const routes: Routes = [
  { path: '',    component: UserHomepageComponent },
  {path: 'editprofile', component: EditProfileComponent},
  {path: 'challenge', component: ChallengeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule{

}
