import { Profile } from './../../../features/profile/models/profile.model';
import { ProfileService } from './../../../features/profile/services/profile.service';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal
} from '@angular/core';

import { ProfileAvatarComponent } from '../avatar-component/avatar-component';

@Component({
  selector: 'ui-input',
  standalone: true,
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  imports: [ProfileAvatarComponent]
})
export class UiInputComponent {

  @Input() value = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() autoResize = false;

  profileService = inject(ProfileService)
  profileId = this.profileService.me().id

  @Output() valueChange = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>();

  onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.value = textarea.value;
    this.valueChange.emit(this.value);

    if (this.autoResize) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  onSubmit() {
    const text = this.value.trim();
    if (!text) return;

    this.submit.emit(text);

    this.value = '';
    this.valueChange.emit('');
  }
}
