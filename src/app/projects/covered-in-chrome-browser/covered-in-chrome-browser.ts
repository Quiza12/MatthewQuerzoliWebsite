import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild, computed, effect, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SONGS, Song } from './songs';
import { setFavicon } from '../../shared/libs/common';

const THEME_KEY = 'covered-in-chrome-theme';

interface Tab {
  id: number;
  history: string[]; // song ids
  index: number;
  src: SafeResourceUrl;
}

@Component({
  selector: 'app-covered-in-chrome-browser',
  imports: [RouterLink],
  templateUrl: './covered-in-chrome-browser.html',
  styleUrl: './covered-in-chrome-browser.css',
})
export class CoveredInChromeBrowser implements AfterViewInit, OnDestroy {

  title: string = '(Covered in) Chrome Browser - Projects'

  songs: Song[] = SONGS;

  // Starts from the system theme, then remembers the visitor's choice.
  dark = signal<boolean>(this.initialDark());

  tabs = signal<Tab[]>([]);
  activeId = signal<number>(0);
  hiddenFrom = signal<number>(SONGS.length); // bookmarks from this index on live in the » menu
  overflowOpen = signal<boolean>(false);

  active = computed(() => this.tabs().find(t => t.id === this.activeId()));
  activeSongId = computed(() => {
    const tab = this.active();
    return tab ? tab.history[tab.index] : SONGS[0].id;
  });
  url = computed(() => `youtube.com/watch?v=${this.activeSongId()}`);
  canGoBack = computed(() => (this.active()?.index ?? 0) > 0);
  canGoForward = computed(() => {
    const tab = this.active();
    return !!tab && tab.index < tab.history.length - 1;
  });
  overflowSongs = computed(() => this.songs.slice(this.hiddenFrom()));

  @ViewChild('bookmarkList') bookmarkList!: ElementRef<HTMLElement>;
  @ViewChild('urlInput') urlInput!: ElementRef<HTMLInputElement>;

  private nextTabId = 1;
  private reloads = 0;
  private resizeObserver?: ResizeObserver;
  private previousFavicon: string | null = null;

  constructor(private sanitizer: DomSanitizer, private titleService: Title) {
    titleService.setTitle(this.title);
    this.previousFavicon = setFavicon('assets/images/favicons/cic-favicon.png');
    document.body.classList.add('cic-body');
    document.body.classList.add('info-dark');
    effect(() => document.body.classList.toggle('cic-dark', this.dark()));
    effect(() => document.body.classList.toggle('info-dark', this.dark()));

    this.createTab(SONGS[0].id);
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => this.layoutBookmarks());
    this.resizeObserver.observe(this.bookmarkList.nativeElement);
    this.layoutBookmarks();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.previousFavicon) setFavicon(this.previousFavicon, this.previousFavicon.endsWith('.ico') ? 'image/x-icon' : 'image/png');
    document.body.classList.remove('cic-body', 'cic-dark');
  }

  private initialDark(): boolean {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
    } catch { /* storage unavailable: fall back to the system theme */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    const dark = !this.dark();
    this.dark.set(dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch { /* not persisted */ }
  }

  songTitle(id: string): string {
    return this.songs.find(s => s.id === id)?.title ?? '';
  }

  tabTitle(tab: Tab): string {
    return `Violent Soho - ${this.songTitle(tab.history[tab.index])} - YouTube`;
  }

  // Pick a random song, avoiding anything already open in a tab where possible.
  private randomSongId(avoid: string[] = []): string {
    const open = new Set([...this.tabs().map(t => t.history[t.index]), ...avoid]);
    let pool = this.songs.filter(s => !open.has(s.id));
    if (!pool.length) pool = this.songs.filter(s => !avoid.includes(s.id));
    return pool[Math.floor(Math.random() * pool.length)].id;
  }

  // A fresh `r` value makes the iframe src differ, which forces a reload of the same song.
  private embedUrl(songId: string, reload = false): SafeResourceUrl {
    const r = reload ? `&r=${++this.reloads}` : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${songId}?autoplay=1&rel=0${r}`
    );
  }

  private createTab(songId: string): void {
    const tab: Tab = { id: this.nextTabId++, history: [songId], index: 0, src: this.embedUrl(songId) };
    this.tabs.update(tabs => [...tabs, tab]);
    this.activeId.set(tab.id);
  }

  private updateTab(tab: Tab, changes: Partial<Tab>): void {
    this.tabs.update(tabs => tabs.map(t => (t.id === tab.id ? { ...t, ...changes } : t)));
  }

  newTab(): void {
    this.createTab(this.randomSongId());
  }

  selectTab(tab: Tab): void {
    this.activeId.set(tab.id);
  }

  closeTab(tab: Tab, event: Event): void {
    event.stopPropagation();
    const tabs = this.tabs();
    const i = tabs.findIndex(t => t.id === tab.id);
    const remaining = tabs.filter(t => t.id !== tab.id);
    this.tabs.set(remaining);
    if (!remaining.length) {
      this.createTab(this.randomSongId([tab.history[tab.index]]));
    } else if (tab.id === this.activeId()) {
      this.activeId.set(remaining[Math.min(i, remaining.length - 1)].id);
    }
  }

  private navigate(songId: string): void {
    const tab = this.active();
    if (!tab) return;
    const history = [...tab.history.slice(0, tab.index + 1), songId];
    this.updateTab(tab, { history, index: history.length - 1, src: this.embedUrl(songId) });
  }

  private go(delta: number): void {
    const tab = this.active();
    if (!tab) return;
    const index = tab.index + delta;
    if (index < 0 || index >= tab.history.length) return;
    this.updateTab(tab, { index, src: this.embedUrl(tab.history[index]) });
  }

  back(): void { this.go(-1); }
  forward(): void { this.go(1); }

  reload(): void {
    const tab = this.active();
    if (tab) this.updateTab(tab, { src: this.embedUrl(tab.history[tab.index], true) });
  }

  openBookmark(song: Song, event: Event): void {
    event.preventDefault();
    this.overflowOpen.set(false);
    this.navigate(song.id);
  }

  // Whatever is typed in the address bar lands on a random song.
  submitOmnibox(event: Event): void {
    event.preventDefault();
    this.urlInput.nativeElement.blur();
    this.navigate(this.randomSongId([this.activeSongId()]));
  }

  resetOmnibox(): void {
    this.urlInput.nativeElement.value = this.url();
    this.urlInput.nativeElement.blur();
  }

  toggleOverflow(event: Event): void {
    event.stopPropagation();
    this.overflowOpen.update(open => !open);
  }

  @HostListener('document:click')
  closeOverflow(): void {
    this.overflowOpen.set(false);
  }

  // Bookmarks that don't fit in the bar move to the » menu. The » button always
  // reserves its space, so measuring here can't change the list's width.
  private layoutBookmarks(): void {
    const list = this.bookmarkList.nativeElement;
    const items = Array.from(list.children) as HTMLElement[];
    let hiddenFrom = items.length;
    items.forEach((el, i) => {
      if (i < hiddenFrom && el.offsetLeft + el.offsetWidth > list.clientWidth) hiddenFrom = i;
    });
    this.hiddenFrom.set(hiddenFrom);
  }
}
