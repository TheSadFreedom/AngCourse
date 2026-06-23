import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { switchMap, filter } from 'rxjs';
import { SubscribersService } from '../../../../../features/subscribers/services/subscribers.service';
import { ProfileService } from '../../../../../features/profile/services/profile.service';

@Component({
  selector: 'app-short-subscriber-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './short-subscriber-list.html',
  styleUrl: './short-subscriber-list.scss',
})
export class ShortSubscriberList {

  private profileService = inject(ProfileService);
  private subscribersService = inject(SubscribersService);

  page = 1;
  size = 3;

  subscribers$ = this.profileService.getMe().pipe(
    switchMap(profile =>
      this.subscribersService.getSubscribers(profile.id, {
        page: this.page,
        size: this.size
      })
    )
  );
}
