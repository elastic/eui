import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { get } from '../../../services/objects';
import { withRequiredProp } from '../../../utils/prop_types/with_required_prop';

import { EuiFormHelpText } from '../form_help_text';
import { EuiFormErrorText } from '../form_error_text';
import { EuiFormLabel } from '../form_label';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

import makeId from './make_id';

export class EuiFormRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      id: props.id || makeId(),
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
      labelType,
      labelAppend,
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      compressed,
      displayOnly,
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
      optionalErrors = errorTexts.map((error, i) => {
        const key = typeof error === 'string' ? error : i;
        return (
          <EuiFormErrorText
            key={key}
            id={`${id}-error-${i}`}
            className="euiFormRow__text">
            {error}
          </EuiFormErrorText>
        );
      });
    }

    let optionalLabel;
    const isLegend = label && labelType === 'legend' ? true : false;
    const labelID = isLegend ? `${id}-${labelType}` : undefined;

    if (label) {
      optionalLabel = (
        // Outer div ensures the label is inline-block (only takes up as much room as it needs)
        <div>
          <EuiFormLabel
            isFocused={!isLegend && this.state.isFocused}
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            htmlFor={!isLegend ? id : undefined}
            type={labelType}
            id={labelID}>
            {label}
          </EuiFormLabel>
        </div>
      );
    }

    if (labelAppend) {
      optionalLabel = (
        <EuiFlexGroup
          responsive={false}
          wrap={true}
          gutterSize="xs"
          justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>{optionalLabel}</EuiFlexItem>
          <EuiFlexItem grow={false}>{labelAppend}</EuiFlexItem>
        </EuiFlexGroup>
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

    let field = cloneElement(children, {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      compressed: compressed,
      ...optionalProps,
    });

    if (displayOnly) {
      field = <div className="euiFormRow__displayOnlyWrapper">{field}</div>;
    }

    const Element = labelType === 'legend' ? 'fieldset' : 'div';

    return (
      <Element
        className={classes}
        {...rest}
        id={`${id}-row`}
        aria-labelledby={labelID} // Only renders a string if label type is 'legend'
      >
        {optionalLabel}
        {field}
        {optionalErrors}
        {optionalHelpText}
      </Element>
    );
  }
}

EuiFormRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.node,
  /**
   * Sets the type of html element the label should be based
   * on the form row contents. For instance checkbox groups
   * should use 'legend' instead of the default 'label'
   */
  labelType: PropTypes.oneOf(['label', 'legend']),
  /**
   * Adds an extra node to the right of the form label without
   * being contained inside the form label. Good for things
   * like documentation links.
   */
  labelAppend: withRequiredProp(
    PropTypes.node,
    'label',
    'appending to the label requires that the label also exists'
  ),
  id: PropTypes.string,
  isInvalid: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
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
  /**
   * Vertically centers non-input style content so it aligns
   * better with input style content.
   */
  displayOnly: PropTypes.bool,
};

EuiFormRow.defaultProps = {
  hasEmptyLabelSpace: false,
  fullWidth: false,
  describedByIds: [],
  labelType: 'label',
};
