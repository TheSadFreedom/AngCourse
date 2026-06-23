import { Component, input } from '@angular/core';
import { LastMessageRes } from '../../../models/chats.model';
import { ProfileAvatarComponent } from "../../../../../core/ui/avatar-component/avatar-component";

@Component({
  selector: 'app-chat-btn',
  imports: [ProfileAvatarComponent],
  templateUrl: './chat-btn.html',
  styleUrl: './chat-btn.scss',
})
export class ChatBtn {
  chat = input<LastMessageRes>()
}
