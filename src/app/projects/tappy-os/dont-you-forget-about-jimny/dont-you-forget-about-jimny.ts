import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ExternalJavascriptCdnPreloadService } from '../../../services/external-js-preload/external-javascript-cdn-preload.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from "@angular/platform-browser";

const preloadJsCdns: string[] = ['basic-bootstrap'];

@Component({
  selector: 'app-dont-you-forget-about-jimny',
  imports: [],
  templateUrl: './dont-you-forget-about-jimny.html',
  styleUrl: './dont-you-forget-about-jimny.css',
})
export class DontYouForgetAboutJimny {
  @ViewChild('audioRef') audioElement!: ElementRef<HTMLAudioElement>;
  title: string = '🚙 Don\'t You (Forget About Jimny)'
  audioSrc: string = '/assets/audio/dont-you-forget-about-jimny/dont-you-forget-about-me.mp3';
  jimnyImageArray: string[] = ["jimny1", "jimny2", "jimny3", "jimny4", "jimny5", "jimny6", "jimny7", "jimny8", "jimny9", "jimny10", "jimny11", "jimny12", "jimny13", "jimny14", "jimny15", "jimny16", "jimny17", "jimny18", "jimny19", "jimny20", "jimny21", "jimny22", "jimny23", "jimny24", "jimny25", "jimny26"];

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

  ngAfterViewInit() {
    // this.audioElement.nativeElement.play(); // Auto-play 
  }

  async preloadExternalCdnsOnLoad(): Promise<void> {
    await this.externalJsCdnPreloadService.preloadExternalCdnsOnLoad(preloadJsCdns, 'Basic Bootstrap');
  }
}
