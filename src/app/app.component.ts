import {Component, AfterViewInit} from '@angular/core';
import {AuthService} from './authentication/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <navigation-header *ngIf="showHeader()"></navigation-header>
    <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.handleAuthentication();
  }

  // show header if it isn't the starting page
  showHeader(): boolean {
    return this.router.url != '/';
  }
}
