import { Component, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { setFavicon } from '../../shared/libs/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-out-of-office',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './out-of-office.html',
  styleUrl: './out-of-office.scss',
})
export class OutOfOffice implements OnDestroy {

  title: string = 'Out of Office//Pass the Parcel - Projects'
  private previousFavicon: string | null = null;

  constructor(private titleService: Title) {  
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/out-of-office-favicon.png');
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
  }
}
