import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./home/userhomepage.component.ts";
import {EditProfileComponent} from "./edit/edit-profile.component.ts";

const routes: Routes = [
  { path: '',    component: UserHomepageComponent },
  {path: 'editprofile', component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule{

}
