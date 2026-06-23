import { Component, inject } from '@angular/core';
import { ChatBtn } from "./chat-btn/chat-btn";
import { ChatService } from '../../services/chat-service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  imports: [
    ChatBtn,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.scss',
})
export class ChatList {
  chatsService = inject(ChatService)

  filterChatsControl = new FormControl('')

  chats$ = this.chatsService.getMyChats()
    .pipe(
      switchMap(chats => {
        return this.filterChatsControl.valueChanges
          .pipe(
            startWith(''),
            map(inputValue => {
              return chats.filter(chat => {
                return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
              })
            })
          )
      })
    )
}
