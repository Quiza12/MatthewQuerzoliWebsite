import { Component, OnInit } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";

const preloadJsCdns: string[] = ['ripmeanewone'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-rip-me-a-new-one',
  standalone: true,
  imports: [],
  templateUrl: './rip-me-a-new-one.component.html',
  styleUrl: './rip-me-a-new-one.component.css'
})
export class RipMeANewOneComponent implements OnInit {

  title: string = '🍻 Rip Me A New One - Projects'

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, private titleService: Title) {  
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.preloadExternalCdnsOnLoad();
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'Rip Me A New One');
    this.initialiseCustomJs();
  }

  initialiseCustomJs() {
    if (typeof window.onload === 'function') {
      window.onload(); // Calling the function
    }
  }

}
