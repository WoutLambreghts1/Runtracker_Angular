import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AUTH_PROVIDERS} from 'angular2-jwt';
import {Auth} from "./authentication/auth.service";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {LoginComponent} from "./authentication/login.component";
import {SuccesLoginComponent} from "./succesLogin.component";

@NgModule({
  declarations: [
    AppComponent, LoginComponent, SuccesLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AUTH_PROVIDERS,
    Auth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
