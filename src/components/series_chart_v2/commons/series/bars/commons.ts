import { Accessor } from '../../utils/accessor';
import { Datum } from '../specs';
import { BarGlyphGroup } from './rendering';

export interface BarScaleFnConfig {
  accessor: Accessor;
  scale: (datum: any) => number;
  barWidth: number;
}

export const DEFAULT_BAR_WIDTH = 10;

export function getDataFromBarGlyphs(glyphs: BarGlyphGroup[]): Datum[] {
  return getRecursiveDataFromBarGluphs(glyphs);
}

function getRecursiveDataFromBarGluphs(glyphs: BarGlyphGroup[]): Datum[] {
  if (isBarGlyphGroupLeaf(glyphs)) {
    return (glyphs).map(({ data }) => data);
  }
  return (glyphs).reduce((acc: Datum[], glyph) => {
    if (glyph.elements) {
      return [
        ...acc,
        ...getRecursiveDataFromBarGluphs(glyph.elements),
      ];
    }
    return acc;
  }, []);
}

export function isBarGlyphGroupLeaf(glyph: BarGlyphGroup[]) {
  return Array.isArray(glyph) && glyph.length > 0 && glyph[0].data;
}
