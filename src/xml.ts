import { parse } from 'fast-xml-parser';

export const parseXML = (xmlData: string) =>
  parse(xmlData, {
    attributeNamePrefix: '@',
    ignoreAttributes: false,
    ignoreNameSpace: true,
  });
