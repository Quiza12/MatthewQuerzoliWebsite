import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';

@Component({
  selector: 'app-quiet-near-a-little-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiet-near-a-little-stream.component.html',
  styleUrl: './quiet-near-a-little-stream.component.css'
})
export class QuietNearALittleStreamComponent implements OnDestroy {
  @ViewChild('audioRef') audioElement!: ElementRef<HTMLAudioElement>;
  audioSrc: string = '/assets/audio/quiet-near-a-little-stream/water-small-stream-25614.mp3';
  playing: boolean = true;

  title: string = 'Be Quiet Near a Little Stream and Listen - Projects'
  private previousFavicon: string | null = null;

  constructor(private titleService: Title) {  
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/quiet-near-a-little-stream-favicon.png');
  }

  ngAfterViewInit() {
    this.audioElement.nativeElement.play(); // Auto-play 
  }

  pauseAudio() {
    console.log("Audio paused");
    this.playing = false;
    this.audioElement.nativeElement.pause();
  }

  playAudio() {
    console.log("Audio playing");
    this.playing = true;
    this.audioElement.nativeElement.play();
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
