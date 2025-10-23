import { Component, AfterViewInit } from '@angular/core';
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
  // scrollUpDistance = 1;
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

  addItems(startIndex: any, endIndex: any, _method: any) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[_method]([this.getRandomFillerParagraph()].join(""));
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

  // generateWord() {
  //   return "word" + Math.floor((Math.random() * 100) + 1);
  // }

  getRandomFillerParagraph() {
    return this.fillerParagraphs[Math.floor(Math.random() * this.fillerParagraphs.length)];
  }

}
