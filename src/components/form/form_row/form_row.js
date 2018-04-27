import React, {
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';

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
    const { focusHandler: onParentFocus } = this.props;

    // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
    const onChildFocus = get(this.props, 'children.props.onFocus');

    if (onParentFocus) {
      onParentFocus(...args);
    }

    if (onChildFocus) {
      onChildFocus(...args);
    }

    this.setState({
      isFocused: true,
    });
  }

  onBlur(...args) {
    const { blurHandler: onParentBlur } = this.props;

    // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
    const onChildBlur = get(this.props, 'children.props.onBlur');

    if (onParentBlur) {
      onParentBlur(...args);
    }

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
      blurHandler, // eslint-disable-line no-unused-vars
      focusHandler, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const { id } = this.state;

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
          htmlFor={id}
        >
          {label}
        </EuiFormLabel>
      );
    }

    const describingIds = [...describedByIds];
    if (optionalHelpText) {
      describingIds.push(optionalHelpText.props.id);
    }
    if (optionalErrors) {
      optionalErrors.forEach(error => describingIds.push(error.props.id));
    }

    const optionalProps = {};
    if (describingIds.length > 0) {
      optionalProps[`aria-describedby`] = describingIds.join(` `);
    }

    const field = cloneElement(children, {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
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
   * Function to call when children's onFocus is called
   */
  focusHandler: PropTypes.func,
  /**
   * Function to call when children's onBlur is called
   */
  blurHandler: PropTypes.func,
  /**
   * IDs of additional elements that should be part of children's `aria-describedby`
   */
  describedByIds: PropTypes.array,
};

EuiFormRow.defaultProps = {
  hasEmptyLabelSpace: false,
  fullWidth: false,
  describedByIds: [],
};
