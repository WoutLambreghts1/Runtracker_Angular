import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserRoutingModule} from "./user-routing.module";
import {EditProfileService} from "./edit/edit-profile.service";
import {UserHomepageComponent} from "./home/user-homepage.component";
import {EditProfileComponent} from "./edit/edit-profile.component";
import {BrowserModule} from "@angular/platform-browser";
import {ChallengeComponent} from "../challenge/challenge.component";

@NgModule({
  imports: [CommonModule, FormsModule, UserRoutingModule],
  providers: [EditProfileService],
  declarations: [UserHomepageComponent, EditProfileComponent,ChallengeComponent],
})

export class UserModule {

}
