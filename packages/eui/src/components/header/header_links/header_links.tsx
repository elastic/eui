/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  HTMLAttributes,
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import { CommonProps } from '../../common';
import { EuiIcon, IconType } from '../../icon';
import { EuiPopover, EuiPopoverProps } from '../../popover';
import { EuiI18n } from '../../i18n';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItemButtonProps,
} from '../header_section';
import { EuiBreakpointSize } from '../../../services/breakpoint';
import { EuiHideFor, EuiShowFor } from '../../responsive';

import { euiHeaderLinksStyles } from './header_links.styles';

export const GUTTER_SIZES = ['xxs', 'xs', 's', 'm', 'l'] as const;
type EuiHeaderLinksGutterSize = (typeof GUTTER_SIZES)[number];

type EuiHeaderLinksPopoverButtonProps =
  Partial<EuiHeaderSectionItemButtonProps> & {
    iconType?: IconType;
  };

export type EuiHeaderLinksProps = CommonProps &
  Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    /**
     * Takes any rendered node(s), typically of `EuiHeaderLink`s.
     *
     * Optionally takes a render function that will pass a callback allowing you
     * to close the mobile popover from within your popover content.
     */
    children?: ReactNode | ((closeMobilePopover: () => void) => ReactNode);
    /**
     * Spacing between direct children
     */
    gutterSize?: EuiHeaderLinksGutterSize;
    /**
     * A list of named breakpoints at which to show the popover version
     */
    popoverBreakpoints?: EuiBreakpointSize[] | 'all' | 'none';
    /**
     * Extend the functionality of the EuiPopover.button which is a EuiHeaderSectionItemButton.
     * With the addition of `iconType` to change the display icon which defaults to `apps`
     */
    popoverButtonProps?: EuiHeaderLinksPopoverButtonProps;
    /**
     * Extend the functionality of the EuiPopover
     */
    popoverProps?: Omit<EuiPopoverProps, 'button' | 'closePopover'>;
  };

export const EuiHeaderLinks: FunctionComponent<EuiHeaderLinksProps> = ({
  children,
  className,
  gutterSize = 's',
  popoverBreakpoints = ['xs', 's'],
  popoverButtonProps,
  popoverProps,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiHeaderLinksStyles(euiTheme);

  const {
    onClick,
    iconType = 'apps',
    ...popoverButtonRest
  } = popoverButtonProps || {};

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const onMenuButtonClick: MouseEventHandler<
    HTMLButtonElement & HTMLAnchorElement
  > = useCallback(
    (e) => {
      onClick?.(e);
      setMobileMenuIsOpen((mobileMenuIsOpen) => !mobileMenuIsOpen);
    },
    [onClick]
  );

  const closeMenu = useCallback(() => {
    setMobileMenuIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  }, [closeMenu]);

  const classes = classNames('euiHeaderLinks', className);

  const button = (
    <EuiI18n token="euiHeaderLinks.openNavigationMenu" default="Open menu">
      {(openNavigationMenu: string) => (
        <EuiHeaderSectionItemButton
          aria-label={openNavigationMenu}
          onClick={onMenuButtonClick}
          {...popoverButtonRest}
        >
          <EuiIcon type={iconType} size="m" />
        </EuiHeaderSectionItemButton>
      )}
    </EuiI18n>
  );

  const renderedChildren =
    typeof children === 'function' ? children(closeMenu) : children;

  return (
    <EuiI18n token="euiHeaderLinks.appNavigation" default="App menu">
      {(appNavigation: string) => (
        <nav
          className={classes}
          css={styles.euiHeaderLinks}
          aria-label={appNavigation}
          {...rest}
        >
          <EuiHideFor sizes={popoverBreakpoints}>
            <div
              className="euiHeaderLinks__list"
              css={[
                styles.euiHeaderLinks__list,
                styles.gutterSizes[gutterSize],
              ]}
            >
              {renderedChildren}
            </div>
          </EuiHideFor>

          <EuiShowFor sizes={popoverBreakpoints}>
            <EuiPopover
              button={button}
              isOpen={mobileMenuIsOpen}
              anchorPosition="downRight"
              closePopover={closeMenu}
              panelPaddingSize="s"
              repositionOnScroll
              {...popoverProps}
            >
              <div
                className="euiHeaderLinks__mobileList"
                css={styles.euiHeaderLinks__mobileList}
              >
                {renderedChildren}
              </div>
            </EuiPopover>
          </EuiShowFor>
        </nav>
      )}
    </EuiI18n>
  );
};
