import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Collapse } from 'bootstrap';
import { faCoffee, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ RouterLink ],
  standalone: true,
})
export class HeaderComponent {

  faCoffee = faCoffee;
  currentRoute: string = '';

  standardRoute: boolean = false;
  theBigOneRoute: boolean = false;
  tappyOsRoute: boolean = false;
  tappyStandardTimeRoute: boolean = false;
  tappySeasonTimeRoute: boolean = false;
  boganOfMeteorologyRoute: boolean = false;
  ripMeANewOneRoute: boolean = false;
  itsFiveOclockSomewhereRoute: boolean = false;
  funnyPasswordCheckerRoute: boolean = false;
  quietNearALittleStreamRoute: boolean = false;
  internetRecipeRoute: boolean = false;
  orkisimsRoute: boolean = false;
  trottadvisorRoute: boolean = false;
  bingoRoute: boolean = false;
  familyItInvoiceGeneratorRoute: boolean = false;
  dontYouForgetAboutJimnyRoute: boolean = false;

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

    this.theBigOneRoute = currentRoute == ('/projects/the-big-one') ? true : false;
    this.boganOfMeteorologyRoute = currentRoute == ('/projects/bogan-of-meteorology') ? true : false;
    this.ripMeANewOneRoute = currentRoute == ('/projects/rip-me-a-new-one') ? true : false;
    this.itsFiveOclockSomewhereRoute = currentRoute == ('/projects/its-five-oclock-somewhere') ? true : false;
    this.funnyPasswordCheckerRoute = currentRoute == ('/projects/funny-password-checker') ? true : false;
    this.quietNearALittleStreamRoute = currentRoute == ('/projects/quiet-near-a-little-stream') ? true : false;
    this.internetRecipeRoute = currentRoute == ('/projects/internet-recipe') ? true : false;
    this.trottadvisorRoute = currentRoute == ('/projects/trottadvisor') ? true : false;
    this.bingoRoute = currentRoute == ('/projects/bingo') ? true : false;
    this.familyItInvoiceGeneratorRoute = currentRoute == ('/projects/family-it-invoice-generator') ? true : false;
    this.tappyOsRoute = currentRoute == ('/projects/tappy-os') ? true : false;
    this.orkisimsRoute = currentRoute == ('/projects/tappy-os/orkinisms') ? true : false;
    this.tappySeasonTimeRoute = currentRoute == ('/projects/tappy-os/tappy-season-time') ? true : false;
    this.tappyStandardTimeRoute = currentRoute == ('/projects/tappy-os/tappy-standard-time') ? true : false;
    this.dontYouForgetAboutJimnyRoute = currentRoute == ('/projects/tappy-os/dont-you-forget-about-jimny') ? true : false;

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
      !this.orkisimsRoute &&
      !this.trottadvisorRoute &&
      !this.bingoRoute &&
      !this.familyItInvoiceGeneratorRoute &&
      !this.tappyOsRoute &&
      !this.dontYouForgetAboutJimnyRoute;
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
    this.trottadvisorRoute = false;
    this.bingoRoute = false;
    this.familyItInvoiceGeneratorRoute = false;
    this.tappyOsRoute = false;
    this.dontYouForgetAboutJimnyRoute = false;
  }

  collapseNavbar(navToCollapse: string) {
    const navbar = document.getElementById(navToCollapse);
    if (navbar?.classList.contains('show')) {
      const bsCollapse = Collapse.getInstance(navbar) || new Collapse(navbar);
      bsCollapse.hide();
    }
  }

}
