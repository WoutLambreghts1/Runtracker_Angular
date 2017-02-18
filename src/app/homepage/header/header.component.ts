import {Component} from "@angular/core";
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'navigation-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent{
  constructor(private router: Router, private auth: AuthService){}
}
