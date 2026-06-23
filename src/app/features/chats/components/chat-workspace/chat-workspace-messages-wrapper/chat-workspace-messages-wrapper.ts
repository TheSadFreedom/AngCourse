import {
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  input,
  viewChild
} from '@angular/core';

import { ChatService } from '../../../services/chat-service';
import { Message } from '../../../models/chats.model';
import { ChatMessage } from './chat-message/chat-message';

type DateGroup = {
  label: string;
  messages: Message[];
};

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatMessage],
  templateUrl: './chat-workspace-messages-wrapper.html',
  styleUrl: './chat-workspace-messages-wrapper.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {

  chatsService = inject(ChatService);

  chatId = input.required<number>();

  messages = this.chatsService.activeChatMessages;

  // 👇 контейнер скролла
  container = viewChild<ElementRef<HTMLElement>>('scrollContainer');

  groupedMessages = computed<DateGroup[]>(() => {

    const sorted = [...this.messages()].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    );

    const groups: DateGroup[] = [];

    for (const msg of sorted) {

      const label = this.getDateLabel(msg.createdAt);

      const last = groups[groups.length - 1];

      if (last?.label === label) {
        last.messages.push(msg);
      } else {
        groups.push({
          label,
          messages: [msg]
        });
      }
    }

    return groups;
  });

  constructor() {
    effect(() => {
      // триггерится при любом изменении messages()
      this.messages();

      queueMicrotask(() => {
        this.scrollToBottom();
      });
    });
  }

  private scrollToBottom(): void {
    const el = this.container()?.nativeElement;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }

  private getDateLabel(dateStr: string): string {

    const date = new Date(dateStr);
    const now = new Date();

    const isToday =
      date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      date.toDateString() === yesterday.toDateString();

    if (isToday) return 'Сегодня';
    if (isYesterday) return 'Вчера';

    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  }
}
