import { Component, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';
import { RouterLink } from '@angular/router';
import { projects, sortedProjects, Project, tappyOsProjectPattern, Technology } from '../projects';

@Component({
  selector: 'app-tappy-os',
  templateUrl: './tappy-os.component.html',
  styleUrl: './tappy-os.component.css',
  imports: [ RouterLink ],
  standalone: true
})
export class TappyOsComponent implements OnDestroy {

  title: string = 'Tappy OS - Projects'
  projects: Project[] = sortedProjects;
  technology = Technology;
  tappyOsProjectPattern: RegExp = tappyOsProjectPattern;
  private previousFavicon: string | null = null;

  constructor(private titleService: Title) {  
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/tappy-os-favicon.png');
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
