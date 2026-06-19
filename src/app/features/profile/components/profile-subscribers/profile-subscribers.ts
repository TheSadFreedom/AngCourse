import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-subscribers',
  imports: [CommonModule],
  templateUrl: './profile-subscribers.html',
  styleUrl: './profile-subscribers.scss',
})
export class ProfileSubscribers {
  profileService = inject(ProfileService);

  page:number = 1;
  size:number = 6;

  subscribers$ = this.profileService.getMe().pipe(
    switchMap(profile =>
      this.profileService.getSubscribers(profile.id, {
        page: this.page,
        size: this.size
    })
    )
  );
}
