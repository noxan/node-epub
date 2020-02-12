import { parse } from 'fast-xml-parser';

export const parseXml = (xmlData: string) =>
  parse(xmlData, {
    attributeNamePrefix: '@',
    ignoreAttributes: false,
    ignoreNameSpace: true,
  });
