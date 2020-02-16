import fs from 'fs';

import Book from './book';

describe('epub30-test-0100 - Tests for Content Documents in a reflowable context', () => {
  const epubFolderPath = './testsuite/content/30/epub30-test-0100';

  it('should read unpacked epub from folder path', () => {
    const book = new Book(epubFolderPath);
    expect(book.isZipFile).toEqual(false);
  });

  it('should have the right title', () => {
    const book = new Book(epubFolderPath);
    expect(book.title).toEqual('EPUBTEST 0100 - Reflowable Content Tests');
  });

  it('should have one or multiple creators', () => {
    const book = new Book(epubFolderPath);
    expect(book.creator).toEqual([
      {
        id: 'creator1',
        property: 'role',
        refines: '#creator1',
        scheme: 'marc:relators',
        text: 'aut',
      },
      {
        id: 'creator2',
        property: 'role',
        refines: '#creator2',
        scheme: 'marc:relators',
        text: 'aut',
      },
      {
        id: 'creator3',
        property: 'role',
        refines: '#creator3',
        scheme: 'marc:relators',
        text: 'aut',
      },
      {
        id: 'creator4',
        property: 'role',
        refines: '#creator4',
        scheme: 'marc:relators',
        text: 'aut',
      },
      {
        id: 'creator5',
        property: 'role',
        refines: '#creator5',
        scheme: 'marc:relators',
        text: 'aut',
      },
      {
        id: 'creator6',
        property: 'role',
        refines: '#creator6',
        scheme: 'marc:relators',
        text: 'aut',
      },
    ]);
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

  it('should have the right title', () => {
    const book = new Book(epubFilePath);
    expect(book.title).toEqual('Lorem ipsum');
  });

  it('should have one or multiple creators', () => {
    const book = new Book(epubFilePath);
    expect(book.creator).toEqual([
      {
        id: 'creator',
        property: 'role',
        refines: '#creator',
        scheme: 'marc:relators',
        text: 'aut',
      },
    ]);
  });
});
