import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TheGoodBookComponent } from './the-good-book/the-good-book.component';
import { WritingComponent } from './writing/writing.component';


const routes: Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',             component: HomeComponent },
  { path: 'writing',          component: WritingComponent },
  { path: 'projects',         component: ProjectsComponent },
  { path: 'testimonials',     component: TestimonialsComponent },
  { path: 'the-good-book',    component: TheGoodBookComponent }

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
