import {NgModule} from "@angular/core";
import {HistoryComponent} from "./history.component";
import {HistoryRoutingModule} from "./history-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import {HistoryService} from "./history.service";
import {TrackingListItemComponent} from "./history-list-item/tracking-list-item/tracking-list-item.component";
import {CompetitionListItemComponent} from "./history-list-item/competition-list-item/competition-list-item.component";

@NgModule({
  imports: [CommonModule, FormsModule, HistoryRoutingModule, ChartsModule],
  providers: [HistoryService],
  declarations: [HistoryComponent, TrackingListItemComponent, CompetitionListItemComponent],
})

export class HistoryModule {

}
