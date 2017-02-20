import {Component, OnInit} from "@angular/core";
import {UserHomepageService} from "./user-homepage.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {CoreInfo} from "../../model/coreinfo";

@Component({
  selector: 'userHomepage',
  templateUrl: 'user-homepage.component.html',
  styleUrls: ['user-homepage.component.css'],
  providers: [UserHomepageService]
})

export class UserHomepageComponent implements OnInit {
  private user;
  private coreInfo;
  private greeting = 'Hello';

  constructor(private router: Router, private userHomepageService: UserHomepageService) {
    if (router.url.split("=").length > 1) {
      userHomepageService.storeUserTokens(router.url);
      this.router.navigateByUrl("/home");
    }

  }

  ngOnInit(): void {
    this.user = this.userHomepageService.getUser().subscribe((user: User) => {
      this.user = user;
      this.coreInfo = new CoreInfo(this.user);
    }, err => console.error(err));
    this.setGreeting();
  }


  setGreeting() {
    let now = new Date();
    if (now.getHours() < 12 && now.getHours() > 7) {
      this.greeting = 'Good morning';
    } else if (now.getHours() >= 12 && now.getHours() < 14) {
      this.greeting = 'Hello';
    } else if (now.getHours() >= 14 && now.getHours() < 19) {
      this.greeting = 'Good afternoon';
    } else if (now.getHours() >= 19 && now.getHours() < 23) {
      this.greeting = 'Good evening';
    } else {
      this.greeting = 'Goodnight';
    }
  }
}
