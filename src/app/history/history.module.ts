import {NgModule} from "@angular/core";
import {HistoryComponent} from "./history.component";
import {HistoryRoutingModule} from "./history-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HistoryService} from "./history.service";
import {HistoryListItemComponent} from "./history-list-item/history-list-item.component";

@NgModule({
  imports: [CommonModule, FormsModule, HistoryRoutingModule],
  providers: [HistoryService],
  declarations: [HistoryComponent, HistoryListItemComponent],
})

export class HistoryModule {

}
