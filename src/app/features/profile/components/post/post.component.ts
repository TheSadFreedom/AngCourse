import { Component, inject, input, signal, OnInit } from '@angular/core';

import { Post, PostComment } from '../../models/post.model';
import { PostService } from '../../services/post-service';
import { ProfileService } from '../../services/profile.service';

import { CommentComponent } from './comment/comment.component';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago-pipe-pipe';
import { UiInputComponent } from '../../../../core/ui/input/ui-input.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommentComponent,
    TimeAgoPipe,
    UiInputComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  post = input.required<Post>();

  private postService = inject(PostService);
  private profileService = inject(ProfileService);

  comments = signal<PostComment[]>([]);

  ngOnInit() {
    this.comments.set(this.post().comments ?? []);
  }

  onCreateComment(text: string) {
    const profile = this.profileService.me();

    if (!profile) return;

    this.postService.createComment({
      text: text,
      authorId: profile.id,
      postId: this.post().id
    })
    .subscribe(comment => {
      this.comments.update(comments => [
        ...comments,
        comment
      ]);
    });
  }
}
