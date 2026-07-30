import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { RouterLink } from '@angular/router';
import { anyUnderConstruction, sortedProjects, Project, tappyOsProjectPattern, Technology } from './projects';

export interface YearGroup {
  year: number;
  projects: Project[];
}

function groupByYear(projects: Project[]): YearGroup[] {
  const groups: YearGroup[] = [];
  for (const project of projects) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.year === project.year) {
      lastGroup.projects.push(project);
    } else {
      groups.push({ year: project.year, projects: [project] });
    }
  }
  return groups;
}

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

  underConstructionGroups: YearGroup[] = groupByYear(
    sortedProjects.filter(p => p.underConstruction)
  );
  internalGroups: YearGroup[] = groupByYear(
    sortedProjects.filter(p => p.internal && p.active && !p.underConstruction && !tappyOsProjectPattern.test(p.route))
  );
  externalGroups: YearGroup[] = groupByYear(
    sortedProjects.filter(p => !p.internal && p.active)
  );
  inactiveGroups: YearGroup[] = groupByYear(
    sortedProjects.filter(p => !p.active)
  );

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
