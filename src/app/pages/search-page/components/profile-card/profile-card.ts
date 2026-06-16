import { Component, Input } from '@angular/core';
import { ImageUrlPipe } from '../../pipes/image-url-pipe';
import { ProfileInterface } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-profile-card',
  imports: [ImageUrlPipe],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',

})
export class ProfileCard {
  @Input() profile!: ProfileInterface;
}
