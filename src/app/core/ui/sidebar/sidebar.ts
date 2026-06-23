import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShortSubscriberList } from './components/short-subscriber-list/short-subscriber-list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, ShortSubscriberList, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {

  menuItems = [
    { label: 'Моя страница', link: '/profile/me' },
    { label: 'Чаты', link: '/chats' },
    { label: 'Поиск', link: '/search' },
  ];
}
