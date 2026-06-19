import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-profile-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-description.html',
  styleUrls: ['./profile-description.scss'],
})
export class ProfileDescription {

  private profileService = inject(ProfileService);

  page: number = 1;
  size: number = 3;

  profSubscribers$ = this.profileService.getMe().pipe(
    switchMap(profile =>
      this.profileService.getSubscribers(profile.id, {
        page: this.page,
        size: this.size
      })
    )
  );
}
