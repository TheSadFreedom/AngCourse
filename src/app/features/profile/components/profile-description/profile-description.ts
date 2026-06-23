import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'profile-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-description.html',
  styleUrls: ['./profile-description.scss'],
})
export class ProfileDescription {

  private profileService = inject(ProfileService);

  profile$ = this.profileService.getMe();
}
