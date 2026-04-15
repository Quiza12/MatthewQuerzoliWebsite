import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-header',
  standalone: true,
  template: ''
})
class MockHeaderComponent {}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: ''
})
class MockFooterComponent {}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MockHeaderComponent,
        MockFooterComponent
      ]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
