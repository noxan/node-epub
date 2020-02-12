import Zip from 'adm-zip';

import { parseXml } from './xml';

export class EPub {
  private zip: Zip;

  metadata: any;

  constructor(fileNameOrBuffer: string | Buffer) {
    this.zip = new Zip(fileNameOrBuffer);

    const opfFilePath = this.getOpfFilePath();
    const opfFileData = this.parseOpfFile(opfFilePath);

    this.metadata = opfFileData.metadata;
  }

  getOpfFilePath() {
    const containerText = this.zip.readAsText('META-INF/container.xml');
    const xmlData = parseXml(containerText);
    const opfFilePath = xmlData.container.rootfiles.rootfile['full-path'];
    return opfFilePath;
  }

  parseOpfFile(opfFilePath: string) {
    const opfData = this.zip.readAsText(opfFilePath);
    const xmlData = parseXml(opfData);
    return xmlData.package;
  }
}
