import { ProfileService } from './../../../profile/services/profile.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribers-page.html'
})
export class SubscribersPage {

  private service = inject(SubscribersService);
  private profileService = inject(ProfileService);

  profile = this.profileService.me();
  profileId = this.profile.id;

  subscribers$ = this.service.getSubscribers(this.profileId);
}
