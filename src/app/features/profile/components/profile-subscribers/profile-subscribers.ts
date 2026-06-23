import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

import { ProfileService } from '../../services/profile.service';
import { SubscribersService } from '../../../subscribers/services/subscribers.service';

@Component({
  selector: 'app-profile-subscribers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-subscribers.html',
  styleUrl: './profile-subscribers.scss',
})
export class ProfileSubscribers {

  private profileService = inject(ProfileService);
  private subscribersService = inject(SubscribersService);

  page = 1;
  size = 6;

  subscribers$ = this.profileService.getMe().pipe(
    switchMap(profile =>
      this.subscribersService.getSubscribers(profile.id, {
        page: this.page,
        size: this.size
      })
    )
  );
}
