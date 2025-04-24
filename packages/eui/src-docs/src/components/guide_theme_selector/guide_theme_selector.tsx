/* eslint-disable no-restricted-globals */
import React, { useState, useContext } from 'react';

import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';
import { EUI_THEME } from '../../../../src/themes';

import { ThemeContext } from '../with_theme';
import {
  EuiPopover,
  EuiHorizontalRule,
  EuiButton,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiSwitch,
  EuiSwitchEvent,
} from '../../../../src/components';
import { AVAILABLE_THEMES } from '../with_theme/theme_context';

export const GuideThemeSelector = () => {
  const context = useContext(ThemeContext);
  const euiThemeContext = useEuiTheme();

  const isForced = euiThemeContext.highContrastMode === 'forced';
  const colorMode =
    context.colorMode && !isForced
      ? context.colorMode
      : euiThemeContext.colorMode;
  const highContrastMode =
    context.colorMode && !isForced
      ? context.highContrastMode
      : euiThemeContext.highContrastMode;

  const currentTheme: EUI_THEME =
    AVAILABLE_THEMES.find((theme) => theme.value === context.theme) ||
    AVAILABLE_THEMES[0];

  const [isPopoverOpen, setPopover] = useState(false);
  const onButtonClick = () => setPopover(!isPopoverOpen);
  const closePopover = () => setPopover(false);

  const button = (
    <EuiThemeProvider colorMode="dark" wrapperProps={{ cloneElement: true }}>
      <EuiButton
        size="s"
        iconType="arrowDown"
        iconSide="right"
        color="text"
        minWidth={0}
        onClick={onButtonClick}
      >
        Theme
      </EuiButton>
    </EuiThemeProvider>
  );

  const toggles = [
    {
      label: 'Dark mode',
      checked: colorMode.toLowerCase() === 'dark',
      onChange: (e: EuiSwitchEvent) =>
        context.setContext({
          colorMode: e.target.checked ? 'DARK' : 'LIGHT',
        }),
      disabled: isForced,
    },
    {
      label: 'High contrast',
      checked: !!highContrastMode,
      onChange: (e: EuiSwitchEvent) =>
        context.setContext({ highContrastMode: e.target.checked }),
      disabled: isForced,
    },
    location.host.includes('803') && {
      label: 'i18n testing',
      checked: context.i18n === 'en-xa',
      onChange: (e: EuiSwitchEvent) =>
        context.setContext({ i18n: e.target.checked ? 'en-xa' : 'en' }),
    },
  ];

  return (
    <EuiPopover
      id="docsThemeSelector"
      repositionOnScroll
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downRight"
    >
      <EuiContextMenuPanel
        size="s"
        items={AVAILABLE_THEMES.map((theme) => {
          return (
            <EuiContextMenuItem
              key={theme.value}
              icon={currentTheme.value === theme.value ? 'check' : 'empty'}
              onClick={() => {
                closePopover();
                context.setContext({ theme: theme.value });
              }}
            >
              {theme.text}
            </EuiContextMenuItem>
          );
        })}
      />
      <EuiHorizontalRule margin="none" />
      {toggles.map((item) =>
        item ? (
          <div
            key={item.label}
            css={({ euiTheme }) => ({ padding: euiTheme.size.s })}
          >
            <EuiSwitch
              compressed
              label={item.label}
              checked={item.checked}
              onChange={item.onChange}
              disabled={item.disabled}
            />
          </div>
        ) : null
      )}
    </EuiPopover>
  );
};
