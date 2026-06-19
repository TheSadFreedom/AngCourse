import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { debounceTime, switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filters-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.scss',
})
export class FiltersComponent {

  fb = inject(FormBuilder);
  private searchService = inject(SearchService);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  });

  constructor() {
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      switchMap(formValue =>
        this.searchService.filterProfiles(formValue)
      ),
      takeUntilDestroyed()
    )
    .subscribe(res => {
      this.searchService.setProfiles(res.items);
    });
  }
}
