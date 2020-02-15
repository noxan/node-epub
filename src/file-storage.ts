import path from 'path';
import fs from 'fs';
import Zip from 'adm-zip';

export default interface FileStorage {
  readAsText(fileName: string, encoding?: string): string;
}

export class ZipFileStorage implements FileStorage {
  private zip: Zip;

  constructor(fileNameOrRawData: string | Buffer) {
    this.zip = new Zip(fileNameOrRawData);
  }

  readAsText(fileName: string, encoding = 'utf-8'): string {
    return this.zip.readAsText(fileName, encoding);
  }
}

export class DirectoryFileStorage implements FileStorage {
  private rootDirectory: string;

  constructor(directoryPath: string) {
    this.rootDirectory = directoryPath;
  }

  readAsText(fileName: string, encoding = 'utf-8') {
    const filePath = path.join(this.rootDirectory, fileName);
    return fs.readFileSync(filePath, { encoding });
  }
}
