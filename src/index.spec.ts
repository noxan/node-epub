import { EPub } from './index';

describe('node-epub', () => {
  it('should read epub metadata from file', () => {
    const epub = new EPub('./examples/lorem-ipsum-pages.epub');
    expect(epub.version).toEqual('3.0');
    expect(epub.metadata).toMatchSnapshot();
    expect(epub.manifest).toMatchSnapshot();
    expect(epub.spine).toMatchSnapshot();
    expect(epub.guide).toMatchSnapshot();
  });
});
