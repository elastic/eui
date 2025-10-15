/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, useContext, useEffect, JSX } from 'react';
import type ColorModeToggleType from '@theme-init/ColorModeToggle';
import type { Props } from '@theme-original/ColorModeToggle';
import type { WrapperProps } from '@docusaurus/types';
import { EuiThemeColorMode } from '@elastic/eui';
import { translate } from '@docusaurus/Translate';

import { NavbarItem } from '../../components/navbar_item';
import { AppThemeContext } from '../../components/theme_context';

type WrappedProps = WrapperProps<typeof ColorModeToggleType>;

/**
 * Additional wrapper to connect Docusaurus color mode with EUI theme
 */
function ColorModeToggle({
  value,
  onChange,
  ...rest
}: WrappedProps): JSX.Element {
  const { colorMode, changeColorMode } = useContext(AppThemeContext);

  useEffect(() => {
    changeColorMode(value);
  }, [value, colorMode, changeColorMode]);

  const handleOnChange = (colorMode: EuiThemeColorMode) => {
    changeColorMode(colorMode);
    onChange?.(colorMode);
  };

  return (
    <OriginalColorModeToggle
      value={colorMode}
      onChange={handleOnChange}
      {...rest}
    />
  );
}

function OriginalColorModeToggle({
  className,
  value,
  onChange,
}: Props): JSX.Element {
  const isDarkMode = value === 'dark';

  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        value === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    }
  );

  const handleOnChange = useCallback(() => {
    onChange(value === 'dark' ? 'light' : 'dark');
  }, [value, onChange]);

  return (
    <NavbarItem
      className={className}
      title={title}
      icon={isDarkMode ? 'sun' : 'moon'}
      isMenuItem={false}
      onClick={handleOnChange}
    />
  );
}

export default React.memo(ColorModeToggle);
