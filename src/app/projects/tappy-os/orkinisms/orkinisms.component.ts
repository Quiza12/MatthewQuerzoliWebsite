import { Component } from '@angular/core';
import { Orkinism } from './classes/orkinism';
import { orkinisms } from './data/orkinisms';

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

  constructor() {
    this.orkinismList = orkinisms
    this.filteredOrkinismList = this.orkinismList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredOrkinismList = this.orkinismList;
      return;
    }
    this.filteredOrkinismList = this.orkinismList.filter((orkinism) =>
      orkinism.word.includes(text.toLowerCase()),
    );
  }

}
