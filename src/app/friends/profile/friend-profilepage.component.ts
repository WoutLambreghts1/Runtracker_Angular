import {Component, OnInit} from "@angular/core";
import {FriendProfilePageService} from "./friend-profilepage.service.ts";
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {User} from "../../model/user";
import {CoreInfo} from "../../model/coreinfo";

@Component({
  selector: 'friends-profilepage',
  templateUrl: 'friend-profilepage.component.html',
  styleUrls: ['friend-profilepage.component.css'],
  providers: [FriendProfilePageService]
})

export class FriendProfilePageComponent implements OnInit {
  private friend = new User("","","","");
  private coreInfo;

  constructor(private route: ActivatedRoute,private router: Router,private friendProfilePageService: FriendProfilePageService) {
  }

  ngOnInit(): void {
    let username = this.route.snapshot.params['username'];

    this.friendProfilePageService.getFriend(username).subscribe((friend: User) => {
      this.friend = friend;
      this.coreInfo = new CoreInfo(this.friend);
    }, err => console.error(err));
  }

  //WEGDOEN ALS CORE COMPONENT JUIST STAAT!!!
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
