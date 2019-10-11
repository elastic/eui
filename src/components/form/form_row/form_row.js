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
  row: null,
  rowCompressed: 'euiFormRow--compressed',
  columnCompressed: 'euiFormRow--compressed euiFormRow--horizontal',
  center: null,
  centerCompressed: 'euiFormRow--compressed',
  columnCompressedSwitch:
    'euiFormRow--compressed euiFormRow--horizontal euiFormRow--hasSwitch',
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
      hasChildLabel,
      ...rest
    } = this.props;

    const { id } = this.state;

    /**
     * Remove when `compressed` is deprecated
     */
    let shimDisplay;
    if (compressed && display === 'row') {
      shimDisplay = 'rowCompressed';
    } else {
      shimDisplay = display;
    }

    /**
     * Remove when `displayOnly` is deprecated
     */
    if (compressed && displayOnly) {
      shimDisplay = 'centerCompressed';
    } else if (displayOnly && display === 'row') {
      shimDisplay = 'center';
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

    if (label || labelAppend) {
      optionalLabel = (
        <div className="euiFormRow__labelWrapper">
          <EuiFormLabel
            className="euiFormRow__label"
            isFocused={!isLegend && this.state.isFocused}
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            htmlFor={!isLegend && hasChildLabel ? id : undefined}
            type={labelType}>
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

    const field = cloneElement(Children.only(children), {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      ...optionalProps,
    });

    const fieldWrapperClasses = classNames('euiFormRow__fieldWrapper', {
      euiFormRow__fieldWrapperDisplayOnly:
        displayOnly || display.startsWith('center'),
    });

    const Element = labelType === 'legend' ? 'fieldset' : 'div';

    return (
      <Element className={classes} {...rest}>
        {optionalLabel}
        <div className={fieldWrapperClasses}>
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
  /**
   * Escape hatch to not render duplicate labels if the child also renders a label
   */
  hasChildLabel: PropTypes.bool,
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
   * **DEPRECATED: use `display: rowCompressed` instead.**
   * When `true`, tightens up the spacing.
   */
  compressed: PropTypes.bool,
  /**
   * When `rowCompressed`, just tightens up the spacing;
   * Set to `columnCompressed` if compressed
   * and horizontal layout is needed.
   * Set to `center` or `centerCompressed` to align non-input
   * content better with inline rows.
   * Set to `columnCompressedSwitch` if the form control being passed
   * as the child is a switch.
   */
  display: PropTypes.oneOf(DISPLAYS),
  /**
   * **DEPRECATED: use `display: center` instead.**
   * Vertically centers non-input style content so it aligns
   * better with input style content.
   */
  displayOnly: PropTypes.bool,
};

EuiFormRow.defaultProps = {
  display: 'row',
  hasEmptyLabelSpace: false,
  fullWidth: false,
  describedByIds: [],
  labelType: 'label',
  hasChildLabel: true,
};
