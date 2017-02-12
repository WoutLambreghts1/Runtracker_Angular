import {Component, OnInit} from "@angular/core";
import {User} from "./../../model/user";
import {EditProfileService} from "./editProfile.service";
import {timeout} from "rxjs/operator/timeout";

@Component({
  selector: 'editProfile',
  templateUrl: 'editProfile.component.html',
  styleUrls: ['editProfile.component.css'],
  providers: [EditProfileService]
})

export class EditProfileComponent{
  private user;
  private errorMsg;

  ngOnInit(): void{
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);
  }
  onClickUpdateUser(user:User): void{
    if(user.username != ""){
      this.errorMsg = "";
      this.user = this.editProfileService.updateUser(user).subscribe((user: User) => this.user = user);
    }else {
      if(user.username == ""){
        this.errorMsg="Username can not be empty. Please enter a valid username."
      }
    }
  }

  constructor(private editProfileService: EditProfileService){}

}
