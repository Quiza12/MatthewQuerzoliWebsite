import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {

  birthYear: number = 1995;
  age: number = 0; 
  title: string = 'Testimonials - Matthew Querzoli'

  constructor(titleService: Title) {
    this.age = this.getAge();
    titleService.setTitle(this.title);
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

}
