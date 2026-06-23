import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';

import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview';
import { ProfileFormComponent } from '../../components/profile-form/profile-form';
import { ProfileSubscribers } from "../../components/profile-subscribers/profile-subscribers";
import { PostFeedComponent } from "../../components/post-feed/post-feed.component";
import { ProfileDescription } from "../../components/profile-description/profile-description";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ProfilePreviewComponent,
    ProfileFormComponent,
    ProfileSubscribers,
    PostFeedComponent,
    ProfileDescription
],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.scss']
})
export class ProfilePage implements OnInit {

  private profileService = inject(ProfileService);

  profile = signal<Profile | null>(null);
  isEditMode = signal(false);

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getMe().subscribe(profile => {
      this.profile.set(profile);
    });
  }

  openEdit() {
    this.isEditMode.set(true);
  }

  closeEdit() {
    this.isEditMode.set(false);
  }

  onProfileSaved(profile: Profile) {
    this.profile.set(profile);
  }

  onAvatarSelected(file: File) {
    this.profileService.uploadAvatar(file).subscribe(() => {
      this.loadProfile();
    });
  }
}
