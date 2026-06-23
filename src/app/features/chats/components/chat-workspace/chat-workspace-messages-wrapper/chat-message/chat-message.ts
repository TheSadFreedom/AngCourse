import { Component, HostBinding, input } from '@angular/core';
import { Message } from '../../../../models/chats.model';
import { DatePipe } from '@angular/common';
import { ProfileAvatarComponent } from '../../../../../../core/ui/avatar-component/avatar-component';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [DatePipe, ProfileAvatarComponent],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss',
})
export class ChatMessage {

  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
