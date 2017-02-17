import {Component} from "@angular/core";
import {UserHomepageService} from "./user-homepage.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'userHomepage',
  templateUrl: 'user-homepage.component.html',
  styleUrls: ['user-homepage.component.css'],
  providers: [UserHomepageService]
})

export class UserHomepageComponent {
  private user;

  constructor(private router: Router, private userHomepageService: UserHomepageService) {
    if(router.url.split("=").length > 1){
      userHomepageService.storeUserTokens(router.url);
      this.router.navigateByUrl("/home");
    }

  }

  ngOnInit(): void {
    this.user = this.userHomepageService.getUser().subscribe((user: User) => this.user = user, err => console.error(err));
  }
}
