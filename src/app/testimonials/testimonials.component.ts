import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {

  birthYear: number = 1995;
  age: number = 0; 

  constructor() {
    this.age = this.getAge();
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

}
