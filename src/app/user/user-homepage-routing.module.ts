import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./home/user-homepage.component";

const routes: Routes = [
  {path: '', component: UserHomepageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserHomepageRoutingModule {

}
