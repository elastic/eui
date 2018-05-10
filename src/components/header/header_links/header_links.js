
import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';
import { EuiPopover } from '../../popover';
import { EuiHeaderSectionItemButton } from '../header_section';

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
      <EuiHeaderSectionItemButton onClick={this.onMenuButtonClick}>
        <EuiIcon type="list" size="m" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <div
        className={classes}
        {...rest}
      >

        <ul className="euiHeaderLinks__list">
          {children}
        </ul>


        <EuiPopover
          className="euiHeaderLinks__mobile"
          id="headerListMenu"
          ownFocus
          button={button}
          isOpen={this.state.isOpen}
          anchorPosition="downRight"
          closePopover={this.closeMenu}
          panelClassName="euiHeaderPopover"
        >
          {children}
        </EuiPopover>

      </div>
    );
  }
}

EuiHeaderLinks.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
