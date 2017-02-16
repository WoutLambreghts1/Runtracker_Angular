import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})

export class SharedModule {

}
