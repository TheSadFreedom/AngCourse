import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCard } from '../../components/profile-card/profile-card';
import { FiltersComponent } from '../../components/filters/filters-component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ProfileCard, FiltersComponent],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit {

  private searchService = inject(SearchService);

  profiles = this.searchService.profiles;

  ngOnInit(): void {
    this.searchService.getTestAccounts().subscribe(res => {
      this.searchService.setProfiles(res);
    });
  }
}
