import React, {
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { get } from '../../../services/objects';

import { EuiFormHelpText } from '../form_help_text';
import { EuiFormErrorText } from '../form_error_text';
import { EuiFormLabel } from '../form_label';

import makeId from './make_id';

export class EuiFormRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      id: props.id || makeId()
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus(...args) {
    // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
    const onChildFocus = get(this.props, 'children.props.onFocus');
    if (onChildFocus) {
      onChildFocus(...args);
    }

    this.setState({
      isFocused: true,
    });
  }

  onBlur(...args) {
    // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
    const onChildBlur = get(this.props, 'children.props.onBlur');
    if (onChildBlur) {
      onChildBlur(...args);

    }

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
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      compressed,
      ...rest
    } = this.props;

    const { id } = this.state;

    const classes = classNames(
      'euiFormRow',
      {
        'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'euiFormRow--fullWidth': fullWidth,
        'euiFormRow--compressed': compressed,
      },
      className
    );

    let optionalHelpText;

    if (helpText) {
      optionalHelpText = (
        <EuiFormHelpText id={`${id}-help`} className="euiFormRow__text">
          {helpText}
        </EuiFormHelpText>
      );
    }

    let optionalErrors;

    if (error && isInvalid) {
      const errorTexts = Array.isArray(error) ? error : [error];
      optionalErrors = errorTexts.map((error, i) => (
        <EuiFormErrorText key={error} id={`${id}-error-${i}`} className="euiFormRow__text">
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
          aria-invalid={isInvalid}
          htmlFor={id}
        >
          {label}
        </EuiFormLabel>
      );
    }

    const optionalProps = {};
    const describingIds = [...describedByIds];

    if (optionalHelpText) {
      describingIds.push(optionalHelpText.props.id);
    }

    if (optionalErrors) {
      optionalErrors.forEach(error => describingIds.push(error.props.id));
    }

    if (describingIds.length > 0) {
      optionalProps[`aria-describedby`] = describingIds.join(` `);
    }

    const field = cloneElement(children, {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      compressed: compressed,
      ...optionalProps
    });

    return (
      <div
        className={classes}
        {...rest}
        id={`${id}-row`}
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
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  helpText: PropTypes.node,
  hasEmptyLabelSpace: PropTypes.bool,
  fullWidth: PropTypes.bool,
  /**
   * IDs of additional elements that should be part of children's `aria-describedby`
   */
  describedByIds: PropTypes.array,
  /**
   * Tightens up the spacing and sends down the
   * compressed prop to the input
   */
  compressed: PropTypes.bool,
};

EuiFormRow.defaultProps = {
  hasEmptyLabelSpace: false,
  fullWidth: false,
  describedByIds: [],
};
