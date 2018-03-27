import React, {
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../icon';

export class EuiContextMenuItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onClick: PropTypes.func,
    hasPanel: PropTypes.bool,
    buttonRef: PropTypes.func,
    disabled: PropTypes.bool,
  };

  render() {
    const {
      children,
      className,
      hasPanel,
      icon,
      buttonRef,
      disabled,
      ...rest
    } = this.props;

    let iconInstance;

    if (icon) {
      switch (typeof icon) {
        case 'string':
          iconInstance = (
            <EuiIcon
              type={icon}
              size="m"
              className="euiContextMenu__icon"
            />
          );
          break;

        default:
          // Assume it's already an instance of an icon.
          iconInstance = cloneElement(icon, {
            className: 'euiContextMenu__icon'
          });
      }
    }

    let arrow;

    if (hasPanel) {
      arrow = (
        <EuiIcon
          type="arrowRight"
          size="m"
          className="euiContextMenu__arrow"
        />
      );
    }

    const classes = classNames('euiContextMenuItem', className, {
      'euiContextMenuItem-isDisabled': disabled,
    });

    return (
      <button
        className={classes}
        type="button"
        ref={buttonRef}
        disabled={disabled}
        {...rest}
      >
        <span className="euiContextMenu__itemLayout">
          {iconInstance}
          <span className="euiContextMenuItem__text">
            {children}
          </span>
          {arrow}
        </span>
      </button>
    );
  }
}
