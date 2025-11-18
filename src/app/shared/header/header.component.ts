import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Collapse } from 'bootstrap';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  faCoffee = faCoffee;
  currentRoute: string = '';

  standardRoute: boolean = false;
  theBigOneRoute: boolean = false;
  tappyStandardTimeRoute: boolean = false;
  tappySeasonTimeRoute: boolean = false;
  boganOfMeteorologyRoute: boolean = false;
  ripMeANewOneRoute: boolean = false;
  itsFiveOclockSomewhereRoute: boolean = false;
  funnyPasswordCheckerRoute: boolean = false;
  quietNearALittleStreamRoute: boolean = false;
  internetRecipeRoute: boolean = false;
  orkisimsRoute: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
      this.determineRoute(this.currentRoute);

    });
  }

  determineRoute(currentRoute: string): void {

    console.log('Current route: ' + this.currentRoute);

    this.resetRoutes();

    this.theBigOneRoute = currentRoute.includes('the-big-one') ? true : false;
    this.tappyStandardTimeRoute = currentRoute.includes('tappy-standard-time') ? true : false;
    this.boganOfMeteorologyRoute = currentRoute.includes('bogan-of-meteorology') ? true : false;
    this.ripMeANewOneRoute = currentRoute.includes('rip-me-a-new-one') ? true : false;
    this.itsFiveOclockSomewhereRoute = currentRoute.includes('its-five-oclock-somewhere') ? true : false;
    this.tappySeasonTimeRoute = currentRoute.includes('tappy-season-time') ? true : false;
    this.funnyPasswordCheckerRoute = currentRoute.includes('funny-password-checker') ? true : false;
    this.quietNearALittleStreamRoute = currentRoute.includes('quiet-near-a-little-stream') ? true : false;
    this.internetRecipeRoute = currentRoute.includes('internet-recipe') ? true : false;
    this.orkisimsRoute = currentRoute.includes('orkinisms') ? true : false;

    this.standardRoute =
      !this.theBigOneRoute &&
      !this.tappyStandardTimeRoute &&
      !this.boganOfMeteorologyRoute &&
      !this.ripMeANewOneRoute &&
      !this.itsFiveOclockSomewhereRoute &&
      !this.tappySeasonTimeRoute &&
      !this.funnyPasswordCheckerRoute &&
      !this.quietNearALittleStreamRoute &&
      !this.internetRecipeRoute &&
      !this.orkisimsRoute;

  }

  resetRoutes() {
    this.standardRoute = false;
    this.theBigOneRoute = false;
    this.boganOfMeteorologyRoute = false;
    this.ripMeANewOneRoute = false;
    this.tappyStandardTimeRoute = false;
    this.itsFiveOclockSomewhereRoute = false;
    this.tappySeasonTimeRoute = false;
    this.funnyPasswordCheckerRoute = false;
    this.quietNearALittleStreamRoute = false;
    this.internetRecipeRoute = false;
    this.orkisimsRoute = false;
  }

  collapseNavbar(navToCollapse: string) {
    const navbar = document.getElementById(navToCollapse);
    if (navbar?.classList.contains('show')) {
      const bsCollapse = Collapse.getInstance(navbar) || new Collapse(navbar);
      bsCollapse.hide();
    }
  }

}
