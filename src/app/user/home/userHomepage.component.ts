import {Component} from "@angular/core";
import {AuthService} from "../../authentication/auth.service.ts";
import {UserHomepageService} from "./userHomepage.service.ts";
import {User} from "../../model/user";

@Component({
  selector: 'userHomepage',
  templateUrl: 'userHomepage.component.html',
  styleUrls: ['userHomepage.component.css'],
  providers: [UserHomepageService]
  })

export class UserHomepageComponent {
  private user;
  constructor(private auth: AuthService,private userHomepageService: UserHomepageService){
  }

  ngOnInit(): void{
    this.user = this.userHomepageService.getUser().subscribe((user: User) => this.user = user);
    }
}
