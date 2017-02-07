import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AUTH_PROVIDERS} from 'angular2-jwt';
import {AuthService} from "./authentication/auth.service";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {LoginComponent} from "./homepage/login.component";
import {HomePageComponent} from "./homepage/homepage.component";
import {PageNotFoundComponent} from "./PageNotFound.component";

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomePageComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
