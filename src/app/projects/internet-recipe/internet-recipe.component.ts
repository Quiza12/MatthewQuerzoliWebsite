import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { initialParagraphs } from './data/internet-recipe-initial-paragraphs';
import { fillerParagraphs } from './data/internet-recipe-random-filler-paragraphs';
import { Popover } from 'bootstrap';

@Component({
  selector: 'app-internet-recipe',
  standalone: true,
  imports: [InfiniteScrollModule, CommonModule],
  templateUrl: './internet-recipe.component.html',
  styleUrl: './internet-recipe.component.css'
})
export class InternetRecipeComponent {
  array: any[] = [];
  initialParagraphs: string[] = [];
  fillerParagraphs: string[] = [];
  sum = 1;
  throttle = 300;
  scrollDistance = 1;
  direction = "";

  constructor() {
    this.initialParagraphs = initialParagraphs;
    this.fillerParagraphs = fillerParagraphs;
    this.sum = this.initialParagraphs.length;
    this.loadInitialItems("push");
  }

  ngAfterViewInit(): void {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new Popover(popoverTriggerEl);
    });
  }

  loadInitialItems(_method: any) {
    for (let i = 0; i < this.initialParagraphs.length; ++i) {
      this.array[_method]([this.initialParagraphs[i]].join(""));
    }
  }

  addItems(itemsToAdd: number, _method: any) {
    this.array[_method](...this.getRandomEntryNoRepeat(this.fillerParagraphs, itemsToAdd));
  }

  appendItems(itemsToAppend: number) {
    this.addItems(itemsToAppend, "push");
  }

  onScrollDown() {
    console.log("scrolled down");

    // add another 5 items
    const itemsToAppend = 5;
    this.appendItems(itemsToAppend);

    this.direction = "down";
  }

  getRandomEntryNoRepeat(array: any[], itemsToAdd: number) {
    let randomNum: number = 0;
    let prevRandomNum: number = 0;
    let randomNumArray: number[] = [];
    let randomList: string[] = [];

    // if (itemsToAdd > array.length) {
      itemsToAdd = array.length; //avoids an overflow
    // }

    for (let i = 0; randomNumArray.length < itemsToAdd; ++i) {
      randomNum = Math.floor(Math.random() * array.length);
      if ((prevRandomNum != randomNum) && (!randomNumArray.includes(randomNum))) {
        prevRandomNum = randomNum;
        randomNumArray.push(randomNum);
        randomList.push(array[randomNum]);
        
      }
    }
    console.log(randomList);
    return randomList;
  }

}
