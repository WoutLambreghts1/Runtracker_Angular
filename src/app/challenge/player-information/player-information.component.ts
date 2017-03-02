import {Component, Input, ViewChild, ElementRef, OnInit} from "@angular/core";
import {User} from "../../model/user";


import { AgmCoreModule } from 'angular2-google-maps/core';
import {SebmGoogleMap} from "angular2-google-maps/esm/core/directives/google-map";

@Component({
  selector: 'player-information',
  templateUrl: 'player-information.component.html',
  styleUrls: ['player-information.component.css']
})

export class PlayerInfoComponent{

  @Input() player: User;
  @Input() lat: number;
  @Input() lng: number;
  
}
