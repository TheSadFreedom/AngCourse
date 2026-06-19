import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../features/profile/services/profile.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-short-subscriber-list',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './short-subscriber-list.html',
  styleUrl: './short-subscriber-list.scss',
})
export class ShortSubscriberList {
  profileService = inject(ProfileService);

  page:number = 1;
  size:number = 3;

  subscribers$ = this.profileService.getMe().pipe(
    switchMap(profile =>
      this.profileService.getSubscribers(profile.id, {
        page: this.page,
        size: this.size
    })
    )
  );
}
