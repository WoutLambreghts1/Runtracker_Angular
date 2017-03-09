import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CoreInfoComponent} from "./core-info/core-info.component";
import {TrackingListItemComponent} from "./history-list-item/tracking-list-item/tracking-list-item.component";
import {CompetitionListItemComponent} from "./history-list-item/competition-list-item/competition-list-item.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [],
  declarations: [CoreInfoComponent,TrackingListItemComponent,CompetitionListItemComponent],
  exports: [CoreInfoComponent,TrackingListItemComponent,CompetitionListItemComponent]
})

export class SharedModule {

}
