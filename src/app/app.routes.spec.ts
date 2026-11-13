import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { projects } from './projects/projects';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { TwoUp } from './projects/two-up/two-up';
import { TappyOsComponent } from './projects/tappy-os/tappy-os.component';

describe('app routes', () => {
  const paths = routes.map(r => r.path!);

  it('has no duplicate paths', () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('redirects the empty path to home', () => {
    const root = routes.find(r => r.path === '')!;
    expect(root.redirectTo).toBe('home');
    expect(root.pathMatch).toBe('full');
  });

  it('gives every other route a component', () => {
    routes.filter(r => r.path !== '').forEach(r => expect(r.component, r.path).toBeDefined());
  });

  it('maps the main pages', () => {
    const componentFor = (path: string) => routes.find(r => r.path === path)?.component;
    expect(componentFor('home')).toBe(HomeComponent);
    expect(componentFor('blog')).toBe(BlogComponent);
    expect(componentFor('blog/:slug')).toBe(BlogDetailComponent);
    expect(componentFor('projects/two-up')).toBe(TwoUp);
    expect(componentFor('projects/tappy-os')).toBe(TappyOsComponent);
  });

  it('has a page for every active internal project listed on the projects page', () => {
    const internal = projects.filter(p => p.internal && p.active && p.route !== '/projects');

    expect(internal.length).toBeGreaterThan(0);
    for (const project of internal) {
      expect(paths, `${project.name} (${project.route})`).toContain(project.route.replace(/^\//, ''));
    }
  });

  describe('navigation', () => {
    @Component({ template: '' })
    class Stub {}

    it('sends / to /home', async () => {
      TestBed.configureTestingModule({
        providers: [provideRouter([{ path: '', redirectTo: 'home', pathMatch: 'full' }, { path: 'home', component: Stub }])],
      });
      await RouterTestingHarness.create('/');
      expect(TestBed.inject(Router).url).toBe('/home');
    });
  });
});
