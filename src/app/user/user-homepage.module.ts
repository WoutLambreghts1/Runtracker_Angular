import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserHomepageComponent} from "./home/user-homepage.component";
import {UserHomepageRoutingModule} from "./user-homepage-routing.module";
import {SharedModule} from "../shared/shared.module";
import {UserHomepageService} from "./home/user-homepage.service";
import {HomepageFeedComponent} from "./homepage-feed/homepage-feed.component";
import {HomepageFeedService} from "./homepage-feed/homepage-feed.service";

@NgModule({
  imports: [CommonModule, FormsModule, UserHomepageRoutingModule, SharedModule],
  providers: [UserHomepageService,HomepageFeedService],
  declarations: [UserHomepageComponent, HomepageFeedComponent],
})

export class UserHomepageModule {

}
