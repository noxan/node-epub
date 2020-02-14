import { EPub } from './index';

describe('node-epub', () => {
  it('should read epub metadata from file', () => {
    const epub = new EPub('./examples/lorem-ipsum-pages.epub');
    expect(epub.version).toEqual('3.0');
    expect(epub.metadata).toMatchSnapshot();
    expect(epub.spine).toMatchSnapshot();
    expect(epub.guide).toMatchSnapshot();
  });

  it('should find the cover image', () => {
    const epub = new EPub('./examples/lorem-ipsum-pages.epub');
    expect(epub.getCoverImage()).toEqual({
      href: 'images/cover-image.png',
      id: 'cover-image',
      mediaType: 'image/png',
    });
  });
});
