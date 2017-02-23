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
      this.friend.gender = this.friend.gender.toLowerCase();
      this.coreInfo = new CoreInfo(this.friend);
    }, err => console.error(err));
  }
}
