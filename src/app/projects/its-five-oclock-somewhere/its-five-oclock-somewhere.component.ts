import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';

const preloadJsCdns: string[] = ['itsfiveoclocksomewhere'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-its-five-oclock-somewhere',
  standalone: true,
  imports: [],
  templateUrl: './its-five-oclock-somewhere.component.html',
  styleUrl: './its-five-oclock-somewhere.component.css'
})
export class ItsFiveOclockSomewhereComponent implements OnInit, OnDestroy {

  title: string = 'It\'s Five O\'Clock Somewhere - Projects'
  private previousFavicon: string | null = null;

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, private titleService: Title) {  
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/its-five-oclock-somewhere-favicon.png');
  }
  
  ngOnInit(): void {
    this.preloadExternalCdnsOnLoad();
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'It\'s Five O\'Clock Somewhere');
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
