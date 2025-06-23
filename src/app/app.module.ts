import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TheGoodBookComponent } from './the-good-book/the-good-book.component';
import { WritingComponent } from './writing/writing.component';
import { NanoNarrativesComponent } from './nano-narratives/nano-narratives.component';
import { ProjectsComponent } from './projects/projects.component';
import { TappyOsComponent } from './projects/tappy-os/tappy-os.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TestimonialsComponent,
    TheGoodBookComponent,
    WritingComponent,
    NanoNarrativesComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TappyOsComponent,
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule, // Include HttpClientModule here
    MarkdownModule.forRoot({ loader: HttpClientModule }) // Pass HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
