/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { useIsWithinBreakpoints } from '../../../../src/services';
import { EUI_THEME, EUI_THEMES } from '../../../../src/themes';

import { ThemeContext } from '../with_theme';
// @ts-ignore Not TS
import { GuideLocaleSelector } from '../guide_locale_selector';
import {
  EuiText,
  EuiTourStep,
  EuiPopover,
  EuiHorizontalRule,
  EuiButton,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiLink,
  EuiIcon,
} from '../../../../src/components';

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

const STORAGE_KEY = 'legacy_theme_notification';

const GuideThemeSelectorComponent: React.FunctionComponent<GuideThemeSelectorProps> = ({
  context,
  onToggleLocale,
  selectedLocale,
}) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [isPopoverOpen, setPopover] = useState(false);
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(STORAGE_KEY) !== 'dismissed'
  );

  const onTourDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, 'dismissed');
  };

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
    setIsOpen(false);
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
    <EuiTourStep
      content={
        <EuiText style={{ maxWidth: 320 }}>
          <p>
            Amsterdam is now the only theme and the legacy theme has been
            removed.
          </p>
        </EuiText>
      }
      isStepOpen={isOpen}
      onFinish={onTourDismiss}
      step={1}
      stepsTotal={1}
      title={
        <>
          <EuiIcon type="bell" size="s" /> &nbsp; Theming update
        </>
      }
      footerAction={<EuiLink onClick={onTourDismiss}>Got it!</EuiLink>}
      repositionOnScroll
    >
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
    </EuiTourStep>
  );
};
