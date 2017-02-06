import {Component, OnInit} from '@angular/core';
import {AuthService} from "./authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'test',
  template: `<div>you logged in bro!</div>
  <button
    type="button"
    class="btn btn-default btn-primary"
    (click)="auth.logout()">
    Log out
  </button>`
})
export class SuccesLoginComponent implements OnInit{

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()){
      this.router.navigate(['']);
    }
  }
}
