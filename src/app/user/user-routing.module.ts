import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./home/userhomepage.component.ts";
import {EditProfileComponent} from "./edit/editprofile.component.ts";

const routes: Routes = [
  { path: '',    component: UserHomepageComponent },
  {path: 'editProfile', component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule{

}
