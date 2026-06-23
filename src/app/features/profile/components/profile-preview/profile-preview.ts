import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile.model';
import { ProfileAvatarComponent } from "../../../../core/ui/avatar-component/avatar-component";

@Component({
  selector: 'app-profile-preview',
  standalone: true,
  imports: [CommonModule, ProfileAvatarComponent],
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
