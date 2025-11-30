import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  title: string = 'Projects - Matthew Querzoli'

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
