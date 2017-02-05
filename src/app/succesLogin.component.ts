import { Component } from '@angular/core';
import {Auth} from "./authentication/auth.service";

@Component({
  selector: 'test',
  template: `<div *ngIf="auth.isAuthenticated()">you logged in bro!</div>
  <button
    type="button"
    class="btn btn-default btn-primary"
    (click)="auth.logout()">
    Log out
  </button>`
})
export class SuccesLoginComponent {
  constructor(private auth: Auth) {}
}
