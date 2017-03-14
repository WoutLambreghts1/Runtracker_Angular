import {NgModule} from "@angular/core";
import {ChallengeRoutingModule} from "./challenge-routing.module";
import {ChallengeComponent} from "./challenge.component";
import {ChallengeService} from "./challenge.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ChallengeItemComponent} from "./challenge-item/challenge-item.component";
import {PlayerInfoComponent} from "./player-information/player-information.component";
import {ChallengeScreenComponent} from "./challenge-screen/challenge-screen.component";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {MQTTService} from "../mqtt/mqtt.service";
import {ConfigService} from "../mqtt/config/config.service";

@NgModule({
  imports: [CommonModule, FormsModule, ChallengeRoutingModule,AgmCoreModule.forRoot({
    apiKey: 'AIzaSyDrRDabb3-ZhT6tP95Va4KXht343aLgWTc'
  }), MQTTService, ConfigService],
  providers: [ChallengeService],
  declarations: [ChallengeComponent, ChallengeItemComponent,PlayerInfoComponent,ChallengeScreenComponent],
})

export class ChallengeModule {

}
