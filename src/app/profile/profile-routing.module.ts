import {Routes, RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {NgModule} from "@angular/core";
import {EditProfileComponent} from "./edit/edit-profile.component";

const routes: Routes = [
  { path: '',    component: ProfileComponent},
  { path: 'edit',    component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule{

}
