import {Component} from "@angular/core";
import {UserHomepageService} from "./userHomepage.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'userHomepage',
  templateUrl: 'userHomepage.component.html',
  styleUrls: ['userHomepage.component.css'],
  providers: [UserHomepageService]
})

export class UserHomepageComponent {
  private user;

  constructor(private auth: AuthService, private router: Router, private userHomepageService: UserHomepageService) {
    console.log(router.url.split("=").length);
    if(router.url.split("=").length > 1){
      userHomepageService.storeUserTokens(router.url);
    }

  }

  ngOnInit(): void {
    this.user = this.userHomepageService.getUser().subscribe((user: User) => this.user = user, err => console.error(err));
  }
}
