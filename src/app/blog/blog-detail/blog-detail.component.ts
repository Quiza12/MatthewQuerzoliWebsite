import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule, RouterModule, HttpClientModule, MarkdownModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  markdownContent: string = ''; 

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.http
      .get(`assets/blog/posts/${slug}.md`, { responseType: 'text' })
      .subscribe(data => {
        this.markdownContent = data;
      });
  }
}

