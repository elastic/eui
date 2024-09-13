import { buildTheme, EuiThemeShape } from '@elastic/eui';
import { colors } from './variables/_colors';
import { animation } from './variables/_animation';
import { breakpoint } from './variables/_breakpoint';
import { base, size } from './variables/_size';
import { border } from './variables/_borders';
import { levels } from './variables/_levels';
import { font } from './variables/_typography';
import { focus } from './variables/_states';

export const EUI_THEME_RAINBOW_KEY = 'EUI_THEME_RAINBOW';

export const euiThemeRainbow: EuiThemeShape = {
  colors,
  base,
  size,
  border,
  font,
  animation,
  breakpoint,
  levels,
  focus,
};

export const EuiThemeRainbow = buildTheme(
  euiThemeRainbow,
  EUI_THEME_RAINBOW_KEY,
);
