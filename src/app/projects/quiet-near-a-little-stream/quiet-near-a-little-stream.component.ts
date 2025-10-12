import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiet-near-a-little-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiet-near-a-little-stream.component.html',
  styleUrl: './quiet-near-a-little-stream.component.css'
})
export class QuietNearALittleStreamComponent {
  @ViewChild('audioRef') audioElement!: ElementRef<HTMLAudioElement>;
  audioSrc: string = '/assets/audio/quiet-near-a-little-stream/water-small-stream-25614.mp3'; // Replace with your audio file path
  playing: boolean = true;

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
}
