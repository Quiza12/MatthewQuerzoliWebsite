import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClipboardService } from 'ngx-clipboard';

import { FunnyPasswordCheckerComponent } from './funny-password-checker.component';
import { PasswordService } from './services/password/password.service';
import { StrengthsService } from './services/strengths/strengths.service';
import { pageChromeTests } from '../../testing/page-chrome';

describe('FunnyPasswordCheckerComponent', () => {
  let component: FunnyPasswordCheckerComponent;
  let fixture: ComponentFixture<FunnyPasswordCheckerComponent>;
  let el: HTMLElement;
  let passwords: PasswordService;
  let strengths: StrengthsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunnyPasswordCheckerComponent],
      providers: [{ provide: ClipboardService, useValue: { copy: vi.fn() } }],
    }).compileComponents();

    passwords = TestBed.inject(PasswordService);
    strengths = TestBed.inject(StrengthsService);
  });

  function create(): ComponentFixture<FunnyPasswordCheckerComponent> {
    fixture = TestBed.createComponent(FunnyPasswordCheckerComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
    return fixture;
  }

  function typeInForm(password: string): void {
    const input = el.querySelector('input')!;
    input.value = password;
    input.dispatchEvent(new KeyboardEvent('keyup'));
    fixture.detectChanges();
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'Funny Password Checker - Projects',
    favicon: 'assets/images/favicons/funny-password-checker-favicon.png',
  });

  describe('on init', () => {
    it('clears any password left over from a previous visit', () => {
      passwords.setData('left-over');
      create();
      expect(passwords.getData()).toBe('');
    });

    it('counts the visible strength reasons as the meter maximum', () => {
      create();
      const visible = strengths.strengthReasons.filter(r => !r.hidden).length;
      expect(component.strengthListLength).toBe(visible);
      expect(el.querySelector('meter')!.getAttribute('max')).toBe(String(visible));
    });

    it('renders the form', () => {
      create();
      expect(el.querySelector('fpc-form')).not.toBeNull();
      expect(el.querySelector('input')).not.toBeNull();
    });
  });

  describe('password length and wording', () => {
    beforeEach(() => create());

    it('getPassword returns what is in the password service', () => {
      passwords.setData('abc');
      expect(component.getPassword()).toBe('abc');
    });

    it('getPasswordLength returns the length of the password', () => {
      passwords.setData('abcd');
      expect(component.getPasswordLength()).toBe(4);
    });

    it('getPasswordLength is 0 when there is no password', () => {
      passwords.setData('');
      expect(component.getPasswordLength()).toBe(0);
    });

    it.each([[0, 'characters'], [1, 'character'], [2, 'characters'], [10, 'characters']])(
      'a %i length password says "%s"', (length, word) => {
        passwords.setData('x'.repeat(length));
        expect(component.getCharactersString()).toBe(word);
      });
  });

  describe('getPasswordStrength', () => {
    beforeEach(() => create());

    it('is 0 for an empty password', () => {
      passwords.setData('');
      expect(component.getPasswordStrength()).toBe(0);
    });

    it('is the number of visible rules minus the rules still failing', () => {
      passwords.setData('abc');
      strengths.tempReasons = ['one', 'two'];
      expect(component.getPasswordStrength()).toBe(component.strengthListLength - 2);
    });

    it('getTempReasonsLength counts the rules still failing', () => {
      strengths.tempReasons = ['one', 'two', 'three'];
      expect(component.getTempReasonsLength()).toBe(3);
    });
  });

  describe('getEncouragement', () => {
    beforeEach(() => create());

    it.each([
      [1, 'You might as print out your password and put it on a billboard.'],
      [3, 'You might as print out your password and put it on a billboard.'],
      [4, 'Better, but need to pump more iron.'],
      [7, 'Better, but need to pump more iron.'],
      [8, 'Harder...'],
      [12, "They'll have a hard time with this."],
      [16, 'Work it [desired gender term].'],
      [20, 'Oh yes...'],
      [24, 'Oh jeez, keep doing that with your tongue.'],
      [28, 'Yes...'],
      [32, 'GOD ALMIGHTY'],
      [36, "NO ONE'S GETTING PAST THIS!"],
    ])('a strength of %i says "%s"', (strength, message) => {
      vi.spyOn(component, 'getPasswordStrength').mockReturnValue(strength);
      expect(component.getEncouragement()).toBe(message);
    });

    it.each([0, 40, 100])('a strength of %i falls back to "Hello"', strength => {
      vi.spyOn(component, 'getPasswordStrength').mockReturnValue(strength);
      expect(component.getEncouragement()).toBe('Hello');
    });
  });

  describe('with the form', () => {
    it('updates the length wording as the user types', () => {
      create();

      typeInForm('a');
      expect(el.querySelector('.encouragment p')!.textContent).toContain('1 character long');

      typeInForm('abcdef');
      expect(el.querySelector('.encouragment p')!.textContent).toContain('6 characters long');
    });

    it('lists reasons the password is weak', () => {
      create();

      typeInForm('a');

      expect(el.querySelectorAll('.results-collection p').length).toBeGreaterThan(0);
    });

    it('shows at most nine reasons at once', () => {
      create();

      typeInForm('a');

      expect(strengths.tempReasons.length).toBeGreaterThan(9);
      expect(el.querySelectorAll('.results-collection p').length).toBe(9);
    });

    it('gives a stronger password a higher strength', () => {
      create();

      typeInForm('a');
      const weak = component.getPasswordStrength();
      typeInForm('Abcdefghij1!Justin-4-Jesus');

      expect(component.getPasswordStrength()).toBeGreaterThan(weak);
    });
  });
});
