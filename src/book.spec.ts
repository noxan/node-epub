import Book from './book';

describe('epub30-test-0100 - Tests for Content Documents in a reflowable context', () => {
  it('should read unpacked epub from folder path', () => {
    const epubFolderPath = './testsuite/content/30/epub30-test-0100';
    const book = new Book(epubFolderPath);
    expect(book).toMatchSnapshot();
  });
});
