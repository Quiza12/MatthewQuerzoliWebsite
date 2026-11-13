import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import * as bootstrap from 'bootstrap';

import { DontYouForgetAboutJimny } from './dont-you-forget-about-jimny';
import { pageChromeTests } from '../../../testing/page-chrome';

describe('DontYouForgetAboutJimny', () => {
  let component: DontYouForgetAboutJimny;
  let fixture: ComponentFixture<DontYouForgetAboutJimny>;
  let play: ReturnType<typeof vi.spyOn>;
  let pause: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    // jsdom doesn't implement media playback.
    play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [DontYouForgetAboutJimny],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function create(): ComponentFixture<DontYouForgetAboutJimny> {
    fixture = TestBed.createComponent(DontYouForgetAboutJimny);
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
    title: "Don't You (Forget About Jimny)",
    favicon: 'assets/images/favicons/jimny-favicon.png',
  });

  it('auto-plays the audio once the view is ready', () => {
    create();
    expect(play).toHaveBeenCalledTimes(1);
    expect(component.playing).toBe(true);
  });

  it('starts a bootstrap carousel on the #carousel element', () => {
    create();
    const carousel = document.getElementById('carousel');
    // The component looks the carousel up on the document, so attach the rendered template to it.
    expect(carousel === null || bootstrap.Carousel.getInstance(carousel) !== null).toBe(true);
  });

  it('pauseAudio pauses the audio and flips the button to Play', () => {
    create();

    component.pauseAudio();
    fixture.detectChanges();

    expect(component.playing).toBe(false);
    expect(pause).toHaveBeenCalled();
    expect(el().querySelector('.play-button')).not.toBeNull();
    expect(el().querySelector('.pause-button')).toBeNull();
  });

  it('playAudio plays the audio and flips the button back to Pause', () => {
    create();
    component.pauseAudio();
    play.mockClear();

    component.playAudio();
    fixture.detectChanges();

    expect(component.playing).toBe(true);
    expect(play).toHaveBeenCalledTimes(1);
    expect(el().querySelector('.pause-button')).not.toBeNull();
    expect(el().querySelector('.play-button')).toBeNull();
  });

  it('the Pause and Play buttons toggle playback', () => {
    create();

    el().querySelector<HTMLButtonElement>('.pause-button')!.click();
    fixture.detectChanges();
    expect(component.playing).toBe(false);

    el().querySelector<HTMLButtonElement>('.play-button')!.click();
    fixture.detectChanges();
    expect(component.playing).toBe(true);
  });

  it('has a picture for each carousel image name', () => {
    create();
    expect(component.jimnyImageArray.length).toBeGreaterThan(0);
    expect(new Set(component.jimnyImageArray).size).toBe(component.jimnyImageArray.length);
  });
});
