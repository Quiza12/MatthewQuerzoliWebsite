import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-tappy-os',
  templateUrl: './tappy-os.component.html',
  styleUrl: './tappy-os.component.css'
})
export class TappyOsComponent {

  title: string = '👧🏽 Tappy OS - Projects'

  constructor(private titleService: Title) {  
    titleService.setTitle(this.title);
  }

}
