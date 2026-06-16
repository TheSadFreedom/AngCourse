import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProfileInterface } from './interfaces/profile.interface';
import { ProfileService } from './services/profile-service';
import { ProfileCard } from './components/profile-card/profile-card';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ProfileCard],
  templateUrl: './search-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private profileService = inject(ProfileService);

  profiles = toSignal(this.profileService.getTestAccounts(), {
    initialValue: [] as ProfileInterface[]
  });
}
