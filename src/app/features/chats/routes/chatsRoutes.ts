import { Route } from "@angular/router";
import { ChatPage } from "../pages/chat-page/chat-page";
import { ChatWorkspace } from "../components/chat-workspace/chat-workspace";

export const chatsRoutes:Route[] = [
  {
    path: '',
    component: ChatPage,
    children: [
      {
        path: ':id',
        component: ChatWorkspace,
      }
    ]
  }
]
