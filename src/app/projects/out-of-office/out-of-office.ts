import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-out-of-office',
  standalone: true,
  imports: [],
  templateUrl: './out-of-office.html',
  styleUrl: './out-of-office.css',
})
export class OutOfOffice {

  title: string = '🏢 Out of Office//Pass the Parcel - Projects'

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }

}
