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
  private errorMsg;
  private available: boolean;

  ngOnInit(): void{
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);
    this.onUsernameChange(this.user.username);
  }
  onUsernameChange(username:string): void{
    this.editProfileService.checkUsernameAvailable(username).subscribe((val:boolean) => this.available = val);
  }

  onClickUpdateUser(user:User): void{
    console.log(this.available);
    if(user.username != "" && this.available){
      this.errorMsg = "";
      this.user = this.editProfileService.updateUser(user).subscribe((user: User) => this.user = user);
    }else {
      if(user.username == ""){
        this.errorMsg="Username can not be empty. Please enter a valid username."
      }else{
        this.errorMsg="Username not available. Please choose another username."
      }
    }
  }

  constructor(private editProfileService: EditProfileService){}

}
