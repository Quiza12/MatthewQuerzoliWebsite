import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';

const preloadJsCdns: string[] = ['ripmeanewone'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-rip-me-a-new-one',
  standalone: true,
  imports: [],
  templateUrl: './rip-me-a-new-one.component.html',
  styleUrl: './rip-me-a-new-one.component.css'
})
export class RipMeANewOneComponent implements OnInit, OnDestroy {

  title: string = 'Rip Me A New One - Projects'
  private previousFavicon: string | null = null;

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, private titleService: Title) {  
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/rip-me-a-new-one-favicon.png');
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

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
