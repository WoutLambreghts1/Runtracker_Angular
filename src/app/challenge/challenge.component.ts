import {Component, OnInit} from "@angular/core";
import {User} from "./../../model/user";
import {EditProfileService, ChallengeService} from "./challenge.service";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.css'],
  providers: [EditProfileService]
})

export class EditProfileComponent{
  
  constructor(private challengeService: ChallengeService,private auth:AuthService){

  }

}
