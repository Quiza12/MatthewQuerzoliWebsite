import { Component, OnDestroy } from '@angular/core';
import { Orkinism } from './classes/orkinism';
import { orkinisms } from './data/orkinisms';
import { sortObjectArray } from '../../../shared/libs/common';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../../shared/libs/common';

@Component({
  selector: 'app-orkinisms',
  standalone: true,
  imports: [],
  templateUrl: './orkinisms.component.html',
  styleUrl: './orkinisms.component.css'
})
export class OrkinismsComponent implements OnDestroy {

  orkinismList: Orkinism[] = [];
  filteredOrkinismList: Orkinism[] = [];
  title: string = 'Orkinisms - Tappy OS - Projects'
  private previousFavicon: string | null = null;

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/orkinisms-favicon.png');
    this.orkinismList = sortObjectArray(orkinisms, 'word');
    this.filteredOrkinismList = this.orkinismList; 
  }

  filterResults(text: string) {
    console.log(text);
    if (!text) {
      this.filteredOrkinismList = this.orkinismList;
      return;
    }
    this.filteredOrkinismList = sortObjectArray(this.orkinismList.filter((orkinism) =>
      orkinism.word.includes(text.toLowerCase()),
    ), "word");
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
