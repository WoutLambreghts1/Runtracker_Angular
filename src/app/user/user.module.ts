import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./userHomepage.component";
import {UserRoutingModule} from "./user-routing.module";
import {CommonModule} from "@angular/common";
import {EditProfileComponent} from "./profile/edit/editProfile.component";
import {EditProfileService} from "./profile/editProfile.service";

@NgModule({
  imports: [CommonModule, UserRoutingModule],
  providers: [EditProfileService],
  declarations: [UserHomepageComponent, EditProfileComponent],
})

export class UserModule {

}
