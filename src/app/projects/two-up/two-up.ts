import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';
import { RouterLink } from '@angular/router';

const preloadJsCdns: string[] = ['twoup'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-two-up',
  imports: [RouterLink],
  templateUrl: './two-up.html',
  styleUrl: './two-up.scss',
})
export class TwoUp implements OnInit, OnDestroy {

  title: string = 'Two-Up - Projects'
  private previousFavicon: string | null = null;

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, private titleService: Title) {  
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/two-up-favicon.png');
  }

  ngOnInit(): void {
    this.preloadExternalCdnsOnLoad();
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'Two Up');
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
