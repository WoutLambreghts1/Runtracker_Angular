import {Component, OnInit} from "@angular/core";
import {User} from "../../model/user";
import {EditProfileService} from "./edit-profile.service";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.css'],
  providers: [EditProfileService]
})

export class EditProfileComponent implements OnInit {
  private user;
  private errorMsg;
  private available:boolean;

  constructor(private editProfileService:EditProfileService, private auth:AuthService) {

  }

  ngOnInit():void {
    this.user = this.editProfileService.getUser().subscribe((user:User) => {
      this.user = user;
      document.getElementById(user.avatar).classList.add("img-thumbnail");
    });
    this.onUsernameChange(this.user.username);

  }

  onUsernameChange(event):void {
    if (this.user.username == "") {
      this.errorMsg = "Username can not be empty. Please enter a valid username."
    } else {
      this.editProfileService.checkUsernameAvailable(this.user.username).subscribe((val:boolean) => {
          this.available = val;
          if (!val) {
            this.errorMsg = "Username not available. Please choose another username."
          } else if (this.user.username.indexOf(".") !== -1) {
            this.errorMsg = "It's not allowed to use ' . ' in a username";
          }
          else {
            this.errorMsg = "";
          }
        }, err => console.log(err)
      );
    }
  }

  onClickUpdateUser(user:User):void {
    if (user.username != "" && this.available && this.user.username != null && !(this.user.username.indexOf(".") !== -1)) {
      this.errorMsg = "";
      this.user = this.editProfileService.updateUser(user).subscribe((user:User) => this.user = user);
    } else {
      if (user.username == "") {
        this.errorMsg = "Username can not be empty. Please enter a valid username."
      } else if (this.user.username.indexOf(".") !== -1) {
        this.errorMsg = "It's not allowed to use ' . ' in a username";
      } else {
        this.errorMsg = "Username not available. Please choose another username."
      }
    }
  }

  onClickAddAvatar(avatar) {
    document.getElementById(this.user.avatar).classList.remove("img-thumbnail");
    this.user.avatar = avatar;
    document.getElementById(avatar).classList.add("img-thumbnail");
  }

}
