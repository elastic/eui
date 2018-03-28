import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ENTER, SPACE } from '../../../services/key_codes';

export class EuiComboBoxOption extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    optionRef: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    onEnterKey: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { onClick, option } = this.props;
    onClick(option);
  };

  onKeyDown = (e) => {
    if (e.keyCode === ENTER || e.keyCode === SPACE) {
      e.preventDefault();
      e.stopPropagation();
      const { onEnterKey, option } = this.props;
      onEnterKey(option);
    }
  };

  render() {
    const {
      children,
      className,
      optionRef,
      option, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onEnterKey, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames(
      'euiComboBoxOption',
      className
    );

    return (
      <button
        role="option"
        className={classes}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        ref={optionRef}
        tabIndex="-1"
        {...rest}
      >
        {children}
      </button>
    );
  }
}
