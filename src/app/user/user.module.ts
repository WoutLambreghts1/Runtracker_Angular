import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserRoutingModule} from "./user-routing.module";
import {EditProfileService} from "./edit/editProfile.service";
import {UserHomepageComponent} from "./home/userHomepage.component";
import {EditProfileComponent} from "./edit/editProfile.component";

@NgModule({
  imports: [CommonModule, FormsModule, UserRoutingModule],
  providers: [EditProfileService],
  declarations: [UserHomepageComponent, EditProfileComponent],
})

export class UserModule {

}
