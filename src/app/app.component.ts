import {Component} from '@angular/core';
import {Auth} from './authentication/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Test App component</h1>
    <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: Auth) {
    this.auth.handleAuthentication();
  }
}
