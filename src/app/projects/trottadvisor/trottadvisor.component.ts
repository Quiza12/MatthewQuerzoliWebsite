import { Component } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";

const preloadJsCdns: string[] = ['trottadvisor'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-trottadvisor',
  standalone: true,
  imports: [],
  templateUrl: './trottadvisor.component.html',
  styleUrl: './trottadvisor.component.css'
})
export class TrottadvisorComponent {
  title: string = 'Trottadvisor - Projects'

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, private titleService: Title) {
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.preloadExternalCdnsOnLoad();
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'Trottadvisor');
    this.initialiseCustomJs();
  }

  initialiseCustomJs() {
    if (typeof window.onload === 'function') {
      window.onload(); // Calling the function
    }
  }
}
