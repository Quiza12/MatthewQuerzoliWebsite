import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { initialParagraphs, fillerParagraphs } from './data/paragraphs';
import { imageIndex } from './data/image-index';
import { Popover } from 'bootstrap';
import { ContentItem } from './interfaces/ir-interfaces';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';


@Component({
  selector: 'app-internet-recipe',
  standalone: true,
  imports: [InfiniteScrollModule, CommonModule],
  templateUrl: './internet-recipe.component.html',
  styleUrl: './internet-recipe.component.css'
})
export class InternetRecipeComponent implements OnDestroy {
  title: string = 'INTERNET RECIPE - Projects'
  initialArray: ContentItem[] = [];
  array: ContentItem[] = [];
  imageIndex: string[] = [];
  sum = 1;
  throttle = 300;
  scrollDistance = 2;
  direction = "";
  imageGenerationChance = 0.6; // % chance of image appearing on each scroll down
  prevIndex = 0;
  itemsToAppend = 7;
  imgBaseSlug ='/assets/images/internet-recipe/';
  private previousFavicon: string | null = null;

  constructor(titleService: Title) {
    this.imageIndex = imageIndex;
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/internet-recipe-favicon.png');

    this.sum = initialParagraphs.length;
    this.loadInitialItems("push");
  }

  ngAfterViewInit(): void {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new Popover(popoverTriggerEl);
    });
  }

  loadInitialItems(_method: string) {
    this.initialArray['push'](...initialParagraphs);
  }

  addItems(itemsToAdd: number, _method: any) {
    this.array['push'](...this.getRandomParagraphsNoRepeatWithRandomImage(fillerParagraphs, itemsToAdd));
  }

  appendItems(itemsToAppend: number) {
    this.addItems(itemsToAppend, "push");
  }

  onScrollDown() {
    this.appendItems(this.itemsToAppend);

    this.direction = "down";
  }

  getRandomParagraphsNoRepeatWithRandomImage(array: ContentItem[], itemsToAdd: number) {
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
        randomList.push(array[randomNum]);
      }
    }

    //Image item (add at random intervals)
    const imageItem = this.getRandomImageNoRepeat();
    if (imageItem) {
      randomList.push(imageItem);
    }

    return randomList;
  }

  getRandomImageNoRepeat(): ContentItem | undefined {
    if (Math.random() < this.imageGenerationChance) {
      return ({
        type: 'image',
        value: this.getRandomImageIndexNoRepeat(),
      });
    }
    return undefined;
  }

  getRandomImageIndexNoRepeat() {
    if (imageIndex.length === 0) return '';
    let index = Math.floor(Math.random() * imageIndex.length);
    // Re-roll until it differs from the last image (a single image can't avoid repeating).
    while (index === this.prevIndex && imageIndex.length > 1) {
      index = Math.floor(Math.random() * imageIndex.length);
    }
    this.prevIndex = index;
    return this.imgBaseSlug + imageIndex[index];
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
