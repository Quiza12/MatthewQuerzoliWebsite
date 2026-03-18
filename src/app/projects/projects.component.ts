import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { RouterLink } from '@angular/router';
import { anyUnderConstruction, sortedProjects, Project, tappyOsProjectPattern, Technology } from './projects';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [ RouterLink ],
  standalone: true
})
export class ProjectsComponent {

  title: string = 'Projects - Matthew Querzoli'
  projects: Project[] = sortedProjects;
  anyUnderConstruction: boolean = anyUnderConstruction;
  technology = Technology;
  tappyOsProjectPattern: RegExp = tappyOsProjectPattern;

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
