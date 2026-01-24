import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  emailUser = 'me';
  emailDomain = 'matthewquerzoli.com';
  title: string = 'Matthew Querzoli'
  
  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }

  get emailHref() {
    return `mailto:${this.emailUser}@${this.emailDomain}?Subject=Hey%21`;
  }

}
