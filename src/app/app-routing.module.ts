import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./homepage/homepage.component";
import {AuthGuard} from "./authentication/authguard";

export const routes: Routes = [
  {path: 'home', loadChildren: 'app/user/user-homepage.module#UserHomepageModule'},
  {path: 'challenge', loadChildren: 'app/challenge/challenge.module#ChallengeModule', canActivate:[AuthGuard]},
  {path: 'history', loadChildren: 'app/history/history.module#HistoryModule', canActivate:[AuthGuard]},
  {path: 'friends', loadChildren: 'app/friends/friends.module#FriendsModule', canActivate:[AuthGuard]},
  {path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule', canActivate:[AuthGuard]},
  {path: 'ranking', loadChildren: 'app/ranking/ranking.module#RankingModule', canActivate:[AuthGuard]},
  {path: '', component: HomePageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
