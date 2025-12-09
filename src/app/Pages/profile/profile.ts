import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ProfileTabs } from "./profile-tabs/profile-tabs";
import { ProfileHeader } from "./profile-header/profile-header";

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [RouterModule, ProfileTabs, ProfileHeader],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

}
