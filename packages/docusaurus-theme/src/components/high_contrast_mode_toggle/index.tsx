import { useContext } from 'react';
import { useEuiTheme } from '@elastic/eui';

import { NavbarItem } from '../navbar_item';
import { AppThemeContext } from '../theme_context';

export const HighContrastModeToggle = () => {
  const euiThemeContext = useEuiTheme();

  const appContext = useContext(AppThemeContext);
  const { changeHighContrastMode } = appContext;

  const isForcedContrastMode = euiThemeContext.highContrastMode === 'forced';
  const _highContrastMode =
    appContext.highContrastMode && !isForcedContrastMode
      ? appContext.highContrastMode
      : euiThemeContext.highContrastMode;

  return (
    <NavbarItem
      title={'Toggle high contrast mode'}
      icon="contrast"
      isMenuItem={false}
      isSelected={!!_highContrastMode}
      onClick={() => changeHighContrastMode(!_highContrastMode)}
    />
  );
};
