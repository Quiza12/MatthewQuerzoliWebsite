import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TheGoodBookComponent } from './the-good-book/the-good-book.component';
import { WritingComponent } from './writing/writing.component';
import { NanoNarrativesComponent } from './nano-narratives/nano-narratives.component';
import { TappyStandardTimeComponent } from './projects/tappy-os/tappy-standard-time/tappy-standard-time.component';
import { TheBigOneComponent } from './projects/the-big-one/the-big-one.component';
import { BoganOfMeteorologyComponent } from './projects/bogan-of-meteorology/bogan-of-meteorology.component';
import { RipMeANewOneComponent } from './projects/rip-me-a-new-one/rip-me-a-new-one.component';
import { BlogComponent } from './blog/blog.component';
import { FunnyPasswordCheckerComponent } from './projects/funny-password-checker/funny-password-checker.component';
import { ItsFiveOclockSomewhereComponent } from './projects/its-five-oclock-somewhere/its-five-oclock-somewhere.component';
import { TappySeasonTimeComponent } from './projects/tappy-os/tappy-season-time/tappy-season-time.component';
import { FpcInfoComponent } from './projects/funny-password-checker/components/info/fpc-info/fpc-info.component';
import { FpcAnswersComponent } from './projects/funny-password-checker/components/answers/fpc-answers/fpc-answers.component';
import { FpcAboutComponent } from './projects/funny-password-checker/components/about/fpc-about/fpc-about.component';
import { BomAboutComponent } from './projects/bogan-of-meteorology/components/bom-about/bom-about.component';
import { TappyOsComponent } from './projects/tappy-os/tappy-os.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { QuietNearALittleStreamComponent } from './projects/quiet-near-a-little-stream/quiet-near-a-little-stream.component';
import { InternetRecipeComponent } from './projects/internet-recipe/internet-recipe.component';



const routes: Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',               component: HomeComponent },
  { path: 'writing',            component: WritingComponent },
  { path: 'projects',           component: ProjectsComponent },
  { path: 'testimonials',       component: TestimonialsComponent },
  { path: 'the-good-book',      component: TheGoodBookComponent },
  { path: 'nano-narratives',    component: NanoNarrativesComponent },
  { path: 'blog',               component: BlogComponent },
  { path: 'blog/:slug',         component: BlogDetailComponent },

  { path: 'projects/the-big-one',               component: TheBigOneComponent },
  { path: 'projects/its-five-oclock-somewhere', component: ItsFiveOclockSomewhereComponent },
  { path: 'projects/rip-me-a-new-one',          component: RipMeANewOneComponent },
  
  { path: 'projects/funny-password-checker',          component: FunnyPasswordCheckerComponent },
  { path: 'projects/funny-password-checker/info',     component: FpcInfoComponent },
  { path: 'projects/funny-password-checker/answers',  component: FpcAnswersComponent },
  { path: 'projects/funny-password-checker/about',    component: FpcAboutComponent },

  { path: 'projects/bogan-of-meteorology',          component: BoganOfMeteorologyComponent },
  { path: 'projects/bogan-of-meteorology/about',    component: BomAboutComponent },

  { path: 'projects/tappy-os',                       component: TappyOsComponent },
  { path: 'projects/tappy-os/tappy-standard-time',   component: TappyStandardTimeComponent },
  { path: 'projects/tappy-os/tappy-season-time',     component: TappySeasonTimeComponent },

  { path: 'projects/quiet-near-a-little-stream',     component: QuietNearALittleStreamComponent },

  { path: 'projects/internet-recipe',     component: InternetRecipeComponent },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
