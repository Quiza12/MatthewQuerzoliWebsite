import { Component, OnInit } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';

const preloadJsCdns: string[] = ['itsfiveoclocksomewhere'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-its-five-oclock-somewhere',
  standalone: true,
  imports: [],
  templateUrl: './its-five-oclock-somewhere.component.html',
  styleUrl: './its-five-oclock-somewhere.component.css'
})
export class ItsFiveOclockSomewhereComponent implements OnInit {

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService) {  }
  
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

}
