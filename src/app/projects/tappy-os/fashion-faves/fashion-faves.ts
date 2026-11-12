import { Component, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../../shared/libs/common';
import { FashionFave } from './classes/fashionFave';
import { fashionFavesList } from './data/fashionFaves';
import { sortObjectArray } from '../../../shared/libs/common';

@Component({
  selector: 'app-fashion-faves',
  imports: [],
  templateUrl: './fashion-faves.html',
  styleUrl: './fashion-faves.css',
})
export class FashionFaves implements OnDestroy {

  fashionFavesList: FashionFave[] = [];
  filteredFashionFavesList: FashionFave[] = [];
  title: string = 'Tap\'s Fashion Faves - Tappy OS - Projects'
  private previousFavicon: string | null = null;

  constructor(private titleService: Title) {
    this.fashionFavesList = sortObjectArray(fashionFavesList, 'brand');
    this.filteredFashionFavesList = this.fashionFavesList; 
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/fashion-faves-favicon.png');
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
