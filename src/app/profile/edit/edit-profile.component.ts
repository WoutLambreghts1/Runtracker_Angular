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

export class EditProfileComponent implements OnInit{
  private user;
  private errorMsg;
  private available: boolean;
  private pictureURL: string;

  ngOnInit(): void {
    this.user = this.editProfileService.getUser().subscribe((user: User) => this.user = user);
    this.onUsernameChange(this.user.username);
    this.pictureURL = JSON.parse(localStorage.getItem("profile")).picture;
  }

  onUsernameChange(event): void {
    if (this.user.username == "") {
      this.errorMsg = "Username can not be empty. Please enter a valid username."
    } else {
      this.editProfileService.checkUsernameAvailable(this.user.username).subscribe((val: boolean) => {
          this.available = val;
          if (!val) {
            this.errorMsg = "Username not available. Please choose another username."
          } else {
            this.errorMsg = "";
          }
        }, err => console.log(err)
      );
    }
  }

  onClickUpdateUser(user: User): void {
    if (user.username != "" && this.available) {
      this.errorMsg = "";
      this.user = this.editProfileService.updateUser(user).subscribe((user: User) => this.user = user);
    } else {
      if (user.username == "") {
        this.errorMsg = "Username can not be empty. Please enter a valid username."
      } else {
        this.errorMsg = "Username not available. Please choose another username."
      }
    }
  }

  constructor(private editProfileService: EditProfileService, private auth: AuthService) {

  }

}
