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
  private user;
  ngOnInit(): void{
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);
  }
  onClickUpdateUser(user:User): void{
    this.user = this.editProfileService.updateUser(user).subscribe((user: User) => this.user = user);
  }

  constructor(private editProfileService: EditProfileService){}

}
