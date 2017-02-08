import {Component} from "@angular/core";
import {AuthService} from "../authentication/auth.service";

@Component({
  selector: 'userHomepage',
  templateUrl: 'userHomepage.component.html',
  styleUrls: ['userHomepage.component.css']
  })

export class UserHomepageComponent {
  constructor(private auth: AuthService){}
}
