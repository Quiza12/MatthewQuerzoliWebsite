import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

// Add CDN names and links here for different projects.
export const ScriptStore: Scripts[] = [
  { name: 'moment', src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment.min.js' },
  { name: 'chart', src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js' },
  { name: 'thebigone', src: '../../../assets/custom-js/the-big-one-faq.js' },
  { name: 'ripmeanewone', src: '../../../assets/custom-js/rip-me-a-new-one.js' },
  { name: 'itsfiveoclocksomewhere', src: '../../../assets/custom-js/its-five-oclock-somewhere.js' },
  { name: 'tappystandardtime', src: '../../../assets/custom-js/tappy-standard-time.js' }
];

@Injectable({
  providedIn: 'root'
})
export class ExternalJavascriptCdnPreloadService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  async preloadExternalCdnsOnLoad(preloadJsCdns: string[], project: string): Promise<boolean> {
    let result = false;
    console.log(`Loading external scripts for the ${project} project...`);
    try {
      for (const cdn of preloadJsCdns) {
        const result = await (async () => {
          return await this.loadScript(cdn);
        })();
        console.log(result);
      }
      console.log('External scripts loaded.');
    } catch (error) {
      console.error('Error loading script:', error);
    }
    return result;
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }
  
  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already loaded' });
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          console.log(`${name} loaded.`);
          resolve({ script: name, loaded: true, status: 'loaded' });
        };
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}
