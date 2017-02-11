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
    this.userHomepageService.getUser().subscribe((user: User) => this.user = user)
    this.user =
    {
      "userId":0,
      "username": "New user",
      "firstname": "",
      "lastname": "",
      "gender": "UNDEFINED",
      "city": "",
      "birthday": null,
      "friends": [],
      "competitionsCreated": [],
      "trackings": [],
      "competitionsWon": [],
      "competitionsRun": [],
      "maxSpeed": 0,
      "avgSpeed": 0,
      "maxDistance": 0,
      "avgDistance": 0,
      "totalDistance": 0,
      "ranTenKm": false,
      "ranTwentyKm": false,
      "ranMarathon": false,
      "nrOfCompetitionsWon": 0
    };
    //Fails if token is already in use
    this.userHomepageService.createUser(this.user).subscribe((user: User) => console.log('user created'));

    }
}
