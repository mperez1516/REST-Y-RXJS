import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class DummyApiService {

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<User | null> {
    return this.http.get<any>(`https://dummyjson.com/users/filter?key=username&value=${username}`).pipe(
      map(response => response.users.length ? response.users[0] : null)
    );
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<any>(`https://dummyjson.com/posts/user/${userId}`).pipe(
      map(response => response.posts)
    );
  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<any>(`https://dummyjson.com/comments/post/${postId}`).pipe(
      map(response => response.comments)
    );
  }
}
