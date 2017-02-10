import {Component, OnInit} from "@angular/core";
import {AuthService} from "../authentication/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'userHomepage',
  templateUrl: 'userHomepage.component.html',
  styleUrls: ['userHomepage.component.css']
})

export class UserHomepageComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    let urlString: string = router.url;
    console.log(router.url);
    console.log(urlString.split('=')[1].split('&')[0]);
    console.log(urlString.split('=')[5]);
    localStorage.setItem('access_token', urlString.split('=')[1].split('&')[0]);
    localStorage.setItem('id_token', urlString.split('=')[5]);
  }

  ngOnInit(): void {
    console.log(this.auth.isAuthenticated());
  }
}
