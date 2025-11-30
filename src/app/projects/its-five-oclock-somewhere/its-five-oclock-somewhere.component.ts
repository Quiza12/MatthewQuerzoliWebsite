import { Component, OnInit } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";

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

  title: string = '🕔 It\'s Five O\'Clock Somewhere - Projects'

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, private titleService: Title) {  
    titleService.setTitle(this.title);
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

}
