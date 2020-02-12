import fixutureFull from './manifest.fixture-full.json';
import fixutureMini from './manifest.fixture-mini.json';
import { parseManifest } from './manifest';

describe('manifest', () => {
  it('transform manifest fixture into key based object', () => {
    const manifest = parseManifest(fixutureMini);
    expect(manifest).toEqual({
      cover: {
        href: 'cover.xhtml',
        id: 'cover',
        mediaType: 'application/xhtml+xml',
      },
    });
  });
});
