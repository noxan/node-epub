import Zip from 'adm-zip';

import { parseXml } from './xml';
import { parseManifest } from './manifest';

export class EPub {
  private zip: Zip;

  version: string;
  metadata: any;
  manifest: any;
  guide: any;
  spine: any;

  constructor(fileNameOrBuffer: string | Buffer) {
    this.zip = new Zip(fileNameOrBuffer);

    const opfFilePath = this.getOpfFilePath();
    const opfFileData = this.parseOpfFile(opfFilePath);

    this.version = opfFileData.version;
    this.metadata = opfFileData.metadata;
    this.manifest = parseManifest(opfFileData.manifest);
    this.spine = opfFileData.spine;
    this.guide = opfFileData.guide;
  }

  getTitle() {
    return this.metadata.title;
  }

  getCoverImage() {
    const coverImageId = this.metadata.meta.find(
      (item: any) => item.name === 'cover',
    );

    const coverImageManifest = this.manifest[coverImageId.content];
    return coverImageManifest;
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
