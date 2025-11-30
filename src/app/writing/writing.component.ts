import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent {
  title: string = 'Writing - Matthew Querzoli'

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
