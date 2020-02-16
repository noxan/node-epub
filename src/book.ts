import fs from 'fs';
import camelcaseKeys from 'camelcase-keys';

import FileStorage, {
  ZipFileStorage,
  DirectoryFileStorage,
} from './file-storage';
import { readOpfFile } from './opf';

const findTagMeta = (meta: object[], id: string) =>
  meta && meta instanceof Array
    ? meta.find((item: any) => item.refines === `#${id}`)
    : {};

const ensureArray = (obj: any) => (obj instanceof Array ? obj : [obj]);

const findCoverImageId = (meta: object[]) => {
  if (meta && meta instanceof Array) {
    const coverImageObject: any = meta.find(
      (item: any) => item.name === 'cover',
    );
    return coverImageObject?.content || 'cover';
  }
  return 'cover';
};

interface Creator {
  id: string;
  meta: {
    property: string;
    refines: string;
    scheme: string;
    text: string;
  };
  text: string;
}

interface Identifier {
  id: string;
  text: string;
}

export default class Book {
  private files: FileStorage;
  readonly isZipFile: boolean;
  readonly title: string;
  readonly creator: Creator[];
  readonly language: string[];
  readonly identifier: Identifier;
  readonly coverImage: object | undefined = undefined;

  constructor(epubPathOrBuffer: string | Buffer) {
    const isString = typeof epubPathOrBuffer === 'string';
    this.isZipFile = !isString || !fs.lstatSync(epubPathOrBuffer).isDirectory();

    if (this.isZipFile) {
      this.files = new ZipFileStorage(epubPathOrBuffer);
    } else {
      this.files = new DirectoryFileStorage(epubPathOrBuffer as string);
    }

    const opf = readOpfFile(this.files);

    const {
      manifest: { item: manifest },
    } = opf;
    const { title, creator, meta, language, identifier } = opf.metadata;

    // Title
    this.title = typeof title === 'object' ? title.text : title;

    // Creator
    this.creator = ensureArray(creator).map((item: any) => ({
      ...item,
      meta: findTagMeta(meta, item.id),
    }));

    // Language
    this.language = ensureArray(language);

    // Identifier
    this.identifier = identifier;

    // Coverimage
    const coverImageId = findCoverImageId(meta);
    if (coverImageId) {
      const coverImage = manifest.find((item: any) => item.id === coverImageId);
      if (coverImage) {
        this.coverImage = camelcaseKeys(coverImage);
      }
    }
  }
}
