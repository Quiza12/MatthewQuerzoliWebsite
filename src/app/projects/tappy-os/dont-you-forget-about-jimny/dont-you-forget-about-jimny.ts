import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";
import * as bootstrap from 'bootstrap';

const preloadJsCdns: string[] = ['basic-bootstrap'];

@Component({
  selector: 'app-dont-you-forget-about-jimny',
  imports: [],
  standalone: true,
  templateUrl: './dont-you-forget-about-jimny.html',
  styleUrl: './dont-you-forget-about-jimny.css',
})
export class DontYouForgetAboutJimny {
  @ViewChild('jimnyAudio') audio!: ElementRef<HTMLAudioElement>;
  title: string = '🚙 Don\'t You (Forget About Jimny)'
  audioSrc: string = '/assets/audio/dont-you-forget-about-jimny/dont-you-forget-about-me.mp3';
  playing: boolean = true;
  jimnyImageArray: string[] = ["jimny1", "jimny2", "jimny3", "jimny4", "jimny5", "jimny6", "jimny7", "jimny8", "jimny9", "jimny10", "jimny11", "jimny12", "jimny13", "jimny14", "jimny15", "jimny16", "jimny17", "jimny19", "jimny20", "jimny21", "jimny22", "jimny23", "jimny24", "jimny25", "jimny26"];

  constructor(
    private route: ActivatedRoute,
    private titleService: Title

  ) { titleService.setTitle(this.title); }

  ngAfterViewInit() {
    this.audio.nativeElement.play(); // Auto-play 

    const el = document.getElementById('carousel');
    if (el) {
      new bootstrap.Carousel(el, {
        interval: 3000,
        ride: 'carousel',
        pause: false,
        wrap: true
      });
    }
  }

  pauseAudio() {
    console.log("Audio paused");
    this.playing = false;
    this.audio.nativeElement.pause();
  }

  playAudio() {
    console.log("Audio playing");
    this.playing = true;
    this.audio.nativeElement.play();
  }

}
