import { Component, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';

@Component({
  selector: 'app-trottadvisor',
  standalone: true,
  imports: [],
  templateUrl: './trottadvisor.component.html',
  styleUrl: './trottadvisor.component.css'
})
export class TrottadvisorComponent implements OnDestroy {
  title: string = 'Trottadvisor - Projects'
  private previousFavicon: string | null = null;

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/trottadvisor-favicon.png');
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
