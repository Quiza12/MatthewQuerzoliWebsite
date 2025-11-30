import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-the-good-book',
  templateUrl: './the-good-book.component.html',
  styleUrls: ['./the-good-book.component.css']
})
export class TheGoodBookComponent {
  title: string = 'The Good Book - Matthew Querzoli'

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
