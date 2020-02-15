import fs from 'fs';

export default class Book {
  readonly isZipFile: boolean;
  // readonly title: string;

  constructor(epubPathOrBuffer: string | Buffer) {
    const isString = typeof epubPathOrBuffer === 'string';
    this.isZipFile = !isString || !fs.lstatSync(epubPathOrBuffer).isDirectory();

    if (this.isZipFile) {
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
