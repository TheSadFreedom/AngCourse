import {
  Component,
  OnInit,
  inject,
  signal,
  EventEmitter,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { DragonDrop } from '../../../../shared/directives/dragon-drop';

@Component({
  selector: 'app-profile-upload',
  standalone: true,
  imports: [CommonModule, DragonDrop],
  templateUrl: './profile-upload.html',
  styleUrl: './profile-upload.scss',
})
export class ProfileUpload implements OnInit {

  @Output() fileSelected = new EventEmitter<File>();

  private profileService = inject(ProfileService);

  // preview (может быть: blob или null)
  preview = signal<string | null>(null);

  // серверный аватар
  profileImg: string | null = null;

  ngOnInit(): void {
    this.profileService.getMe().subscribe(profile => {
      this.profileImg = profile.avatarUrl;
    });
  }

  fileBrowserHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.handleFile(file);
  }

  onFileDropped(file: File | null): void {
    if (!file) return;

    this.handleFile(file);
  }

  private handleFile(file: File): void {
    if (!file.type.startsWith('image/')) return;

    const url = URL.createObjectURL(file);

    this.preview.set(url);

    this.fileSelected.emit(file);
  }
}
