import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuietNearALittleStreamComponent } from './quiet-near-a-little-stream.component';
import { pageChromeTests } from '../../testing/page-chrome';

describe('QuietNearALittleStreamComponent', () => {
  let component: QuietNearALittleStreamComponent;
  let fixture: ComponentFixture<QuietNearALittleStreamComponent>;
  let play: ReturnType<typeof vi.spyOn>;
  let pause: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    // jsdom doesn't implement media playback.
    play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [QuietNearALittleStreamComponent],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function create(): ComponentFixture<QuietNearALittleStreamComponent> {
    fixture = TestBed.createComponent(QuietNearALittleStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  const el = () => fixture.nativeElement as HTMLElement;

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'Be Quiet Near a Little Stream and Listen - Projects',
    favicon: 'assets/images/favicons/quiet-near-a-little-stream-favicon.png',
  });

  it('auto-plays the stream once the view is ready', () => {
    create();
    expect(play).toHaveBeenCalledTimes(1);
    expect(component.playing).toBe(true);
  });

  it('points the audio element at the stream recording and loops it', () => {
    create();
    const audio = el().querySelector('audio')!;
    expect(audio.getAttribute('src')).toBe(component.audioSrc);
    expect(audio.loop).toBe(true);
  });

  it('starts with a Pause button and no Play button', () => {
    create();
    expect(el().querySelector('.pause-button')).not.toBeNull();
    expect(el().querySelector('.play-button')).toBeNull();
  });

  it('pauseAudio pauses and swaps the button to Play', () => {
    create();

    component.pauseAudio();
    fixture.detectChanges();

    expect(component.playing).toBe(false);
    expect(pause).toHaveBeenCalledTimes(1);
    expect(el().querySelector('.play-button')).not.toBeNull();
    expect(el().querySelector('.pause-button')).toBeNull();
  });

  it('playAudio resumes and swaps the button back to Pause', () => {
    create();
    component.pauseAudio();
    play.mockClear();

    component.playAudio();
    fixture.detectChanges();

    expect(component.playing).toBe(true);
    expect(play).toHaveBeenCalledTimes(1);
    expect(el().querySelector('.pause-button')).not.toBeNull();
  });

  it('the buttons drive playback', () => {
    create();

    el().querySelector<HTMLButtonElement>('.pause-button')!.click();
    fixture.detectChanges();
    expect(component.playing).toBe(false);

    el().querySelector<HTMLButtonElement>('.play-button')!.click();
    fixture.detectChanges();
    expect(component.playing).toBe(true);
  });
});
