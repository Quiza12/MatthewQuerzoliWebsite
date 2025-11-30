import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogPosts: any[] = [];
  title: string = 'Blog - Matthew Querzoli'

  constructor(private http: HttpClient, titleService: Title) {
    titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.http.get<any[]>('assets/blog/blog-index.json').subscribe(data => {
      this.blogPosts = data;
    });
  }

}
