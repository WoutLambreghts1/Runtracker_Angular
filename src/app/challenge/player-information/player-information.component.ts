import {Component, Input} from "@angular/core";
import {User} from "../../model/user";

@Component({
  selector: 'player-information',
  templateUrl: 'player-information.component.html',
  styleUrls: ['player-information.component.css']
})

export class PlayerInfoComponent{
  @Input() player: User;
}
