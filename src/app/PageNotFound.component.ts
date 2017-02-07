import {Component} from "@angular/core";

@Component({
  selector: 'page-not-found',
  template: `
    <div>
      <h3>You are lost!</h3>
      <p>Oops, it seems you are not where you want to be. Try going back to the <a routerLink="">start</a></p>
    </div>`,
})

export class PageNotFoundComponent{

}
