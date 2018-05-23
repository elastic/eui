import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiToggle } from '../../toggle';

import {
  ICON_TYPES,
  EuiIcon,
} from '../../icon';

const colorToClassNameMap = {
  default: '',
  primary: 'euiButtonToggle--primary',
  ghost: 'euiButtonToggle--ghost',
};

export const COLORS = Object.keys(colorToClassNameMap);

const iconSideToClassNameMap = {
  left: null,
  right: 'euiButtonToggle--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export class EuiButtonToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: this.props.selected || false,
    };
  }

  onToggleChange = (e) => {
    this.setState({ isSelected: e.target.checked });
    this.props.onClick;
  }

  render() {
    const {
      children,
      className,
      iconType,
      iconSide,
      color,
      isDisabled,
      buttonRef,
      toggleLabel,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiButtonToggle',
      colorToClassNameMap[color],
      iconSideToClassNameMap[iconSide],
      {
        'euiButtonToggle--isDisabled': isDisabled,
        'euiButtonToggle--fill': this.state.isSelected,
      }
    );

    const wrapperClasses = classNames(
      'euiButtonToggle__wrapper',
      className
    );

    // Add an icon to the button if one exists.
    let buttonIcon;

    if (iconType) {
      buttonIcon = (
        <EuiIcon
          className="euiButtonToggle__icon"
          type={iconType}
          size="m"
          aria-hidden="true"
        />
      );
    }

    return (
      <EuiToggle
        className={wrapperClasses}
        onChange={this.onToggleChange}
        disabled={isDisabled}
        label={toggleLabel}
      >
        <div
          className={classes}
          ref={buttonRef}
          {...rest}
        >
          <span className="euiButtonToggle__content">
            {buttonIcon}
            <span className="euiButtonToggle__text">{children}</span>
          </span>
        </div>
      </EuiToggle>
    );
  }
}

EuiButtonToggle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * See EuiIcon
   */
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(ICON_SIDES),

  /**
   * Define the color of the button
   */
  color: PropTypes.oneOf(COLORS),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  buttonRef: PropTypes.func,
  toggleLabel: PropTypes.string.isRequired,

  /**
   * Starting state of toggle
   */
  selected: PropTypes.bool,
};

EuiButtonToggle.defaultProps = {
  iconSide: 'left',
  color: 'default',
};
