import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  emailUser = 'me';
  emailDomain = 'matthewquerzoli.com';
  get emailHref() {
    return `mailto:${this.emailUser}@${this.emailDomain}?Subject=Hey%21`;
  }

}
