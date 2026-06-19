import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileCard } from '../../components/profile-card/profile-card';
import { ProfileService } from '../../../profile/services/profile.service';
import { Profile } from '../../../profile/models/profile.model';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ProfileCard],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {

  private profileService = inject(ProfileService);

  // signal из Observable
  profiles = toSignal(
    this.profileService.getTestAccounts(),
    {
      initialValue: [] as Profile[]
    }
  );
}
