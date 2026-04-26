import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ooo-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ooo-about.html',
  styleUrl: './ooo-about.scss',
})
export class OooAbout {

  title: string = '🏢 Out of Office//Pass the Parcel - Projects'

  constructor(private titleService: Title) {  
    titleService.setTitle(this.title);
  }

}
