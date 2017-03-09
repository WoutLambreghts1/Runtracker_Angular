import {NgModule} from "@angular/core";
import {HistoryComponent} from "./history.component";
import {HistoryRoutingModule} from "./history-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import {HistoryService} from "./history.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, HistoryRoutingModule, ChartsModule,SharedModule],
  providers: [HistoryService],
  declarations: [HistoryComponent],
})

export class HistoryModule {

}
