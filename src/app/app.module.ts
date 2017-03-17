import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AUTH_PROVIDERS} from 'angular2-jwt';
import {AuthService} from "./authentication/auth.service";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {LoginComponent} from "./homepage/login/login.component";
import {HomePageComponent} from "./homepage/homepage.component";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./homepage/header/header.component";
import {MQTTService} from "./mqtt/mqtt.service";
import {ConfigService} from "./mqtt/config/config.service";
import {AuthGuard} from "./authentication/authguard";

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomePageComponent, HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    MQTTService,
    ConfigService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
