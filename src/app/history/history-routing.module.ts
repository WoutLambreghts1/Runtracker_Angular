import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HistoryComponent} from "./history.component";
import {TrackingDetailComponent} from "./detail/tracking-detail/tracking-detail.component";
import {CompetitionDetailComponent} from "./detail/competition-detail/competition-detail.component";

const routes: Routes = [
  {path: '', component: HistoryComponent},
  {path: 'tracking/:id', component: TrackingDetailComponent},
  {path: 'competition/:id', component: CompetitionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HistoryRoutingModule {

}
