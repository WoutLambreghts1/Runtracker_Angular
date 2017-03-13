import {Injectable} from '@angular/core';

import {Config} from './config';
import {BACKEND_BASEURL} from "../../globals";
import {Headers, Http, HttpModule} from "@angular/http";

/**
 * An injected class which grabs the application
 * config variables (e.g. MQ  credentials)
 * for the user application.
 *
 * This makes an AJAX request to the server
 * api containing some user token and secret
 *
 * @type ConfigService
 */
@Injectable()
export class ConfigService {

  // TODO: Provide a user object to the constructor
  //       to allow retrieval of per-user configs
  //       or from a specific URL.
  private jwt = localStorage.getItem('id_token');
  private authHeader = new Headers();

  constructor(private http: Http) {
    if (this.jwt) {
      this.authHeader.append('token', this.jwt);
    }
  }

  /** Make an https request for a config file, and
   * returns a Promise for its resolution.
   *
   * @return {Promise<Config>}
   */
  public getConfig(): Promise<Config> {
    return this.http.get(BACKEND_BASEURL + "/api/mqtt/getConfig", {
      headers: this.authHeader
    })
      .map(res => res.json())
      .toPromise();
  }

  /** Make an https request for a config file, and
   * returns a Promise for its resolution.
   *
   * @return {Promise<Config>}
   */
  public getConfigWithCompTopic(compId: number): Promise<Config> {
    return this.http.get(BACKEND_BASEURL + "/api/mqtt/getConfig/" + compId, {
      headers: this.authHeader
    })
      .map(res => res.json())
      .toPromise();
  }
}
