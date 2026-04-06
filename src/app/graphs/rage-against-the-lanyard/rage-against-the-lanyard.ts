import { Component, OnInit } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { Title } from "@angular/platform-browser";

const preloadJsCdns: string[] = ['chart', 'rageagainstthelanyard'];

declare var window: any; // Global JS window handle.

@Component({
  selector: 'app-rage-against-the-lanyard',
  imports: [],
  templateUrl: './rage-against-the-lanyard.html',
  styleUrl: './rage-against-the-lanyard.css',
})
export class RageAgainstTheLanyardGraph implements OnInit {

   title: string = 'Rage Against the Lanyard - Graphs'

  constructor(private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService, private titleService: Title) {  
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.preloadExternalCdnsOnLoad();
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'Rage Against the Lanyard');
    this.initialiseCustomJs();
  }

  initialiseCustomJs() {
    if (typeof window.onload === 'function') {
      window.onload(); // Calling the function
    }
  }

}
