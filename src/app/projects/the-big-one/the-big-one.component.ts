import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from "@angular/platform-browser";

const preloadJsCdns: string[] = ['chart', 'thebigone'];

@Component({
  selector: 'app-the-big-one',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './the-big-one.component.html',
  styleUrl: './the-big-one.component.css',
  encapsulation: ViewEncapsulation.None //disable global Bootstrap
})
export class TheBigOneComponent implements OnInit {
  title: string = '🌏 The Big One FAQ - Projects'

  constructor(
    private externalJsCdnPreloadService: ExternalJavascriptCdnPreloadService,
    private route: ActivatedRoute,
    private titleService: Title

  ) { titleService.setTitle(this.title); }

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
