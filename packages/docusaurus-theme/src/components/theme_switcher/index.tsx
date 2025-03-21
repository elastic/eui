import { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import {
  EuiAvatar,
  EuiButtonEmpty,
  euiFocusRing,
  EuiHorizontalRule,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  EuiPopoverFooter,
  EuiSwitch,
  EuiSwitchEvent,
  useEuiMemoizedStyles,
  useEuiTheme,
  UseEuiTheme,
} from '@elastic/eui';

import { AppThemeContext, AVAILABLE_THEMES } from '../theme_context';

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    button: css`
      padding: 0;
    `,
    listItem: css`
      .euiListGroupItem__button:focus-visible {
        // overriding the global "outset" style to ensure the focus style is not cut off
        ${euiFocusRing(euiThemeContext, 'inset', {
          color: euiTheme.colors.primary,
        })};
      }
    `,
  };
};

export const ThemeSwitcher = () => {
  const euiThemeContext = useEuiTheme();
  const { euiTheme } = euiThemeContext;

  const [currentTheme, setCurrentTheme] = useState(
    AVAILABLE_THEMES[0]?.value ?? ''
  );
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const appContext = useContext(AppThemeContext);
  const { theme, changeTheme, changeHighContrastMode } = appContext;

  const isForcedContrastMode = euiThemeContext.highContrastMode === 'forced';
  const _highContrastMode =
    appContext.colorMode && !isForcedContrastMode
      ? appContext.highContrastMode
      : euiThemeContext.highContrastMode;

  useEffect(() => {
    changeTheme(currentTheme);
  }, [currentTheme]);

  const styles = useEuiMemoizedStyles(getStyles);

  const button = (
    <EuiButtonEmpty
      size="s"
      color="text"
      css={styles.button}
      onClick={() => setPopoverOpen((isOpen) => !isOpen)}
      aria-label={`${theme.text} theme`}
    >
      <EuiAvatar name={theme.text} size="s" color={euiTheme.colors.primary} />
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(false)}
      button={button}
      panelPaddingSize="none"
      repositionOnScroll
      aria-label="EUI theme list"
    >
      <EuiListGroup>
        {AVAILABLE_THEMES &&
          AVAILABLE_THEMES.map((theme) => {
            const isCurrentTheme = currentTheme === theme.value;

            const handleOnClick = () => {
              setCurrentTheme(theme.value);
            };

            return (
              <EuiListGroupItem
                key={theme.value}
                css={styles.listItem}
                label={theme.text}
                size="xs"
                isActive={isCurrentTheme}
                color={isCurrentTheme ? 'primary' : 'text'}
                onClick={handleOnClick}
              />
            );
          })}
      </EuiListGroup>
      <EuiPopoverFooter paddingSize="s">
        <EuiSwitch
          compressed
          label="High contrast"
          checked={!!_highContrastMode}
          onChange={(e: EuiSwitchEvent) => {
            changeHighContrastMode(!_highContrastMode);
          }}
          disabled={isForcedContrastMode}
        />
      </EuiPopoverFooter>
    </EuiPopover>
  );
};
