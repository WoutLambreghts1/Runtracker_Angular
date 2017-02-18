import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {EditProfileComponent} from "./edit/edit-profile.component";

const routes: Routes = [
  { path: '',    component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule{

}
