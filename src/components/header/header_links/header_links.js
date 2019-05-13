import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';
import { EuiPopover } from '../../popover';
import { EuiI18n } from '../../i18n';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItem,
} from '../header_section';

export class EuiHeaderLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

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

  render() {
    const { children, className, ...rest } = this.props;

    const classes = classNames('euiHeaderLinks', className);

    const button = (
      <EuiHeaderSectionItem border="left">
        <EuiI18n
          token="euiHeaderLinks.openNavigationMenu"
          default="Open navigation menu">
          {openNavigationMenu => (
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
        {appNavigation => (
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

EuiHeaderLinks.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
