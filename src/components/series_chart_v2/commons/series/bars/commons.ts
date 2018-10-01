import { Accessor } from '../../data_ops/accessor';
import { Datum } from '../specs';
import { BarGlyph, BarGlyphGroup } from './rendering';

export interface BarScaleFnConfig {
  accessor: Accessor;
  scale: (datum: any) => number;
  barWidth: number;
}

export const DEFAULT_BAR_WIDTH = 10;

export function getDataFromBarGlyphs(glyphs: BarGlyphGroup[] | BarGlyph[]) {
  return getRecursiveDataFromBarGluphs(glyphs);
}

function getRecursiveDataFromBarGluphs(glyphs: BarGlyphGroup[] | BarGlyph[]): Datum[] {
  if (isBarGlyphGroupLeaf(glyphs)) {
    return (glyphs as BarGlyph[]).map(({ data }) => data);
  }
  return (glyphs as BarGlyphGroup[]).reduce((acc: Datum[], glyph) => {
    return [
      ...acc,
      ...getRecursiveDataFromBarGluphs(glyph.elements),
    ];
  }, []);
}

function isBarGlyphGroupLeaf(glyph: BarGlyphGroup[] | BarGlyph[]) {
  return Array.isArray(glyph) && glyph.length > 0 && !(glyph[0] as BarGlyphGroup).accessor;
}
