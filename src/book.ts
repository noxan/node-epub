import fs from 'fs';

import FileStorage, {
  ZipFileStorage,
  DirectoryFileStorage,
} from './file-storage';
import { readOpfFile } from './opf';

const findTagMeta = (meta: object[], id: string) =>
  meta.find((item: any) => item.refines === `#${id}`);

const ensureArray = (obj: any) => (obj instanceof Array ? obj : [obj]);

export default class Book {
  private files: FileStorage;
  readonly isZipFile: boolean;
  readonly title: string;
  readonly creator: string[];
  readonly language: string | string[];

  constructor(epubPathOrBuffer: string | Buffer) {
    const isString = typeof epubPathOrBuffer === 'string';
    this.isZipFile = !isString || !fs.lstatSync(epubPathOrBuffer).isDirectory();

    if (this.isZipFile) {
      this.files = new ZipFileStorage(epubPathOrBuffer);
    } else {
      this.files = new DirectoryFileStorage(epubPathOrBuffer as string);
    }

    const opf = readOpfFile(this.files);

    const { title, creator, meta, language } = opf.metadata;

    // Title
    this.title = typeof title === 'object' ? title.text : title;

    // Creator
    this.creator = ensureArray(creator).map((item: any) => ({
      ...item,
      meta: findTagMeta(meta, item.id),
    }));

    // Language
    this.language = language;
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
