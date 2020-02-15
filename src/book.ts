import fs from 'fs';

export default class Book {
  // readonly title: string;

  constructor(epubPathOrBuffer: string | Buffer) {
    const isString = typeof epubPathOrBuffer === 'string';
    if (isString && fs.lstatSync(epubPathOrBuffer).isDirectory()) {
      console.log('handle unpacked directory');
    } else {
      console.log('handle zip file');
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
