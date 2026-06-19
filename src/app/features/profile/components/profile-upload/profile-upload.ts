import {
  Component,
  OnInit,
  inject,
  signal,
  Output,
  EventEmitter
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

  profileImg: string | null = null;
  preview = signal<string | null>(null);

  ngOnInit() {
    this.profileService.getMe().subscribe(profile => {
      this.profileImg = profile.avatarUrl;
    });
  }

  fileBrowserHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.handleFile(file);
  }

  onFileDropped(file: File | null) {
    if (!file) return;
    this.handleFile(file);
  }

  private handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.preview.set(result);
      }
    };

    reader.readAsDataURL(file);

    this.fileSelected.emit(file);
  }
}
