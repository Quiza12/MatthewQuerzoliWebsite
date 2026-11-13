import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpcAnswersComponent } from './fpc-answers.component';
import { StrengthsService } from '../../../services/strengths/strengths.service';

describe('FpcAnswersComponent', () => {
  let component: FpcAnswersComponent;
  let fixture: ComponentFixture<FpcAnswersComponent>;
  let strengths: StrengthsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FpcAnswersComponent],
    }).compileComponents();

    strengths = TestBed.inject(StrengthsService);
    fixture = TestBed.createComponent(FpcAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads every reason and answer from the strengths service', () => {
    expect(component.getReasonsAndAnswers()).toBe(strengths.strengthReasons);
  });

  it('shows each reason alongside its answer', () => {
    const rows = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.results-collection p'));
    expect(rows.length).toBe(strengths.strengthReasons.length);

    rows.forEach((row, i) => {
      expect(row.querySelector('i')!.textContent).toBe(strengths.strengthReasons[i].reason);
      expect(row.querySelector('b')!.textContent).toBe(strengths.strengthReasons[i].answer);
    });
  });
});
