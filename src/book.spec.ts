import fs from 'fs';

import Book from './book';

describe('epub30-test-0100 - Tests for Content Documents in a reflowable context', () => {
  const epubFolderPath = './testsuite/content/30/epub30-test-0100';

  it('should read unpacked epub from folder path', () => {
    const book = new Book(epubFolderPath);
    expect(book.isZipFile).toEqual(false);
  });
});

describe('Lorem ipsum - Epub zip-file created with Apple Pages', () => {
  const epubFilePath = './examples/Lorem ipsum.epub';

  it('should read epub zip from file path', () => {
    const book = new Book(epubFilePath);
    expect(book.isZipFile).toEqual(true);
  });

  it('should read epub zip from file path', () => {
    const buffer = fs.readFileSync(epubFilePath);
    const book = new Book(buffer);
    expect(book.isZipFile).toEqual(true);
  });
});
