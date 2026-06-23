import {Component, input} from '@angular/core';
import { PostComment } from '../../../models/post.model';
import { TimeAgoPipe } from "../../../../../shared/pipes/time-ago-pipe-pipe";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    TimeAgoPipe
],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<PostComment>()
}
