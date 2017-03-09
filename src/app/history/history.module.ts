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

@NgModule({
  imports: [CommonModule, FormsModule, HistoryRoutingModule, ChartsModule,SharedModule],
  providers: [HistoryService],
  declarations: [HistoryComponent, TrackingDetailComponent, CompetitionDetailComponent],
})

export class HistoryModule {

}
