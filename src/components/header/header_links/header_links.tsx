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

import React, { Component } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';
import { EuiPopover } from '../../popover';
import { EuiI18n } from '../../i18n';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItem,
} from '../header_section';

interface State {
  isOpen: boolean;
}

export class EuiHeaderLinks extends Component<CommonProps, State> {
  state: State = {
    isOpen: false,
  };

  onMenuButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.closeMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.closeMenu);
  }

  render() {
    const { children, className, ...rest } = this.props;

    const classes = classNames('euiHeaderLinks', className);

    const button = (
      <EuiHeaderSectionItem border="left">
        <EuiI18n
          token="euiHeaderLinks.openNavigationMenu"
          default="Open navigation menu">
          {(openNavigationMenu: string) => (
            <EuiHeaderSectionItemButton
              aria-label={openNavigationMenu}
              onClick={this.onMenuButtonClick}>
              <EuiIcon type="apps" size="m" />
            </EuiHeaderSectionItemButton>
          )}
        </EuiI18n>
      </EuiHeaderSectionItem>
    );

    return (
      <EuiI18n token="euiHeaderLinks.appNavigation" default="App navigation">
        {(appNavigation: string) => (
          <nav className={classes} aria-label={appNavigation} {...rest}>
            <div className="euiHeaderLinks__list" role="navigation">
              {children}
            </div>

            <EuiPopover
              className="euiHeaderLinks__mobile"
              ownFocus
              button={button}
              isOpen={this.state.isOpen}
              anchorPosition="downRight"
              closePopover={this.closeMenu}
              panelClassName="euiHeaderLinks__mobileList"
              panelPaddingSize="none">
              {children}
            </EuiPopover>
          </nav>
        )}
      </EuiI18n>
    );
  }
}
