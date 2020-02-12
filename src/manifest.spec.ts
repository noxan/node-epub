import manifestFixture from './manifest.fixture.json';
import { parseManifest } from './manifest';

describe('manifest', () => {
  it('should read epub metadata from file', () => {
    const manifest = parseManifest(manifestFixture);
    expect(manifest).toMatchSnapshot();
  });
});
