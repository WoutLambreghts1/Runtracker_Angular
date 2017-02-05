import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {SuccesLoginComponent} from "./succesLogin.component";
import {LoginComponent} from "./authentication/login.component";

export const routes: Routes = [
  {path:'succesLogin', component:SuccesLoginComponent},
  {path:'', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
