import { Component, input } from '@angular/core';
import { Profile } from '../../../../profile/models/profile.model';
import { ProfileAvatarComponent } from "../../../../../core/ui/avatar-component/avatar-component";

@Component({
  selector: 'app-chat-workspace-header',
  imports: [ProfileAvatarComponent],
  templateUrl: './chat-workspace-header.html',
  styleUrl: './chat-workspace-header.scss',
})
export class ChatWorkspaceHeader {
  profile = input.required<Profile>()
}
