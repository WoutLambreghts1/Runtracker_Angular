import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserHomepageComponent} from "./home/user-homepage.component";
import {UserHomepageRoutingModule} from "./user-homepage-routing.module";
import {SharedModule} from "../shared/shared.module";
import {UserHomepageService} from "./home/user-homepage.service";
import {HeaderComponent} from "../homepage/header/header.component";
import {CoreInfoComponent} from "./core-info/core-info.component";
import {HomepageFeedComponent} from "./homepage-feed/homepage-feed.component";

@NgModule({
  imports: [CommonModule, FormsModule, UserHomepageRoutingModule],
  providers: [UserHomepageService],
  declarations: [UserHomepageComponent, CoreInfoComponent, HomepageFeedComponent],
})

export class UserHomepageModule {

}
