import {NgModule} from "@angular/core";
import {ProfileRoutingModule} from "./profile-routing.module";
import {EditProfileService} from "./edit/edit-profile.service";
import {EditProfileComponent} from "./edit/edit-profile.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, ProfileRoutingModule],
  providers: [EditProfileService],
  declarations: [EditProfileComponent],
})

export class ProfileModule {

}
