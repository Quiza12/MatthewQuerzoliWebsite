import { TestBed } from '@angular/core/testing';

import { ExternalJavascriptCdnPreloadService, ScriptStore } from './external-javascript-cdn-preload.service';

describe('ExternalJavascriptCdnPreloadService', () => {
  let service: ExternalJavascriptCdnPreloadService;
  let appended: HTMLScriptElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalJavascriptCdnPreloadService);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // jsdom never loads external scripts, so capture the tag instead and fire its events by hand.
    appended = [];
    vi.spyOn(document.head, 'appendChild').mockImplementation(<T extends Node>(node: T): T => {
      appended.push(node as unknown as HTMLScriptElement);
      return node;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const last = () => appended[appended.length - 1];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('ScriptStore', () => {
    it('has unique names', () => {
      const names = ScriptStore.map(s => s.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('has a source for every script', () => {
      ScriptStore.forEach(s => expect(s.src, s.name).toBeTruthy());
    });

    it('registers every script the projects preload', () => {
      const names = ScriptStore.map(s => s.name);
      for (const name of ['moment', 'chart', 'thebigone', 'ripmeanewone', 'itsfiveoclocksomewhere', 'tappystandardtime',
        'basic-bootstrap', 'rageagainstthelanyard', 'twoup']) {
        expect(names, name).toContain(name);
      }
    });
  });

  describe('loadScript', () => {
    it('adds a script tag with the right source to the head', () => {
      service.loadScript('chart');

      expect(appended.length).toBe(1);
      expect(last().tagName).toBe('SCRIPT');
      expect(last().type).toBe('text/javascript');
      expect(last().src).toContain('Chart.js/3.9.1/chart.min.js');
    });

    it('resolves as loaded once the script finishes loading', async () => {
      const promise = service.loadScript('chart');

      last().onload!(new Event('load'));

      await expect(promise).resolves.toEqual({ script: 'chart', loaded: true, status: 'loaded' });
    });

    it('does not add the script a second time after it has loaded', async () => {
      const first = service.loadScript('chart');
      last().onload!(new Event('load'));
      await first;

      const second = await service.loadScript('chart');

      expect(appended.length).toBe(1);
      expect(second).toEqual({ script: 'chart', loaded: true, status: 'Already loaded' });
    });

    it('keeps loaded state separately for each script', async () => {
      const chart = service.loadScript('chart');
      last().onload!(new Event('load'));
      await chart;

      service.loadScript('moment');

      expect(appended.length).toBe(2);
    });

    it('resolves (rather than rejects) as not loaded when the script fails', async () => {
      const promise = service.loadScript('chart');

      last().onerror!(new Event('error'));

      await expect(promise).resolves.toEqual({ script: 'chart', loaded: false, status: 'error' });
    });

    it('tries again after a failure', async () => {
      const failed = service.loadScript('chart');
      last().onerror!(new Event('error'));
      await failed;

      service.loadScript('chart');

      expect(appended.length).toBe(2);
    });

    it('rejects for a script name that is not in the store', async () => {
      await expect(service.loadScript('no-such-script')).rejects.toThrow();
    });
  });

  describe('load', () => {
    it('loads several scripts and resolves when they are all done', async () => {
      const promise = service.load('chart', 'moment');
      appended.forEach(s => s.onload!(new Event('load')));

      const results = await promise as { script: string; loaded: boolean }[];

      expect(appended.length).toBe(2);
      expect(results.map(r => r.script)).toEqual(['chart', 'moment']);
      expect(results.every(r => r.loaded)).toBe(true);
    });
  });

  describe('preloadExternalCdnsOnLoad', () => {
    it('loads each script in order, one after the other', async () => {
      const promise = service.preloadExternalCdnsOnLoad(['moment', 'chart'], 'Test');

      await vi.waitFor(() => expect(appended.length).toBe(1));
      expect(appended[0].src).toContain('moment');
      appended[0].onload!(new Event('load'));

      await vi.waitFor(() => expect(appended.length).toBe(2));
      expect(appended[1].src).toContain('chart');
      appended[1].onload!(new Event('load'));

      await expect(promise).resolves.toBe(true);
    });

    it('resolves true when there is nothing to load', async () => {
      await expect(service.preloadExternalCdnsOnLoad([], 'Test')).resolves.toBe(true);
    });

    it('resolves false if a script fails to load', async () => {
      const promise = service.preloadExternalCdnsOnLoad(['chart'], 'Test');

      await vi.waitFor(() => expect(appended.length).toBe(1));
      appended[0].onerror!(new Event('error'));

      await expect(promise).resolves.toBe(false);
    });

    it('logs which project it is loading for', async () => {
      const promise = service.preloadExternalCdnsOnLoad([], 'My Project');
      await promise;
      expect(console.log).toHaveBeenCalledWith('Loading external scripts for the My Project project...');
    });

    it('resolves false without throwing when a script name is unknown, and logs the error', async () => {
      await expect(service.preloadExternalCdnsOnLoad(['no-such-script'], 'Test')).resolves.toBe(false);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
