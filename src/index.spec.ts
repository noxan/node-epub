import { EPub } from './index';

describe('node-epub', () => {
  it('should read epub metadata from file', () => {
    const epub = new EPub('./examples/lorem-ipsum-pages.epub');
    expect(epub.metadata).toMatchSnapshot();
  });
});
