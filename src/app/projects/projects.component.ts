import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [ RouterLink ],
  standalone: true
})
export class ProjectsComponent {

  title: string = 'Projects - Matthew Querzoli'

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
