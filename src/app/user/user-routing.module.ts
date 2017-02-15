import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./home/user-homepage.component";
import {EditProfileComponent} from "./edit/edit-profile.component";

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
