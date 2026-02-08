import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { RouterLink } from '@angular/router';
import { projects, sortedProjects, Project, tappyOsProjectPattern, Technology } from '../projects';

@Component({
  selector: 'app-tappy-os',
  templateUrl: './tappy-os.component.html',
  styleUrl: './tappy-os.component.css',
  imports: [ RouterLink ],
  standalone: true
})
export class TappyOsComponent {

  title: string = '👧🏽 Tappy OS - Projects'
  projects: Project[] = sortedProjects;
  technology = Technology;
  tappyOsProjectPattern: RegExp = tappyOsProjectPattern;

  constructor(private titleService: Title) {  
    titleService.setTitle(this.title);
  }

}
