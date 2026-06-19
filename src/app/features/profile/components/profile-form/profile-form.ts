import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { ProfileUpload } from '../profile-upload/profile-upload';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProfileUpload],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.scss']
})
export class ProfileFormComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Profile>();

  private profileService = inject(ProfileService);

  profile: Profile | null = null;

  selectedAvatar: File | null = null;

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', [Validators.required]),
    stack: new FormControl(''),
  });

  ngOnInit() {
    this.profileService.getMe().subscribe(profile => {
      this.profile = profile;
      this.patchForm(profile);
    });
  }

  onAvatarSelected(file: File) {
    this.selectedAvatar = file;
  }

  private patchForm(profile: Profile) {
    this.form.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      description: profile.description,
      stack: Array.isArray(profile.stack)
        ? profile.stack.join(', ')
        : profile.stack ?? ''
    });
  }

  onSave() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const payload = {
      ...raw,
      stack: raw.stack
        ? raw.stack.split(',').map(s => s.trim())
        : []
    };

    this.profileService.patchProfile(payload)
      .subscribe(profile => {

        // upload avatar если есть
        if (this.selectedAvatar) {
          this.profileService.uploaderAvatar(this.selectedAvatar)
            .subscribe();
        }

        this.saved.emit(profile);
        this.close.emit();
      });
  }

  onClose() {
    this.close.emit();
  }
}
