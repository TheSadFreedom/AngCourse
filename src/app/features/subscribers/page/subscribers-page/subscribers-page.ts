import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersService } from '../../services/subscribers.service.ts';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribers-page.html'
})
export class SubscribersPage {

  private service = inject(SubscribersService);

  accountId = 1;

  subscribers$ = this.service.getSubscribers(this.accountId);
}
