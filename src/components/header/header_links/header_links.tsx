/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { HTMLAttributes, FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';
import { EuiIcon } from '../../icon';
import { EuiPopover } from '../../popover';
import { EuiI18n } from '../../i18n';
import { EuiHeaderSectionItemButton } from '../header_section';

type EuiHeaderLinksGutterSize = 'xs' | 's' | 'm' | 'l';

export type EuiHeaderLinksProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    gutterSize?: EuiHeaderLinksGutterSize;
  };

const gutterSizeToClassNameMap: {
  [gutterSize in EuiHeaderLinksGutterSize]: string;
} = {
  xs: 'euiHeaderLinks__list--gutterXS',
  s: 'euiHeaderLinks__list--gutterS',
  m: 'euiHeaderLinks__list--gutterM',
  l: 'euiHeaderLinks__list--gutterL',
};
export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

export const EuiHeaderLinks: FunctionComponent<EuiHeaderLinksProps> = ({
  children,
  className,
  gutterSize = 's',
  ...rest
}) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  const closeMenu = () => {
    setMobileMenuIsOpen(false);
  };

  // componentDidMount() {
  //   window.addEventListener('resize', this.closeMenu);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.closeMenu);
  // }

  const classes = classNames('euiHeaderLinks', className);

  const button = (
    <EuiI18n
      token="euiHeaderLinks.openNavigationMenu"
      default="Open navigation menu">
      {(openNavigationMenu: string) => (
        <EuiHeaderSectionItemButton
          aria-label={openNavigationMenu}
          onClick={onMenuButtonClick}>
          <EuiIcon type="apps" size="m" />
        </EuiHeaderSectionItemButton>
      )}
    </EuiI18n>
  );

  return (
    <EuiI18n token="euiHeaderLinks.appNavigation" default="App navigation">
      {(appNavigation: string) => (
        <nav className={classes} aria-label={appNavigation} {...rest}>
          <div
            className={classNames(
              'euiHeaderLinks__list',
              gutterSizeToClassNameMap[gutterSize]
            )}>
            {children}
          </div>

          <EuiPopover
            className="euiHeaderLinks__mobile"
            ownFocus
            button={button}
            isOpen={mobileMenuIsOpen}
            anchorPosition="downRight"
            closePopover={closeMenu}
            panelClassName="euiHeaderLinks__mobileList"
            panelPaddingSize="none">
            {children}
          </EuiPopover>
        </nav>
      )}
    </EuiI18n>
  );
};
