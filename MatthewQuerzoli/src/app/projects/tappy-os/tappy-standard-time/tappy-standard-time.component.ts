import { Component, OnInit } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../../services/external-js-preload/external-javascript-cdn-preload.service';

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

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService) {  }

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
