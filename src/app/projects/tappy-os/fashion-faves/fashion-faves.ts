import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FashionFave } from './classes/fashionFave';
import { fashionFavesList } from './data/fashionFaves';
import { sortObjectArray } from '../../../shared/libs/common';

@Component({
  selector: 'app-fashion-faves',
  imports: [],
  templateUrl: './fashion-faves.html',
  styleUrl: './fashion-faves.css',
})
export class FashionFaves {

  fashionFavesList: FashionFave[] = [];
  filteredFashionFavesList: FashionFave[] = [];
  title: string = '👗 Tap\'s Fashion Faves - Tappy OS - Projects'

  constructor(private titleService: Title) {
    this.fashionFavesList = sortObjectArray(fashionFavesList, 'brand');
    this.filteredFashionFavesList = this.fashionFavesList; 
    titleService.setTitle(this.title);
  }

}
