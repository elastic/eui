import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../flex';

import {
  EuiIcon,
} from '../icon';

const CHECKED_ON = 'on';
const CHECKED_OFF = 'off';

const resolveIconAndColor = (checked) => {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === CHECKED_ON ?
    { icon: 'check', color: 'text' } :
    { icon: 'cross', color: 'text' };
};

export class EuiFilterSelectItem extends Component {

  constructor(props) {
    super(props);
    this.state = { hasFocus: false };
  }

  focus = () => {
    if (this.buttonRef) {
      this.buttonRef.focus();
    }
  };

  onFocus = () => {
    if (this.mounted) {
      this.setState({ hasFocus: true });
    }
  };

  onBlur = () => {
    if (this.mounted) {
      this.setState({ hasFocus: false });
    }
  };

  hasFocus = () => {
    return this.state.hasFocus;
  };

  render() {
    const { children, className, disabled, checked, ...rest } = this.props;
    const classes = classNames('euiFilterSelectItem', className);
    const { icon, color } = resolveIconAndColor(checked);
    return (
      <button
        ref={(ref) => this.buttonRef = ref}
        className={classes}
        type="button"
        disabled={disabled}
        {...rest}
      >
        <EuiFlexGroup
          alignItems="center"
          gutterSize="s"
          component="span"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiIcon color={color} type={icon}/>
          </EuiFlexItem>
          <EuiFlexItem>
            {children}
          </EuiFlexItem>
        </EuiFlexGroup>
      </button>
    );
  }
}

EuiFilterSelectItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Applies an icon and visual styling to activated items
   */
  checked: PropTypes.oneOf([ CHECKED_ON, CHECKED_OFF ]),
};
