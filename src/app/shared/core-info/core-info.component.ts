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
        'background': 'gold',
        'border': '2px solid darkgoldenrod',
      };
    } else {
      return {
        'background': 'lightgray',
        'border': '2px solid gray',
      };
    }
  }
}
