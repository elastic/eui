/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { EuiButton } from '../../../../src/components/button';
import {
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '../../../../src/components/context_menu';
import { EuiPopover } from '../../../../src/components/popover';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks/useIsWithinBreakpoints';
import { EUI_THEME, EUI_THEMES } from '../../../../src/themes';

import { ThemeContext } from '../with_theme';
// @ts-ignore Not TS
import { GuideLocaleSelector } from '../guide_locale_selector';

type GuideThemeSelectorProps = {
  onToggleLocale: () => {};
  selectedLocale: string;
  context?: any;
};

export const GuideThemeSelector: React.FunctionComponent<GuideThemeSelectorProps> = ({
  ...rest
}) => {
  return (
    <ThemeContext.Consumer>
      {(context) => <GuideThemeSelectorComponent context={context} {...rest} />}
    </ThemeContext.Consumer>
  );
};

// @ts-ignore Context has no type
const GuideThemeSelectorComponent: React.FunctionComponent<GuideThemeSelectorProps> = ({
  context,
  onToggleLocale,
  selectedLocale,
}) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
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
    <EuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      color="ghost"
      minWidth={0}
      onClick={onButtonClick}
    >
      {isMobileSize ? 'Theme' : currentTheme.text}
    </EuiButton>
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
