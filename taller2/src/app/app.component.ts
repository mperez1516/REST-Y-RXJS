import { Component } from '@angular/core';
import { DummyApiService } from './services/dummy-api.service';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  user: User | null = null;
  posts: Post[] = [];
  selectedComments: { [postId: number]: Comment[] } = {};

  constructor(private apiService: DummyApiService) {}

  buscarUsuario(): void {
    this.apiService.getUserByUsername(this.username)
      .pipe(
        switchMap(user => {
          this.user = user;
          return user ? this.apiService.getPostsByUser(user.id) : of([]); 
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  cargarComentarios(postId: number): void {
    if (!this.selectedComments[postId]) {
      this.apiService.getCommentsByPost(postId).subscribe(comments => {
        this.selectedComments[postId] = comments;
      });
    } else {
      delete this.selectedComments[postId]; // Toggle
    }
  }

}
