import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CoreInfoComponent} from "./core-info/core-info.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [],
  declarations: [CoreInfoComponent],
  exports: [CoreInfoComponent]
})

export class SharedModule {

}
