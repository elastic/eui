/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import {
  EuiThemeProvider,
  useIsWithinBreakpoints,
} from '../../../../src/services';
import { EUI_THEME, EUI_THEMES } from '../../../../src/themes';

import { ThemeContext } from '../with_theme';
// @ts-ignore Not TS
import { GuideLocaleSelector } from '../guide_locale_selector';
import {
  EuiPopover,
  EuiHorizontalRule,
  EuiButton,
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '../../../../src/components';

type GuideThemeSelectorProps = {
  onToggleLocale: () => {};
  selectedLocale: string;
  context?: any;
};

export const GuideThemeSelector: React.FunctionComponent<
  GuideThemeSelectorProps
> = ({ ...rest }) => {
  return (
    <ThemeContext.Consumer>
      {(context) => <GuideThemeSelectorComponent context={context} {...rest} />}
    </ThemeContext.Consumer>
  );
};

const STORAGE_KEY = 'legacy_theme_notification';

const GuideThemeSelectorComponent: React.FunctionComponent<
  GuideThemeSelectorProps
> = ({ context, onToggleLocale, selectedLocale }) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
    localStorage.setItem(STORAGE_KEY, 'dismissed');
  };

  const closePopover = () => {
    setPopover(false);
  };

  const currentTheme: EUI_THEME =
    EUI_THEMES.find((theme) => theme.value === context.theme) || EUI_THEMES[0];

  const getIconType = (value: EUI_THEME['value']) => {
    return value === currentTheme.value ? 'check' : 'empty';
  };

  const items = EUI_THEMES.map((theme) => {
    return (
      <EuiContextMenuItem
        key={theme.value}
        icon={getIconType(theme.value)}
        onClick={() => {
          closePopover();
          context.changeTheme(theme.value);
        }}
      >
        {theme.text}
      </EuiContextMenuItem>
    );
  });

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
        {isMobileSize ? 'Theme' : currentTheme.text}
      </EuiButton>
    </EuiThemeProvider>
  );

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
      <EuiContextMenuPanel size="s" items={items} />
      {location.host.includes('803') && (
        <>
          <EuiHorizontalRule margin="none" />
          <div style={{ padding: 8 }}>
            <GuideLocaleSelector
              onToggleLocale={onToggleLocale}
              selectedLocale={selectedLocale}
            />
          </div>
        </>
      )}
    </EuiPopover>
  );
};
