import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    const date = new Date(value).getTime();
    if (isNaN(date)) return '';

    const now = Date.now() - 5 * 60 * 60 * 1000;
    const diffMs = now - date;
    const seconds = Math.floor(diffMs / 1000);

    if (seconds < 10) return 'только что';
    if (seconds < 60) return 'меньше минуты назад';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} мин. назад`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч. назад`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} дн. назад`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} мес. назад`;

    const years = Math.floor(months / 12);
    return `${years} г. назад`;
  }
}
