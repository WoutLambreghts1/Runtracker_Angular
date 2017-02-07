import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {SuccesLoginComponent} from "./succesLogin.component";
import {HomePageComponent} from "./homepage/homepage.component";
import {PageNotFoundComponent} from "./PageNotFound.component";
import {EditProfileComponent} from "./profile/edit/editProfile.component.ts";

export const routes: Routes = [
  {path: 'succesLogin', component: SuccesLoginComponent},
  {path: 'editProfile', component: EditProfileComponent},
  {path: '', component: HomePageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
