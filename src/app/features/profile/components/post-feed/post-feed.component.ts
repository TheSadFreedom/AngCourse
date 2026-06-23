import { Component, inject } from '@angular/core';

import { UiInputComponent } from '../../../../core/ui/input/ui-input.component';
import { PostComponent } from '../post/post.component';

import { PostService } from '../../services/post-service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    UiInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {

  private postService = inject(PostService);
  private profileService = inject(ProfileService);

  feed = this.postService.posts;

  constructor() {
    this.postService.loadPosts().subscribe();
  }

  onCreatePost(text: string) {
    const profile = this.profileService.me();

    if (!profile) return;

    this.postService.createPost({
      title: 'Клевый пост',
      content: text,
      authorId: profile.id
    }).subscribe(post => {
      this.postService.posts.update(posts => [post, ...posts]);
    });
  }
}
