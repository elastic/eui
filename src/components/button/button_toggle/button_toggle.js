import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiToggle } from '../../toggle';
import { EuiButton } from '../button';

export class EuiButtonToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: this.props.isSelected || false,
    };
  }

  onToggleChange = (e) => {
    this.setState({ isSelected: e.target.checked });
    this.props.onClick;
  }

  render() {
    const {
      className,
      color,
      isDisabled,
      label,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiButtonToggle',
    );

    const wrapperClasses = classNames(
      'euiButtonToggle__wrapper',
      {
        'euiButtonToggle--isDisabled': isDisabled,
      },
      className
    );

    return (
      <EuiToggle
        className={wrapperClasses}
        onChange={this.onToggleChange}
        isDisabled={isDisabled}
        checked={this.state.isSelected}
        label={label}
        inputClassName="euiButtonToggle__input"
      >
        <EuiButton
          tabIndex="-1" // prevents double focus from input to button
          className={classes}
          size="s"
          fill={this.state.isSelected}
          disabled={isDisabled}
          color={color}
          {...rest}
        >
          {label}
        </EuiButton>
      </EuiToggle>
    );
  }
}

EuiButtonToggle.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,

  /**
   * See EuiButton
   */
  color: PropTypes.string,

  /**
   * Button label, which is also passed to EuiToggle as the input's label
   */
  label: PropTypes.string.isRequired,

  /**
   * Starting state of toggle
   */
  isSelected: PropTypes.bool,
};

EuiButtonToggle.defaultProps = {
  color: 'text',
};
