/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  FunctionComponent,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';
import { EuiIcon, IconType } from '../../icon';
import { EuiPopover, EuiPopoverProps } from '../../popover';
import { EuiI18n } from '../../i18n';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItemButtonProps,
} from '../header_section';
import { EuiBreakpointSize } from '../../../services/breakpoint';
import { EuiHideFor, EuiShowFor } from '../../responsive';

type EuiHeaderLinksGutterSize = 'xs' | 's' | 'm' | 'l';
type EuiHeaderLinksPopoverButtonProps = Partial<
  EuiHeaderSectionItemButtonProps
> & {
  iconType?: IconType;
};

export type EuiHeaderLinksProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
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

const gutterSizeToClassNameMap: {
  [gutterSize in EuiHeaderLinksGutterSize]: string;
} = {
  xs: '--gutterXS',
  s: '--gutterS',
  m: '--gutterM',
  l: '--gutterL',
};
export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

export const EuiHeaderLinks: FunctionComponent<EuiHeaderLinksProps> = ({
  children,
  className,
  gutterSize = 's',
  popoverBreakpoints = ['xs', 's'],
  popoverButtonProps,
  popoverProps,
  ...rest
}) => {
  const { onClick: _onClick, iconType = 'apps', ...popoverButtonRest } = {
    ...popoverButtonProps,
  };

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const onMenuButtonClick: MouseEventHandler<
    HTMLButtonElement & HTMLAnchorElement
  > = (e) => {
    _onClick && _onClick(e);
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  const closeMenu = () => {
    setMobileMenuIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  });

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

  return (
    <EuiI18n token="euiHeaderLinks.appNavigation" default="App menu">
      {(appNavigation: string) => (
        <nav className={classes} aria-label={appNavigation} {...rest}>
          <EuiHideFor sizes={popoverBreakpoints}>
            <div
              className={classNames('euiHeaderLinks__list', [
                `euiHeaderLinks__list${gutterSizeToClassNameMap[gutterSize]}`,
              ])}
            >
              {children}
            </div>
          </EuiHideFor>

          <EuiShowFor sizes={popoverBreakpoints}>
            <EuiPopover
              button={button}
              isOpen={mobileMenuIsOpen}
              anchorPosition="downRight"
              closePopover={closeMenu}
              panelPaddingSize="none"
              {...popoverProps}
            >
              <div
                className={classNames('euiHeaderLinks__mobileList', [
                  `euiHeaderLinks__mobileList${gutterSizeToClassNameMap[gutterSize]}`,
                ])}
              >
                {children}
              </div>
            </EuiPopover>
          </EuiShowFor>
        </nav>
      )}
    </EuiI18n>
  );
};
