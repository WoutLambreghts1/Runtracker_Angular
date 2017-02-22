import {NgModule} from "@angular/core";
import {HistoryComponent} from "./history.component";
import {HistoryRoutingModule} from "./history-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HistoryService} from "./history.service";

@NgModule({
  imports: [CommonModule, FormsModule, HistoryRoutingModule],
  providers: [HistoryService],
  declarations: [HistoryComponent],
})

export class HistoryModule {

}
