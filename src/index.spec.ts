import { EPub } from './index';

describe('node-epub', () => {
  it('should read epub metadata from file', () => {
    const epub = new EPub('./examples/Lorem Ipsum.epub');
    expect(epub.version).toEqual('3.0');
    expect(epub.metadata).toMatchSnapshot();
    expect(epub.spine).toMatchSnapshot();
    expect(epub.guide).toMatchSnapshot();
  });

  it('should find the cover image', () => {
    const epub = new EPub('./examples/Lorem Ipsum.epub');
    expect(epub.getCoverImage()).toEqual({
      href: 'images/cover-image.png',
      id: 'cover-image',
      mediaType: 'image/png',
    });
  });

  it('should get title of the book', () => {
    const epub = new EPub('./examples/Lorem Ipsum.epub');
    expect(epub.getTitle()).toEqual('Lorem ipsum');
  });

  it('should get title of the book of Die Verwandlung', () => {
    const epub = new EPub('./examples/Die Verwandlung - Franz Kafka.epub');
    expect(epub.getTitle()).toEqual('Die Verwandlung');
  });
});
