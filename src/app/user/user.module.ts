import {NgModule} from "@angular/core";
import {UserHomepageComponent} from "./userHomepage.component";
import {UserRoutingModule} from "./user-routing.module";
import {CommonModule} from "@angular/common";
import {EditProfileComponent} from "./profile/edit/editProfile.component";

@NgModule({
  imports: [CommonModule, UserRoutingModule],
  declarations: [UserHomepageComponent, EditProfileComponent],
})

export class UserModule {

}
