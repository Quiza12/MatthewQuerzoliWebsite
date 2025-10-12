import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-internet-recipe',
  standalone: true,
  imports: [InfiniteScrollModule, CommonModule],
  templateUrl: './internet-recipe.component.html',
  styleUrl: './internet-recipe.component.css'
})
export class InternetRecipeComponent {

  array: any[] = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 1;
  direction = "";

  constructor() {
    this.appendItems(0, this.sum);
  }

  addItems(startIndex: any, endIndex: any, _method: any) {
    for (let i = 0; i < this.sum; ++i) {
      // this.array.push("Hello")
      this.array[_method]([i, " ", this.generateWord()].join(""));
    }
  }

  appendItems(startIndex: any, endIndex: any) {
    this.addItems(startIndex, endIndex, "push");
  }

  prependItems(startIndex: any, endIndex: any) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  onScrollDown() {
    console.log("scrolled down");

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = "down";
  }

  onUp() {
    console.log("scrolled up");
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = "up";
  }
  generateWord() {
    // return chance.word();
    return "word" + Math.floor((Math.random() * 100) + 1);
  }

}
