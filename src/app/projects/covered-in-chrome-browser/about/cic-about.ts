import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { setFavicon } from '../../../shared/libs/common';

const THEME_KEY = 'covered-in-chrome-theme';

@Component({
  selector: 'app-cic-about',
  imports: [RouterLink],
  templateUrl: './cic-about.html',
  styleUrl: './cic-about.css',
})
export class CoveredInChromeAbout implements OnDestroy {

  private previousFavicon: string | null = null;

  constructor(titleService: Title) {
    titleService.setTitle('(Covered in) Chrome Browser - Projects');
    this.previousFavicon = setFavicon('assets/images/icons/google-chrome-icon.png');
    document.body.classList.add('cic-body', 'info-dark');
    document.body.classList.toggle('cic-dark', this.isDark());
    document.body.classList.toggle('info-dark', this.isDark());
  }

  ngOnDestroy(): void {
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
    document.body.classList.remove('cic-body', 'cic-dark', 'info-dark');
  }

  private isDark(): boolean {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
    } catch { }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
