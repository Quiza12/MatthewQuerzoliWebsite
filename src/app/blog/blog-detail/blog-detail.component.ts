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

    renderer.listitem = (item: any) => {
      const html = marked.parseInline(item.text); //make sure that markdown rendering is reapplied after custom renders are done

      if (item.task) { // To render checkboxes interactive
        return `
          <li class="task-list-item d-flex align-items-center">
            <input type="checkbox"
                  class="form-check-input me-2"
                  ${item.checked ? 'checked' : ''}>
            <span>${html}</span>
          </li>`;
      }

      return `<li>${html}</li>`;
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
