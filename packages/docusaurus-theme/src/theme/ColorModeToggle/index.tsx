import { useContext, useEffect } from 'react';
import OriginalColorModeToggle from '@theme-init/ColorModeToggle';
import type ColorModeToggleType from '@theme-init/ColorModeToggle';
import type { WrapperProps } from '@docusaurus/types';
import { EuiThemeColorMode } from '@elastic/eui';

import { AppThemeContext } from '../../components/theme_context';

type Props = WrapperProps<typeof ColorModeToggleType>;

export default function ColorModeToggle({
  value,
  onChange,
  ...rest
}: Props): JSX.Element {
  const { theme, changeTheme } = useContext(AppThemeContext);

  useEffect(() => {
    changeTheme(value);
  }, []);

  const handleOnChange = (themeName: EuiThemeColorMode) => {
    changeTheme(themeName);
    onChange?.(themeName);
  };

  return (
    <>
      <OriginalColorModeToggle
        value={theme}
        onChange={handleOnChange}
        {...rest}
      />
    </>
  );
}
