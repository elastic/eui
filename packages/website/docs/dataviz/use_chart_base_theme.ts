import { DARK_THEME, LIGHT_THEME, Theme } from '@elastic/charts';
import { useEuiTheme } from '@elastic/eui';

/**
 * Returns base chart theme per current theme (aka `colorMode`)
 */
export const useChartBaseTheme = (): Theme => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';
  return isDarkTheme ? DARK_THEME : LIGHT_THEME;
};
