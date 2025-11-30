import { Component, OnInit } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";

const preloadJsCdns: string[] = ['moment','tappystandardtime'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-tappy-standard-time',
  standalone: true,
  imports: [],
  templateUrl: './tappy-standard-time.component.html',
  styleUrl: './tappy-standard-time.component.css'
})
export class TappyStandardTimeComponent implements OnInit {

  title: string = '⏰ Tappy Standard Time - Tappy OS - Projects'

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, titleService: Title) {  
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.preloadExternalCdnsOnLoad();
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'Tappy Standard Time');
    this.initialiseCustomJs();
  }

  initialiseCustomJs() {
    if (typeof window.onload === 'function') {
      window.onload(); // Calling the function
    }
  }
  
}
