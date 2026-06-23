import { Component, Input, OnChanges, inject, signal } from '@angular/core';
import { AvatarService } from './services/avatar-service';

@Component({
  selector: 'avatar-component',
  standalone: true,
  templateUrl: './avatar-component.html',
  styleUrl: './avatar-component.scss'
})
export class ProfileAvatarComponent implements OnChanges {

  @Input() profileId: number;

  @Input() width = 40;
  @Input() height = 40;

  private avatarService = inject(AvatarService);

  private avatarUrl = signal<string | null>(null);

  ngOnChanges(): void {
    if (!this.profileId) return;

    this.avatarService.getProfile(this.profileId)
      .subscribe(profile => {
        this.avatarUrl.set(profile.avatarUrl);
      });
  }

  getSrc(): string {
    const url = this.avatarUrl();

    if (!url) return '/assets/svg/account_circle.svg';

    if (url.startsWith('http')) return url;

    return `https://icherniakov.ru/yt-course/${url.replace(/^\/+/, '')}`;
  }
}
