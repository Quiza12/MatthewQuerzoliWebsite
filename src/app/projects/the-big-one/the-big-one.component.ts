import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { ActivatedRoute } from '@angular/router';

const preloadJsCdns: string[] = ['chart', 'thebigone'];

@Component({
  selector: 'app-the-big-one',
  standalone: true,
  imports: [],
  templateUrl: './the-big-one.component.html',
  styleUrl: './the-big-one.component.css',
  encapsulation: ViewEncapsulation.None //disable global Bootstrap
})
export class TheBigOneComponent implements OnInit {

  constructor(
    private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService,
    private route: ActivatedRoute
  ) {  }

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

}
