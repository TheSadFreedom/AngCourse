import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-preview.html',
  styleUrls: ['./profile-preview.scss']
})
export class ProfilePreviewComponent {

  @Input() profile: Profile | null = null;
  @Output() edit = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
    console.log(this.profile.avatarUrl);
  }


}
