import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';

const preloadJsCdns: string[] = ['chart', 'thebigone'];

@Component({
  selector: 'app-the-big-one',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './the-big-one.component.html',
  styleUrl: './the-big-one.component.css',
  encapsulation: ViewEncapsulation.None //disable global Bootstrap
})
export class TheBigOneComponent implements OnInit, OnDestroy {
  title: string = 'The Big One FAQ - Projects'
  private previousFavicon: string | null = null;

  constructor(
    private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService,
    private route: ActivatedRoute,
    private titleService: Title

  ) {
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/the-big-one-favicon.png');
  }

  ngOnInit(): void {
    this.preloadExternalCdnsOnLoad();

    this.route.fragment.subscribe(fragment => {
      const element = document.querySelector(`#${fragment}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'The Big One');
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
