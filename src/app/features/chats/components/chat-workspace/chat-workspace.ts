import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { ChatWorkspaceHeader } from './chat-workspace-header/chat-workspace-header';
import { ProfileService } from '../../../profile/services/profile.service';
import { ChatService } from '../../services/chat-service';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper';
import { UiInputComponent } from '../../../../core/ui/input/ui-input.component';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeader,
    AsyncPipe,
    ChatWorkspaceMessagesWrapperComponent,
    UiInputComponent
  ],
  templateUrl: './chat-workspace.html',
  styleUrl: './chat-workspace.scss'
})
export class ChatWorkspace {

  route = inject(ActivatedRoute);
  chatsService = inject(ChatService);

  chatMeta$ = this.route.params.pipe(
    switchMap(({ id }) =>
      this.chatsService.startChatPolling(+id)
    )
  );

  onSendMessage(chatId: number, text: string) {
    this.chatsService.sendMessage(chatId, text)
      .pipe(
        tap(() => {
          // оптимистичное обновление НЕ нужно — polling всё обновит
        })
      )
      .subscribe();
  }
}
