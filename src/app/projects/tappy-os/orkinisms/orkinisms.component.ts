import { Component } from '@angular/core';
import { Orkinism } from './classes/orkinism';
import { orkinisms } from './data/orkinisms';
import { sortObjectArray } from '../../../shared/libs/common';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-orkinisms',
  standalone: true,
  imports: [],
  templateUrl: './orkinisms.component.html',
  styleUrl: './orkinisms.component.css'
})
export class OrkinismsComponent {

  orkinismList: Orkinism[] = [];
  filteredOrkinismList: Orkinism[] = [];
  title: string = '📖 Orkinisms - Tappy OS - Projects'

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
    this.orkinismList = sortObjectArray(orkinisms, 'word');
    this.filteredOrkinismList = this.orkinismList; 
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredOrkinismList = this.orkinismList;
      return;
    }
    this.filteredOrkinismList = sortObjectArray(this.orkinismList.filter((orkinism) =>
      orkinism.word.includes(text.toLowerCase()),
    ), "word");
  }



}
