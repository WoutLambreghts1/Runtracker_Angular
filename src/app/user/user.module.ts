import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserRoutingModule} from "./user-routing.module";
import {EditProfileService} from "./edit/edit-profile.service.ts";
import {UserHomepageComponent} from "./home/userhomepage.component.ts";
import {EditProfileComponent} from "./edit/edit-profile.component.ts";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [CommonModule, FormsModule, UserRoutingModule],
  providers: [EditProfileService],
  declarations: [UserHomepageComponent, EditProfileComponent],
})

export class UserModule {

}
