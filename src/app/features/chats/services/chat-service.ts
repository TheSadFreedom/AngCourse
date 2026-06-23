import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../profile/services/profile.service';
import { Chat, LastMessageRes, Message } from '../models/chats.model';
import { map, shareReplay, switchMap, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {

  http = inject(HttpClient);
  profileService = inject(ProfileService);

  me = this.profileService.me;

  activeChatMessages = signal<Message[]>([]);

  private baseApiUrl = 'https://icherniakov.ru/yt-course/';
  private chatsUrl = `${this.baseApiUrl}chat/`;
  private messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(
      `${this.chatsUrl}get_my_chats/`
    ).pipe(
      shareReplay(1)
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: { message }
      }
    );
  }

  /**
   * ⚠️ ВАЖНО:
   * createdAt остаётся string (как в модели Message)
   * +5 часов применяется только для отображаемого значения
   */
  private addHours(date: string, hours: number): string {
    const d = new Date(date);
    d.setHours(d.getHours() + hours);
    return d.toISOString();
  }

  startChatPolling(chatId: number) {
    return timer(0, 3000).pipe(
      switchMap(() =>
        this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
      ),
      map(chat => {

        const meId = this.me()?.id;

        const patchedMessages: Message[] = chat.messages.map(message => ({
          ...message,

          // +5 часов, но всё ещё string (совместимо с Message)
          createdAt: this.addHours(message.createdAt, 5),

          user: chat.userFirst.id === message.userFromId
            ? chat.userFirst
            : chat.userSecond,

          isMine: message.userFromId === meId
        }));

        this.activeChatMessages.set(patchedMessages);

        return {
          id: chat.id,
          companion: chat.userFirst.id === meId
            ? chat.userSecond
            : chat.userFirst
        };
      })
    );
  }
}
