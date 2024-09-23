/* eslint-disable no-restricted-globals */
import React, { useState, useContext } from 'react';

import { EuiThemeProvider, useEuiTheme } from '../../../../src/services';
import { EUI_THEME, EUI_THEMES } from '../../../../src/themes';

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

type GuideThemeSelectorProps = {
  onToggleLocale: Function;
  selectedLocale: string;
};

export const GuideThemeSelector: React.FunctionComponent<
  GuideThemeSelectorProps
> = ({ onToggleLocale, selectedLocale }) => {
  const context = useContext(ThemeContext);
  const euiThemeContext = useEuiTheme();
  const colorMode = context.colorMode ?? euiThemeContext.colorMode;
  const currentTheme: EUI_THEME =
    EUI_THEMES.find((theme) => theme.value === context.theme) || EUI_THEMES[0];

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
    },
    {
      label: 'High contrast',
      checked: context.highContrastMode ?? euiThemeContext.highContrastMode,
      onChange: (e: EuiSwitchEvent) =>
        context.setContext({ highContrastMode: e.target.checked }),
    },
    location.host.includes('803') && {
      label: 'i18n testing',
      checked: selectedLocale === 'en-xa',
      onChange: (e: EuiSwitchEvent) =>
        onToggleLocale(e.target.checked ? 'en-xa' : 'en'),
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
        items={EUI_THEMES.map((theme) => {
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
          <div css={({ euiTheme }) => ({ padding: euiTheme.size.s })}>
            <EuiSwitch
              compressed
              label={item.label}
              checked={item.checked}
              onChange={item.onChange}
            />
          </div>
        ) : null
      )}
    </EuiPopover>
  );
};
