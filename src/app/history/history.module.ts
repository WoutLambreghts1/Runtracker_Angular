import {NgModule} from "@angular/core";
import {HistoryComponent} from "./history.component";
import {HistoryRoutingModule} from "./history-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import {HistoryService} from "./history.service";
import {SharedModule} from "../shared/shared.module";
import {TrackingDetailComponent} from "./detail/tracking-detail/tracking-detail.component";
import {CompetitionDetailComponent} from "./detail/competition-detail/competition-detail.component";
import {SecondsToTimePipe} from "./detail/secondsToTimePipe";
import {AgmCoreModule} from "angular2-google-maps/core";

@NgModule({
  imports: [CommonModule, FormsModule, HistoryRoutingModule, ChartsModule,SharedModule, AgmCoreModule.forRoot({
    apiKey: 'AIzaSyDrRDabb3-ZhT6tP95Va4KXht343aLgWTc'
  })],
  providers: [HistoryService],
  declarations: [HistoryComponent, TrackingDetailComponent, CompetitionDetailComponent, SecondsToTimePipe],
})

export class HistoryModule {

}
