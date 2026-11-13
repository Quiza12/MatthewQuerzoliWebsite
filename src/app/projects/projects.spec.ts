import { anyUnderConstruction, projects, Project, sortedProjects, tappyOsProjectPattern, Technology } from './projects';

describe('projects data', () => {
  it('has projects', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('gives every project a name, emoji, route and description', () => {
    for (const p of projects) {
      expect(p.name, 'name').toBeTruthy();
      expect(p.emoji, `emoji for ${p.name}`).toBeTruthy();
      expect(p.route, `route for ${p.name}`).toBeTruthy();
      expect(p.description, `description for ${p.name}`).toBeTruthy();
    }
  });

  it('has unique names', () => {
    const names = projects.map(p => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('uses in-app routes for internal projects and full URLs for active external ones', () => {
    for (const p of projects) {
      if (p.internal) {
        expect(p.route, p.name).toMatch(/^\/projects/);
      } else if (p.active) {
        expect(p.route, p.name).toMatch(/^https?:\/\//);
      }
    }
  });

  it('has unique routes among active internal projects', () => {
    const routes = projects.filter(p => p.internal && p.active).map(p => p.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('uses only known technologies', () => {
    const known = new Set(Object.values(Technology).filter(v => typeof v === 'number'));
    for (const p of projects) {
      p.technology.forEach(t => expect(known.has(t), p.name).toBe(true));
    }
  });

  it('constructs a project with its fields', () => {
    const p = new Project('Name', '🙂', '/projects/x', 'desc', 2024, true, false, true, [Technology.CSS]);
    expect(p).toMatchObject({
      name: 'Name', emoji: '🙂', route: '/projects/x', description: 'desc',
      year: 2024, internal: true, active: false, underConstruction: true, technology: [Technology.CSS],
    });
  });

  describe('sortedProjects', () => {
    it('is ordered newest year first', () => {
      const years = sortedProjects.map(p => p.year);
      expect(years).toEqual([...years].sort((a, b) => b - a));
    });

    it('is ordered alphabetically within a year', () => {
      for (let i = 1; i < sortedProjects.length; i++) {
        const prev = sortedProjects[i - 1];
        const next = sortedProjects[i];
        if (prev.year === next.year) {
          expect(prev.name.localeCompare(next.name)).toBeLessThanOrEqual(0);
        }
      }
    });
  });

  it('anyUnderConstruction reflects the project list', () => {
    expect(anyUnderConstruction).toBe(projects.some(p => p.underConstruction));
  });

  describe('tappyOsProjectPattern', () => {
    it('matches Tappy OS sub-project routes', () => {
      expect(tappyOsProjectPattern.test('/projects/tappy-os/orkinisms')).toBe(true);
      expect(tappyOsProjectPattern.test('/projects/Tappy-OS/orkinisms')).toBe(true);
    });

    it('does not match the Tappy OS landing page or other projects', () => {
      expect(tappyOsProjectPattern.test('/projects/tappy-os')).toBe(false);
      expect(tappyOsProjectPattern.test('/projects/tappy-os/')).toBe(false);
      expect(tappyOsProjectPattern.test('/projects/two-up')).toBe(false);
      expect(tappyOsProjectPattern.test('https://example.com/projects/tappy-os/x')).toBe(false);
    });
  });
});
