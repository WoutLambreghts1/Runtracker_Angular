import {NgModule} from "@angular/core";
import {RankingRoutingModule} from "./ranking-routing.module.ts";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RankingService} from "./ranking-table/ranking-table.service.ts";
import {RankingComponent} from "./ranking.component";
import {RankingTableComponent} from "./ranking-table/ranking-table.component";

@NgModule({
  imports: [CommonModule, FormsModule, RankingRoutingModule],
  providers: [RankingService],
  declarations: [RankingComponent,RankingTableComponent],
})

export class RankingModule {

}
