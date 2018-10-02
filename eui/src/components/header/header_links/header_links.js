
import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';
import { EuiPopover } from '../../popover';
import { EuiHeaderSectionItemButton, EuiHeaderSectionItem } from '../header_section';

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
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames('euiHeaderLinks', className);

    const button = (
      <EuiHeaderSectionItem border="left">
        <EuiHeaderSectionItemButton
          aria-label="Open navigation menu"
          onClick={this.onMenuButtonClick}
        >
          <EuiIcon type="apps" size="m" />
        </EuiHeaderSectionItemButton>
      </EuiHeaderSectionItem>
    );

    return (
      <nav
        className={classes}
        aria-label="App navigation"
        {...rest}
      >

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
          panelPaddingSize="none"
        >
          {children}
        </EuiPopover>

      </nav>
    );
  }
}

EuiHeaderLinks.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
