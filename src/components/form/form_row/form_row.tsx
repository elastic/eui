/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  cloneElement,
  Component,
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { ExclusiveUnion, CommonProps, keysOf } from '../../common';

import { get } from '../../../services/objects';

import { EuiFormHelpText } from '../form_help_text';
import { EuiFormErrorText } from '../form_error_text';
import { EuiFormLabel } from '../form_label';

import { htmlIdGenerator } from '../../../services/accessibility';

const displayToClassNameMap = {
  row: null,
  rowCompressed: 'euiFormRow--compressed',
  columnCompressed: 'euiFormRow--compressed euiFormRow--horizontal',
  center: null,
  centerCompressed: 'euiFormRow--compressed',
  columnCompressedSwitch:
    'euiFormRow--compressed euiFormRow--horizontal euiFormRow--hasSwitch',
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type EuiFormRowDisplayKeys = keyof typeof displayToClassNameMap;

interface EuiFormRowState {
  isFocused: boolean;
  id: string;
}

export function euiFormRowDisplayIsCompressed(
  display?: EuiFormRowDisplayKeys
): boolean {
  return display ? display.includes('Compressed') : false;
}

export type EuiFormRowCommonProps = CommonProps & {
  /**
   * When `rowCompressed`, just tightens up the spacing;
   * Set to `columnCompressed` if compressed
   * and horizontal layout is needed.
   * Set to `center` or `centerCompressed` to align non-input
   * content better with inline rows.
   * Set to `columnCompressedSwitch` if the form control being passed
   * as the child is a switch.
   */
  display?: EuiFormRowDisplayKeys;
  fullWidth?: boolean;
  /**
   * IDs of additional elements that should be part of children's `aria-describedby`
   */
  describedByIds?: string[];
  /**
   * Escape hatch to not render duplicate labels if the child also renders a label
   */
  hasChildLabel?: boolean;
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement;
  /**
   * The content for the `<label>` (or `<legend>`) element
   */
  label?: ReactNode;
  /**
   * Pass some common props to the `<label>` (or `<legend>`) element
   */
  labelProps?: CommonProps;
  /**
   * Adds an extra node to the right of the form label without
   * being contained inside the form label. Good for things
   * like documentation links.
   */
  labelAppend?: ReactNode;
  /**
   * Used to generate the wrapper `id`s and will be passed plainly
   * to the child (input) if `inputId` is not supplied.
   *
   * If not provided, one will be generated
   */
  id?: string;
  /**
   * Shows `error` list and passed to label element
   */
  isInvalid?: boolean;
  /**
   * Error nodes will only show when `isInvalid` is true;
   * Displayed after the input, before the `helpText`
   */
  error?: ReactNode | ReactNode[];
  /**
   * Small text that displays below the input
   */
  helpText?: ReactNode | ReactNode[];
  /**
   * For use only in inline forms to align the inputs
   * in case the form row has no label
   */
  hasEmptyLabelSpace?: boolean;
  /**
   * Passed along to the label element; and to the child field element
   * when `disabled` doesn't already exist on the child field element.
   */
  isDisabled?: boolean;
};

type LabelProps = {
  labelType?: 'label';
} & EuiFormRowCommonProps &
  HTMLAttributes<HTMLDivElement>;

type LegendProps = {
  /**
   * Defaults to rendering a `<label>` but if passed `'legend'` for labelType,
   * will render both a `<legend>` and the surrounding container as a `<fieldset>`
   */
  labelType?: 'legend';
} & EuiFormRowCommonProps &
  Omit<HTMLAttributes<HTMLFieldSetElement>, 'disabled'>;

export type EuiFormRowProps = ExclusiveUnion<LabelProps, LegendProps> & {
  /**
   * **INTERNAL**
   * Whether to pass clone and pass through certain props to the child.
   * Set to `false` when used within a form control itself.
   */
  passThrough?: boolean;
};

export class EuiFormRow extends Component<EuiFormRowProps, EuiFormRowState> {
  static defaultProps = {
    display: 'row',
    hasEmptyLabelSpace: false,
    fullWidth: false,
    describedByIds: [],
    labelType: 'label',
    hasChildLabel: true,
    passThrough: true,
  };

  state: EuiFormRowState = {
    isFocused: false,
    id: this.props.id || htmlIdGenerator()(),
  };

  onFocus = (...args: any[]) => {
    // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
    const onChildFocus = get(this.props, 'children.props.onFocus');
    if (onChildFocus) {
      onChildFocus(...args);
    }

    this.setState(({ isFocused }) => {
      if (!isFocused) {
        return {
          isFocused: true,
        };
      } else {
        return null;
      }
    });
  };

  onBlur = (...args: any[]) => {
    // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
    const onChildBlur = get(this.props, 'children.props.onBlur');
    if (onChildBlur) {
      onChildBlur(...args);
    }

    this.setState({
      isFocused: false,
    });
  };

  render() {
    const {
      children,
      helpText,
      isInvalid,
      error,
      label,
      labelType,
      labelAppend,
      labelProps: _labelProps,
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      display,
      hasChildLabel,
      id: propsId,
      isDisabled,
      passThrough,
      ...rest
    } = this.props;

    const { id } = this.state;

    const classes = classNames(
      'euiFormRow',
      {
        'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'euiFormRow--fullWidth': fullWidth,
      },
      displayToClassNameMap[display!], // Safe use of ! as default prop is 'row'
      className
    );

    let optionalHelpTexts;

    if (helpText) {
      const helpTexts = Array.isArray(helpText) ? helpText : [helpText];
      optionalHelpTexts = helpTexts.map((helpText, i) => {
        const key = typeof helpText === 'string' ? helpText : i;
        return (
          <EuiFormHelpText
            key={key}
            id={`${id}-help-${i}`}
            className="euiFormRow__text"
          >
            {helpText}
          </EuiFormHelpText>
        );
      });
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
            className="euiFormRow__text"
          >
            {error}
          </EuiFormErrorText>
        );
      });
    }

    let optionalLabel;
    const isLegend = label && labelType === 'legend' ? true : false;

    if (label || labelAppend) {
      let labelProps = {};
      if (isLegend) {
        labelProps = {
          ..._labelProps,
          type: labelType,
        };
      } else {
        labelProps = {
          ..._labelProps,
          htmlFor: hasChildLabel ? id : undefined,
          isFocused: this.state.isFocused,
          ...(!isDisabled && { isFocused: this.state.isFocused }), // If the row is disabled, don't pass the isFocused state.
          type: labelType,
        };
      }
      optionalLabel = (
        <div className="euiFormRow__labelWrapper">
          <EuiFormLabel
            className="euiFormRow__label"
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            aria-invalid={isInvalid}
            {...labelProps}
          >
            {label}
          </EuiFormLabel>
          {labelAppend && ' '}
          {labelAppend}
        </div>
      );
    }

    const optionalProps: React.AriaAttributes = {};
    /**
     * Safe use of ! as default prop is []
     */
    const describingIds = [...describedByIds!];

    if (optionalHelpTexts) {
      optionalHelpTexts.forEach((optionalHelpText) =>
        describingIds.push(optionalHelpText.props.id)
      );
    }

    if (optionalErrors) {
      optionalErrors.forEach((error) => describingIds.push(error.props.id));
    }

    if (describingIds.length > 0) {
      optionalProps['aria-describedby'] = describingIds.join(' ');
    }

    const child = Children.only(children);
    // Only clone the element and pass through props when not used directly within a form control
    const field = passThrough
      ? cloneElement(child, {
          id,
          // Allow the child's disabled or isDisabled prop to supercede the `isDisabled`
          disabled:
            child.props.disabled ?? child.props.isDisabled ?? isDisabled,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          ...optionalProps,
        })
      : child;

    const fieldWrapperClasses = classNames('euiFormRow__fieldWrapper', {
      euiFormRow__fieldWrapperDisplayOnly:
        /**
         * Safe use of ! as default prop is 'row'
         */
        display!.startsWith('center'),
    });

    const sharedProps = {
      className: classes,
      id: `${id}-row`,
    };

    const contents = (
      <React.Fragment>
        {optionalLabel}
        <div className={fieldWrapperClasses}>
          {field}
          {optionalErrors}
          {optionalHelpTexts}
        </div>
      </React.Fragment>
    );

    return labelType === 'legend' ? (
      <fieldset
        {...sharedProps}
        {...(rest as HTMLAttributes<HTMLFieldSetElement>)}
      >
        {contents}
      </fieldset>
    ) : (
      <div {...sharedProps} {...(rest as HTMLAttributes<HTMLDivElement>)}>
        {contents}
      </div>
    );
  }
}
