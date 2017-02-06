import {Component} from '@angular/core';
import {AuthService} from './authentication/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService) {
    this.auth.handleAuthentication();
  }
}
