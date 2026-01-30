import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  safeMarkdown = signal<SafeHtml>('' as SafeHtml);

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    const renderer = new marked.Renderer();

    // To render checkboxes interactive
    renderer.listitem = (item: any) => {
      const text = item.text;
      if (item.task) {
        // 1. Remove 'disabled'
        // 2. Add Bootstrap 'form-check-input' for better looks
        return `
          <li class="task-list-item d-flex align-items-center">
            <input type="checkbox" 
                  class="form-check-input me-2" 
                  ${item.checked ? 'checked' : ''}>
            <span>${text}</span>
          </li>`;
      }
      return `<li>${text}</li>`;
    };

    // Configure marked for GFM (checklists)
    marked.setOptions({
      renderer,
      gfm: true,
      breaks: true
    });

    const slug = this.route.snapshot.paramMap.get('slug');
    this.http
      .get(`assets/blog/posts/${slug}.md`, { responseType: 'text' })
      .subscribe(data => {
        const rawHtml = marked.parse(data) as string;
        this.safeMarkdown.set(this.sanitizer.bypassSecurityTrustHtml(rawHtml));
      });
  }
}
