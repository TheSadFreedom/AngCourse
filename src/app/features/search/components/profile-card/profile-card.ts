import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../../profile/models/profile.model';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url-pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './profile-card.html',
  styleUrls: ['./profile-card.scss'],
})
export class ProfileCard {
  @Input() profile!: Profile;
}
