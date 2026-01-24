import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  private http = inject(HttpClient);
  private titleService = inject(Title);

  blogPosts = signal<any[]>([]);

  constructor() {
    this.titleService.setTitle('Blog - Matthew Querzoli');

    this.http.get<any[]>('assets/blog/blog-index.json').subscribe(posts => this.blogPosts.set(posts));
  }

}