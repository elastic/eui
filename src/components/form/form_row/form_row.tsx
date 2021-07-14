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

type EuiFormRowCommonProps = CommonProps & {
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
  hasEmptyLabelSpace?: boolean;
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
  label?: ReactNode;
  /**
   * Adds an extra node to the right of the form label without
   * being contained inside the form label. Good for things
   * like documentation links.
   */
  labelAppend?: any;
  id?: string;
  isInvalid?: boolean;
  error?: ReactNode | ReactNode[];
  /**
   *  Adds a single node/string or an array of nodes/strings below the input
   */
  helpText?: ReactNode | ReactNode[];
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
  HTMLAttributes<HTMLFieldSetElement>;

export type EuiFormRowProps = ExclusiveUnion<LabelProps, LegendProps>;

export class EuiFormRow extends Component<EuiFormRowProps, EuiFormRowState> {
  static defaultProps = {
    display: 'row',
    hasEmptyLabelSpace: false,
    fullWidth: false,
    describedByIds: [],
    labelType: 'label',
    hasChildLabel: true,
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
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      display,
      hasChildLabel,
      id: propsId,
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
            className="euiFormRow__text">
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
            className="euiFormRow__text">
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
          type: labelType,
        };
      } else {
        labelProps = {
          htmlFor: hasChildLabel ? id : undefined,
          isFocused: this.state.isFocused,
          type: labelType,
        };
      }
      optionalLabel = (
        <div className="euiFormRow__labelWrapper">
          <EuiFormLabel
            className="euiFormRow__label"
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            {...labelProps}>
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

    const field = cloneElement(Children.only(children), {
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      ...optionalProps,
    });

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
        {...(rest as HTMLAttributes<HTMLFieldSetElement>)}>
        {contents}
      </fieldset>
    ) : (
      <div {...sharedProps} {...(rest as HTMLAttributes<HTMLDivElement>)}>
        {contents}
      </div>
    );
  }
}
