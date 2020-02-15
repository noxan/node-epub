import Zip from 'adm-zip';

export default interface FileStorage {}

export class ZipFileStorage implements FileStorage {
  private zip: Zip;

  constructor(fileNameOrRawData: string | Buffer) {
    this.zip = new Zip(fileNameOrRawData);
  }
}

export class DirectoryFileStorage implements FileStorage {
  private rootDirectory: string;

  constructor(directoryPath: string) {
    this.rootDirectory = directoryPath;
  }
}
