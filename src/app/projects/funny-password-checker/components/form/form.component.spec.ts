import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClipboardService } from 'ngx-clipboard';

import { FormComponent } from './form.component';
import { PasswordService } from '../../services/password/password.service';
import { StrengthsService } from '../../services/strengths/strengths.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let el: HTMLElement;
  let passwords: PasswordService;
  let strengths: StrengthsService;
  let clipboard: { copy: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    clipboard = { copy: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [{ provide: ClipboardService, useValue: clipboard }],
    }).compileComponents();

    passwords = TestBed.inject(PasswordService);
    strengths = TestBed.inject(StrengthsService);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  const reasonFor = (tag: string) => strengths.strengthReasons.find(r => r.tag === tag)!.reason;
  const type = (password: string) => component.onKey({ target: { value: password } });
  const flagged = (tag: string) => strengths.tempReasons.includes(reasonFor(tag));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {
    it('hides the password, with copying disabled', () => {
      expect(component.password).toBe('');
      expect(component.formType).toBe('password');
      expect(component.hideOrShowButtonTag).toBe('Show');
      expect(component.copyButtonDisabled).toBe(true);
      expect(component.copiedStatus).toBe('Copy Password');
      expect(el.querySelector('input')!.type).toBe('password');
      expect(el.querySelector<HTMLButtonElement>('.copyPassword')!.disabled).toBe(true);
    });
  });

  describe('show / hide', () => {
    it('showOrHidePassword reveals the password and enables copying', () => {
      component.showOrHidePassword();

      expect(component.formType).toBe('text');
      expect(component.hideOrShowButtonTag).toBe('Hide');
      expect(component.copyButtonDisabled).toBe(false);
    });

    it('showOrHidePassword hides it again and disables copying', () => {
      component.showOrHidePassword();
      component.showOrHidePassword();

      expect(component.formType).toBe('password');
      expect(component.hideOrShowButtonTag).toBe('Show');
      expect(component.copyButtonDisabled).toBe(true);
    });

    it('the Show button toggles the input type and its own label', () => {
      const button = el.querySelector<HTMLButtonElement>('.showPassword')!;

      button.click();
      fixture.detectChanges();
      expect(el.querySelector('input')!.type).toBe('text');
      expect(button.textContent).toContain('Hide Password');
      expect(el.querySelector<HTMLButtonElement>('.copyPassword')!.disabled).toBe(false);

      button.click();
      fixture.detectChanges();
      expect(el.querySelector('input')!.type).toBe('password');
      expect(button.textContent).toContain('Show Password');
    });
  });

  describe('copying', () => {
    it('copyText sends the text to the clipboard', () => {
      component.copyText('secret');
      expect(clipboard.copy).toHaveBeenCalledWith('secret');
    });

    it('the Copy button copies the current input value', () => {
      component.showOrHidePassword();
      fixture.detectChanges();
      const input = el.querySelector('input')!;
      input.value = 'my-password';

      el.querySelector<HTMLButtonElement>('.copyPassword')!.click();

      expect(clipboard.copy).toHaveBeenCalledWith('my-password');
    });

    it('copySuccess confirms the copy', () => {
      component.copySuccess();
      expect(component.copiedStatus).toBe('Password Copied!');
    });

    it('typing again resets the copy confirmation', () => {
      component.copySuccess();
      type('a');
      expect(component.copiedStatus).toBe('Copy Password');
    });
  });

  describe('onKey', () => {
    it('stores the typed password in the password service', () => {
      type('hunter2');
      expect(component.password).toBe('hunter2');
      expect(passwords.getData()).toBe('hunter2');
    });

    it('is triggered by typing in the input', () => {
      const input = el.querySelector('input')!;
      input.value = 'abc';
      input.dispatchEvent(new KeyboardEvent('keyup'));
      expect(passwords.getData()).toBe('abc');
    });

    it('replaces the previous reasons rather than adding to them', () => {
      type('abc');
      const first = strengths.tempReasons.length;
      type('abc');
      expect(strengths.tempReasons.length).toBe(first);
    });

    it('finds fewer problems with a stronger password', () => {
      type('a');
      const weak = strengths.tempReasons.length;
      type('Abcdefghij1!Justin-4-Jesus');
      expect(strengths.tempReasons.length).toBeLessThan(weak);
    });

    it('resets the running strength score each time', () => {
      type('Abcdefghij1!');
      const first = passwords.passwordStrength;
      type('Abcdefghij1!');
      expect(passwords.passwordStrength).toBe(first);
      expect(first).toBeGreaterThan(0);
    });
  });

  describe('rules that flag a password for LACKING something', () => {
    // [tag, a password that satisfies the rule]
    const satisfied: [string, string][] = [
      ['numerics', '1'],
      ['specialChars', '!'],
      ['uppercase', 'A'],
      ['lowercase', 'a'],
      ['nsync', 'Justin'],
      ['swearWords', 'shit'],
      ['grandFinal', '4'],
      ['jesus', 'Jesus'],
      ['avengers', 'Hulk'],
      ['gel', 'spiker'],
      ['genghis', 'Genghis'],
      ['wilson', 'Wilson'],
      ['love', 'love'],
      ['viagra', 'viagra'],
      ['prada', 'Prada'],
      ['lift', '20kg'],
      ['copyright', '©'],
      ['garlic', 'garlic'],
      ['kanye', 'canonlymakemestronger'],
      ['oils', 'onlythestrong'],
      ['eggs', 'eggs'],
      ['wrench', 'ball'],
      ['nuts', 'almond'],
      ['sherpa', 'sherpa'],
      ['pm', 'hard'],
      ['depression', 'anxiety'],
      ['whitlams', 'loneliness'],
      ['bone', 'femur'],
    ];

    it.each(satisfied)('%s is flagged when missing and cleared when present', (tag, good) => {
      const bland = tag === 'lowercase' ? '1234567890' : 'zzzzzzzzzz'; // 'z' is itself lowercase
      type(bland);
      expect(flagged(tag), `${tag} should be flagged for a bland password`).toBe(true);

      type(`${bland}${good}`);
      expect(flagged(tag), `${tag} should be cleared by "${good}"`).toBe(false);
    });
  });

  describe('rules that flag a password for CONTAINING something', () => {
    // [tag, a password that trips the rule]
    const tripped: [string, string][] = [
      ['password', 'myPassword'],
      ['racist', 'wog'],
      ['penis', 'dick'],
      ['seven', '7'],
      ['avengersDead', 'Vision'],
      ['synonym', 'weak'],
      ['acid', 'ammonia'],
      ['corona', 'corona'],
    ];

    it.each(tripped)('%s is flagged only when present', (tag, bad) => {
      type('zzzzzzzzzz');
      expect(flagged(tag), `${tag} should not be flagged for a bland password`).toBe(false);

      type(`zzzzzzzzzz${bad}`);
      expect(flagged(tag), `${tag} should be flagged by "${bad}"`).toBe(true);
    });
  });

  describe('length rule', () => {
    it.each([['', true], ['12345678', true], ['123456789', false]] as [string, boolean][])(
      'password %j flagged as too short: %s', (password, tooShort) => {
        type(password);
        expect(flagged('length')).toBe(tooShort);
      });
  });

  describe('case-insensitive rules', () => {
    it('match regardless of case', () => {
      type('zzzzzzzzzzJUSTIN');
      expect(flagged('nsync')).toBe(false);
      type('zzzzzzzzzzPASSWORD');
      expect(flagged('password')).toBe(true);
    });
  });

  describe('sequential numbers rule', () => {
    it.each(['1234', 'abc789xyz', 'a456', '0123'])('flags %s', password => {
      type(password);
      expect(flagged('sequentialNumbers')).toBe(true);
    });

    it.each(['', '12', '135', '1a2b3c', '321', 'abcdefg', '1224'])('does not flag %j', password => {
      type(password);
      expect(flagged('sequentialNumbers')).toBe(false);
    });

    it('flags a run only once, however long it is', () => {
      type('123456789');
      const count = strengths.tempReasons.filter(r => r === reasonFor('sequentialNumbers')).length;
      expect(count).toBe(1);
    });

    it('no longer flags a password merely for containing the word password', () => {
      type('zzzzzzzzzzpassword');
      expect(flagged('password')).toBe(true);
      expect(flagged('sequentialNumbers')).toBe(false);
    });
  });

  describe('emoji rule', () => {
    it.each(['😂', '🍆', '🔥', '❤️', '😀'])('is satisfied by %s', emoji => {
      type('zzzzzzzzzz');
      expect(flagged('emoji')).toBe(true);

      type(`zzzzzzzzzz${emoji}`);
      expect(flagged('emoji')).toBe(false);
    });

    it('is not satisfied by plain text', () => {
      type('Abcdefghij1!');
      expect(flagged('emoji')).toBe(true);
    });
  });
});
