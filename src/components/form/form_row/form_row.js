import React, {
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFormHelpText } from '../form_help_text';
import { EuiFormErrorText } from '../form_error_text';
import { EuiFormLabel } from '../form_label';

export class EuiFormRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      isFocused: true,
    });
  }

  onBlur() {
    this.setState({
      isFocused: false,
    });
  }

  render() {
    const {
      children,
      helpText,
      isInvalid,
      error,
      label,
      id,
      hasEmptyLabelSpace,
      fullWidth,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiFormRow',
      {
        'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'euiFormRow--fullWidth': fullWidth,
      },
      className
    );

    let optionalHelpText;

    if (helpText) {
      optionalHelpText = (
        <EuiFormHelpText className="euiFormRow__text">
          {helpText}
        </EuiFormHelpText>
      );
    }

    let optionalErrors;

    if (error) {
      const errorTexts = Array.isArray(error) ? error : [error];
      optionalErrors = errorTexts.map(error => (
        <EuiFormErrorText key={error} className="euiFormRow__text">
          {error}
        </EuiFormErrorText>
      ));
    }

    let optionalLabel;

    if (label) {
      optionalLabel = (
        <EuiFormLabel
          isFocused={this.state.isFocused}
          isInvalid={isInvalid}
          htmlFor={id}
        >
          {label}
        </EuiFormLabel>
      );
    }

    const field = cloneElement(children, {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    });

    return (
      <div
        className={classes}
        {...rest}
      >
        {optionalLabel}
        {field}
        {optionalErrors}
        {optionalHelpText}
      </div>
    );
  }
}

EuiFormRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
  id: PropTypes.string,
  isInvalid: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  helpText: PropTypes.node,
  hasEmptyLabelSpace: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

EuiFormRow.defaultProps = {
  hasEmptyLabelSpace: false,
  fullWidth: false,
};
