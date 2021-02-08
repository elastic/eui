import React, { useState } from 'react';

import { EuiButton } from '../../../../src/components/button';
import {
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '../../../../src/components/context_menu';
import { EuiPopover } from '../../../../src/components/popover';

import { ThemeContext } from '../with_theme';
import { EUI_THEME, EUI_THEMES } from '../../../../src/themes';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks/useIsWithinBreakpoints';

export const GuideThemeSelector = () => {
  return (
    <ThemeContext.Consumer>
      {(context) => <GuideThemeSelectorComponent context={context} />}
    </ThemeContext.Consumer>
  );
};

// @ts-ignore Context has no type
const GuideThemeSelectorComponent = ({ context }) => {
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
        }}>
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
      onClick={onButtonClick}>
      {isMobileSize ? 'Theme' : currentTheme.text}
    </EuiButton>
  );

  return (
    <EuiPopover
      id="docsThemeSelector"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downRight">
      <EuiContextMenuPanel size="s" items={items} />
    </EuiPopover>
  );
};
