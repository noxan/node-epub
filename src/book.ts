import fs from 'fs';

export default class Book {
  readonly isArchive: boolean;
  // readonly title: string;

  constructor(epubPathOrBuffer: string | Buffer) {
    const isString = typeof epubPathOrBuffer === 'string';
    this.isArchive = !isString || !fs.lstatSync(epubPathOrBuffer).isDirectory();

    if (this.isArchive) {
      console.log('handle zip file');
    } else {
      console.log('handle unpacked directory');
    }
  }
}

// identifier: string;
// title: string;
// creator: string;
// publisher: string;
// language: string;

// coverImage: {
//   mediaType: string;
// };
