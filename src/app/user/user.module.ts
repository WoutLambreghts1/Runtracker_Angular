import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./userHomepage.component";
import {UserRoutingModule} from "./user-routing.module";
import {CommonModule} from "@angular/common";
import {EditProfileComponent} from "./profile/edit/editProfile.component";
import {EditProfileService} from "./profile/editProfile.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [CommonModule, FormsModule, UserRoutingModule],
  providers: [EditProfileService],
  declarations: [UserHomepageComponent, EditProfileComponent],
})

export class UserModule {

}
