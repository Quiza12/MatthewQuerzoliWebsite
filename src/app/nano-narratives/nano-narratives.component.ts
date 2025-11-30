import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-nano-narratives',
  templateUrl: './nano-narratives.component.html',
  styleUrls: ['./nano-narratives.component.css']
})
export class NanoNarrativesComponent {

  currentDate = new Date();
  formattedDate = `${this.currentDate.getDate().toString().padStart(2, '0')}/${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}/${this.currentDate.getFullYear()}`;
  formattedImageDate = `${this.currentDate.getDate().toString().padStart(2, '0')}${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}${this.currentDate.getFullYear()}`;
  baseLink = "https://raw.githubusercontent.com/Quiza12/NanoNarratives/refs/heads/master/images/" + this.formattedImageDate + ".jpg";

  title: string = 'Nano Narratives - Matthew Querzoli'

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }

}
