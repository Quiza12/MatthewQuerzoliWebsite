import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
// import { Collapse } from 'bootstrap';
import { faCoffee, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink],
  standalone: true,
})
export class HeaderComponent {

  faCoffee = faCoffee;
  currentRoute: string = '';

  standardRoute: boolean = false;
  graphsRoute: boolean = false;

  // Projects
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
  outOfOfficeRoute: boolean = false;

  // Graphs
  graphAverageMafsEpisodeRoute: boolean = false;
  graphRageAgainstTheLanyardRoute: boolean = false;

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

    this.theBigOneRoute = currentRoute.includes('/projects/the-big-one') ? true : false;
    this.boganOfMeteorologyRoute = currentRoute.includes('/projects/bogan-of-meteorology') ? true : false;
    this.ripMeANewOneRoute = currentRoute.includes('/projects/rip-me-a-new-one') ? true : false;
    this.itsFiveOclockSomewhereRoute = currentRoute.includes('/projects/its-five-oclock-somewhere') ? true : false;
    this.funnyPasswordCheckerRoute = currentRoute.includes('/projects/funny-password-checker') ? true : false;
    this.quietNearALittleStreamRoute = currentRoute.includes('/projects/quiet-near-a-little-stream') ? true : false;
    this.internetRecipeRoute = currentRoute.includes('/projects/internet-recipe') ? true : false;
    this.trottadvisorRoute = currentRoute.includes('/projects/trottadvisor') ? true : false;
    this.bingoRoute = currentRoute.includes('/projects/bingo') ? true : false;
    this.familyItInvoiceGeneratorRoute = currentRoute.includes('/projects/family-it-invoice-generator') ? true : false;
    this.tappyOsRoute = currentRoute == ('/projects/tappy-os') ? true : false;
    this.orkisimsRoute = currentRoute.includes('/projects/tappy-os/orkinisms') ? true : false;
    this.tappySeasonTimeRoute = currentRoute.includes('/projects/tappy-os/tappy-season-time') ? true : false;
    this.tappyStandardTimeRoute = currentRoute.includes('/projects/tappy-os/tappy-standard-time') ? true : false;
    this.dontYouForgetAboutJimnyRoute = currentRoute.includes('/projects/tappy-os/dont-you-forget-about-jimny') ? true : false;
    this.outOfOfficeRoute = currentRoute.includes('/projects/out-of-office') ? true : false;

    this.graphsRoute = currentRoute == ('/graphs') ? true : false;
    this.graphAverageMafsEpisodeRoute = currentRoute.includes('/graphs/average-mafs-episode') ? true : false;
    this.graphRageAgainstTheLanyardRoute = currentRoute.includes('/graphs/rage-against-the-lanyard') ? true : false;

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
      !this.dontYouForgetAboutJimnyRoute &&
      !this.outOfOfficeRoute &&
      !this.graphsRoute &&
      !this.graphAverageMafsEpisodeRoute &&
      !this.graphRageAgainstTheLanyardRoute;
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
    this.outOfOfficeRoute = false;

    this.graphsRoute = false
    this.graphAverageMafsEpisodeRoute = false;
    this.graphRageAgainstTheLanyardRoute = false;
  }

  collapseNavbar(navToCollapse: string) {
    const navbar = document.getElementById(navToCollapse);
    if (navbar?.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar);
      bsCollapse.hide();
    }
  }

}

