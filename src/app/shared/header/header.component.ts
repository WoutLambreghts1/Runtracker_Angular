import {Component} from "@angular/core";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'navigation-header',
  templateUrl: 'header.component.html'
})

export class HeaderComponent{
  constructor(private auth: AuthService){}
}
