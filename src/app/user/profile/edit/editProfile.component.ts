import {Component, OnInit} from "@angular/core";
import {EditProfileService} from "../editProfile.service";
import {Profile} from "../Profile";

@Component({
  selector: 'editProfile',
  templateUrl: 'editProfile.component.html',
  styleUrls: ['editProfile.component.css']
})

export class EditProfileComponent{
  private testUser: Profile = {
    firstname: 'Jan',
    lastname: 'Janssens',
    city: 'Antwerpen',
    birthday: new Date(1980, 9, 22),
    username: 'JJ_123',
    gender: 0,
    address: 'Nationalstraat 5'
  };
  constructor(private editProfileService: EditProfileService){}

}
