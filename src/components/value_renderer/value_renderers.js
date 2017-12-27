import { text } from './text';
import { date } from './date';
import { number } from './number';
import { booleanText, booleanIcon } from './boolean';
import { property, join } from './compound';
import { link } from './link';
import { defaultRenderer } from './default_renderer';
import { health } from './health';

export const ValueRenderers = {
  default: defaultRenderer,
  text,
  date,
  number,
  booleanText,
  booleanIcon,
  link,
  health,
  property,
  join
};






