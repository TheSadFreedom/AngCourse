import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import {
  CommentCreateDto,
  Post,
  PostComment,
  PostCreateDto
} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private http = inject(HttpClient);

  private baseApiUrl = 'https://icherniakov.ru/yt-course/';

  readonly posts = signal<Post[]>([]);

  loadPosts() {
    return this.http.get<Post[]>(`${this.baseApiUrl}post/`).pipe(
      tap(posts => this.posts.set(posts))
    );
  }

  createPost(payload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      tap(() => {
        this.loadPosts().subscribe();
      }),
    );
  }

  createComment(payload: CommentCreateDto) {
    return this.http.post<PostComment>(
      `${this.baseApiUrl}comment/`,
      payload
    );
  }

  getCommentsByPostId(postId: number) {
    return this.http.get<Post>(`${this.baseApiUrl}post/${postId}`).pipe(
      map(res => res.comments)
    );
  }
}
