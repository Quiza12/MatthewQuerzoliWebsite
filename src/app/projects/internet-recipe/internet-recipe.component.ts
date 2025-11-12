import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { initialParagraphs } from './data/initial-paragraphs';
import { fillerParagraphs } from './data/random-filler-paragraphs';
import { getRandomEntry } from '../../shared/libs/common';
import { imageIndex } from './data/image-index';
import { Popover } from 'bootstrap';

interface ContentItem {
  type: 'text' | 'image';
  value: string;
}

@Component({
  selector: 'app-internet-recipe',
  standalone: true,
  imports: [InfiniteScrollModule, CommonModule],
  templateUrl: './internet-recipe.component.html',
  styleUrl: './internet-recipe.component.css'
})
export class InternetRecipeComponent {
  array: ContentItem[] = [];
  initialParagraphs: string[] = [];
  fillerParagraphs: string[] = [];
  imageIndex: string[] = [];
  sum = 1;
  throttle = 300;
  scrollDistance = 1;
  direction = "";
  imageGenerationChance = 0.5; // 50% chance

  constructor() {
    this.initialParagraphs = initialParagraphs;
    this.fillerParagraphs = fillerParagraphs;
    this.imageIndex = imageIndex;
    
    this.sum = this.initialParagraphs.length;
    this.loadInitialItems("push");
  }

  ngAfterViewInit(): void {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new Popover(popoverTriggerEl);
    });
  }

  loadInitialItems(_method: string) {
    const items: ContentItem[] = this.initialParagraphs.map(p => ({
      type: 'text',
      value: p
    }));

    this.array['push'](...items);
  }

  addItems(itemsToAdd: number, _method: any) {
    this.array['push'](...this.getRandomParagraphsNoRepeatWithRandomImage(this.fillerParagraphs, itemsToAdd));
  }

  appendItems(itemsToAppend: number) {
    this.addItems(itemsToAppend, "push");
  }

  onScrollDown() {
    console.log("scrolled down");

    const itemsToAppend = 7;
    this.appendItems(itemsToAppend);

    this.direction = "down";
  }

  getRandomParagraphsNoRepeatWithRandomImage(array: string[], itemsToAdd: number) {
    let randomNum: number = 0;
    let prevRandomNum: number = 0;
    let randomNumArray: number[] = [];
    let randomList: ContentItem[] = [];

    if (itemsToAdd > array.length) {
      itemsToAdd = array.length; //avoids an overflow
    }

    //Text items (add every time)
    for (let i = 0; randomNumArray.length < itemsToAdd; ++i) {
      randomNum = Math.floor(Math.random() * array.length);
      if ((prevRandomNum != randomNum) && (!randomNumArray.includes(randomNum))) {
        prevRandomNum = randomNum;
        randomNumArray.push(randomNum);
        randomList.push({
          type: 'text',
          value: array[randomNum]
        });
      }
    }

    //Image item (add at random intervals)
    const imageItem = this.getRandomImage();
    if (imageItem) {
      randomList.push(imageItem);
    }

    console.log(randomList);
    return randomList;
  }

  getRandomImage(): ContentItem | undefined {
    if (Math.random() < this.imageGenerationChance) { 
      return ({
        type: 'image',
        value: getRandomEntry(this.imageIndex),
      });
    }
    return undefined;
  }

}
