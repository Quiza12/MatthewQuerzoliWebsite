import { TestBed } from '@angular/core/testing';

import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts with an empty password and zero strength', () => {
    expect(service.getData()).toBe('');
    expect(service.passwordStrength).toBe(0);
  });

  it('stores and returns the password', () => {
    service.setData('hunter2');
    expect(service.getData()).toBe('hunter2');
  });

  it('overwrites the previous password', () => {
    service.setData('first');
    service.setData('second');
    expect(service.getData()).toBe('second');
  });

  it('is shared between everything that injects it', () => {
    TestBed.inject(PasswordService).setData('shared');
    expect(service.getData()).toBe('shared');
  });
});
