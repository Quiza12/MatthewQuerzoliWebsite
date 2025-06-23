import { TestBed } from '@angular/core/testing';

import { ExternalJavascriptCdnPreloadService } from './external-javascript-cdn-preload.service';

describe('ExternalJavascriptCdnPreloadService', () => {
  let service: ExternalJavascriptCdnPreloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalJavascriptCdnPreloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
