import {Component, Input, OnInit} from "@angular/core";
import {CoreInfo} from "../../model/coreinfo";

@Component({
  selector: 'core-info',
  templateUrl: 'core-info.component.html',
  styleUrls: ['core-info.component.css']
})

export class CoreInfoComponent {
  @Input() coreInfo: CoreInfo;

  setTrophies(hasTrophy: boolean) {
    if (hasTrophy) {
      return {
        'color': '#fae157',
      };
    } else {
      return {
        'color': 'lightgray',
      };
    }
  }
}
