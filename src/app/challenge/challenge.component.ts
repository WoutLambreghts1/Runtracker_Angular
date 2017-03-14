import {Component, OnInit, OnDestroy} from "@angular/core";
import {ChallengeService} from "./challenge.service";
import {AuthService} from "./../authentication/auth.service";
import {Competition} from "../model/competition";
import {User} from "../model/user";
import {MQTTService} from "../mqtt/mqtt.service";
import {ConfigService} from "../mqtt/config/config.service";
import {Packet} from "mqtt";
import {Subscription} from "rxjs";
import {MQTTPacket, MQTTPacketType, TrackingPacket} from "../mqtt/packet/mqtt.packet";

@Component({
  selector: 'challenge',
  templateUrl: 'challenge.component.html',
  styleUrls: ['challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent implements OnInit, OnDestroy {
  private competitionsLive: Competition[] = [];
  private competitionSelected: Competition = new Competition();

  private compMessages: Subscription;

  private hashmap: { [key: number]: number; } = {}; // Implementation of a hashmap


  constructor(private challengeService: ChallengeService, private auth: AuthService, private mqttService: MQTTService, private configService: ConfigService) {
    let u1: User = new User("", "", "", "");
    let u2: User = new User("", "", "", "");
    this.competitionSelected.usersRun = [u1, u2];
  }

  onClickSetCompetition(c: Competition) {
    this.competitionSelected = c;
    this.configService.getConfigWithCompTopic(c.competitionId).then(config => {
      this.mqttService.configure(config);
      this.mqttService.try_connect().then(() => {
        this.on_connect();
      }).catch(() => {
        this.on_error();
      });
    });
  }

  ngOnInit(): void {
    this.challengeService.getLiveCompetitions().subscribe(
      (competitions) => {
        if (competitions != null) {
          competitions.forEach(c => c.time = new Date(c.time));
          this.competitionsLive = competitions.sort(function (a, b) {
            return b.time.getTime() - a.time.getTime();
          });
        }
      },
      error => {
        console.log(error as string);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.compMessages != null) {
      this.compMessages.unsubscribe();
    }
    this.mqttService.disconnect();
  }

  /** Callback on_connect to queue */
  public on_connect = () => {

    // Store local reference to Observable
    // for use with template ( | async )
    // Subscribe a function to be run on_next message
    // this.userMessages = this.mqttService.userMessages;
    this.compMessages = this.mqttService.compMessages.subscribe(this.on_next);

    // this.userMessages = this.userMessages.subscribe(this.on_next);
  };

  /** Consume a message from the _mqService */
  public on_next = (message: Packet) => {
    let mqttPacket: MQTTPacket = JSON.parse(message.toString());
    if (mqttPacket.type === MQTTPacketType.TRACKING) {
      let trackingPacket: TrackingPacket = JSON.parse(message.toString());

      this.hashmap[trackingPacket.userId] = trackingPacket.totalDistance;
      console.log(this.hashmap);
    }
  };

  public on_error = () => {
    console.error('Ooops, error in HomePage');
  };
}
