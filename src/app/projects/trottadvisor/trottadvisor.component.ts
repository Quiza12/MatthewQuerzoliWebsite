import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-trottadvisor',
  standalone: true,
  imports: [],
  templateUrl: './trottadvisor.component.html',
  styleUrl: './trottadvisor.component.css'
})
export class TrottadvisorComponent {
  title: string = '🏖️ Trottadvisor - Projects'

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
  }

}
