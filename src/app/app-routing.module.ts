import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {SuccesLoginComponent} from "./succesLogin.component";
import {HomePageComponent} from "./homepage/homepage.component";

export const routes: Routes = [
  {path:'succesLogin', component:SuccesLoginComponent},
  {path:'', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
