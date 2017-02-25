import {NgModule} from "@angular/core";
import {RankingRoutingModule} from "./ranking-routing.module.ts";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RankingComponent} from "./ranking.component";
import {RankingService} from "./ranking.service";

@NgModule({
  imports: [CommonModule, FormsModule, RankingRoutingModule],
  providers: [RankingService],
  declarations: [RankingComponent],
})

export class RankingModule {

}
