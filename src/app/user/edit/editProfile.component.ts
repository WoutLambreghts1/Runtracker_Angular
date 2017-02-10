import {Component, OnInit} from "@angular/core";
import {User} from "./../../model/user";
import {EditProfileService} from "./editProfile.service";

@Component({
  selector: 'editProfile',
  templateUrl: 'editProfile.component.html',
  styleUrls: ['editProfile.component.css'],
  providers: [EditProfileService]
})

export class EditProfileComponent{
/*
  private user: User = {
    avgDistance:0,
    avgSpeed:0,
    birthday:new Date(Date.now()),
    city:'Antwerp',
    competitionsCreated:null,
    competitionsRun:null,
    competitionsWon:null,
    firstname:'Jan',
    friends:null,
    gender:0,
    lastname:'Jansens',
    maxDistance:0,
    maxSpeed:0,
    nrOfCompetitionsWon:0,
    ranMarathon:false,
    ranTenKm:false,
    ranTwentyKm:false,
    totalDistance:0,
    trackings:null,
    userId:123,
    username:'JJ123'
  };

  */
  private user;
  ngOnInit(): void{
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);
  }
  constructor(private editProfileService: EditProfileService){}

}
