import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatList } from "../../components/chat-list/chat-list";

@Component({
  selector: 'app-chat-page',
  imports: [RouterOutlet, ChatList],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
})
export class ChatPage {}
