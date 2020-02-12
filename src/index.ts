import Zip from 'adm-zip';

class EPub {
  private zip: Zip;

  constructor(fileNameOrBuffer: string | Buffer) {
    this.zip = new Zip(fileNameOrBuffer);

    this.zip.getEntries().forEach(entry => console.log(entry.entryName));
  }
}
