import React, { cloneElement, Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { get } from '../../../services/objects';
import { withRequiredProp } from '../../../utils/prop_types/with_required_prop';

import { EuiFormHelpText } from '../form_help_text';
import { EuiFormErrorText } from '../form_error_text';
import { EuiFormLabel } from '../form_label';

import makeId from './make_id';

const displayToClassNameMap = {
  default: null,
  compressed: 'euiFormRow--compressed',
  compressedHorizontal: 'euiFormRow--compressed euiFormRow--horizontal',
};

export const DISPLAYS = Object.keys(displayToClassNameMap);

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
      display,
      displayOnly,
      ...rest
    } = this.props;

    const { id } = this.state;

    let shimDisplay;
    if (compressed && display === 'default') {
      shimDisplay = 'compressed';
    } else {
      shimDisplay = display;
    }

    const classes = classNames(
      'euiFormRow',
      {
        'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'euiFormRow--fullWidth': fullWidth,
      },
      displayToClassNameMap[shimDisplay],
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

    if (label || labelAppend) {
      optionalLabel = (
        <div className="euiFormRow__labelWrapper">
          <EuiFormLabel
            className="euiFormRow__label"
            isFocused={!isLegend && this.state.isFocused}
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            htmlFor={!isLegend ? id : undefined}
            type={labelType}
            id={labelID}>
            {label}
          </EuiFormLabel>
          {labelAppend && ' '}
          {labelAppend}
        </div>
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
      optionalProps['aria-describedby'] = describingIds.join(' ');
    }

    let field = cloneElement(Children.only(children), {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
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
        <div className="euiFormRow__fieldWrapper">
          {field}
          {optionalErrors}
          {optionalHelpText}
        </div>
      </Element>
    );
  }
}

EuiFormRow.propTypes = {
  children: PropTypes.element.isRequired,
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
   * **SET FOR DEPRECATION**
   * When `true`, tightens up the spacing and sends down the
   * compressed prop to the input;
   */
  compressed: PropTypes.bool,
  /**
   * When `compressed`, tightens up the spacing and sends down the
   * compressed prop to the input; Set to `'compressedHorizontal'` if compressed
   * and horizontal layout is needed.
   */
  display: PropTypes.oneOf(DISPLAYS),
  /**
   * Vertically centers non-input style content so it aligns
   * better with input style content.
   */
  displayOnly: PropTypes.bool,
};

EuiFormRow.defaultProps = {
  display: 'default',
  hasEmptyLabelSpace: false,
  fullWidth: false,
  describedByIds: [],
  labelType: 'label',
};
