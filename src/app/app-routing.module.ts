import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./homepage/homepage.component";
import {PageNotFoundComponent} from "./PageNotFound.component";

export const routes: Routes = [
  {path: 'home', loadChildren: 'app/user/user-homepage.module#UserHomepageModule'},
  {path: 'challenge', loadChildren: 'app/challenge/challenge.module#ChallengeModule'},
  {path: 'history', loadChildren: 'app/history/history.module#HistoryModule'},
  {path: 'friends', loadChildren: 'app/friends/friends.module#FriendsModule'},
  {path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule'},
  {path: '', component: HomePageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
