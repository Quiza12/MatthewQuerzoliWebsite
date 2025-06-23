import { Component, OnInit } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';

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

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService) {  }
  
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
