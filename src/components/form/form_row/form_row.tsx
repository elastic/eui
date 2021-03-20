/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
  id?: string;
  inputId?: string;
  isInvalid?: boolean;
  /**
   * Error nodes will only show when `isInvalid` is true;
   * Displayed after the input, before the `helpText`
   */
  error?: ReactNode | ReactNode[];
  /**
   * Small text that displays below the input
   */
  helpText?: ReactNode;
  /**
   * For use only in inline forms to align the inputs
   * in case the form row has no label
   */
  hasEmptyLabelSpace?: boolean;
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
      labelProps: _labelProps,
      hasEmptyLabelSpace,
      fullWidth,
      className,
      describedByIds,
      display,
      hasChildLabel,
      id: propsId,
      inputId,
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
      let labelProps = {};
      if (isLegend) {
        labelProps = {
          ..._labelProps,
          type: labelType,
        };
      } else {
        labelProps = {
          ..._labelProps,
          htmlFor: hasChildLabel ? inputId || id : undefined,
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

    if (optionalHelpText) {
      describingIds.push(optionalHelpText.props.id);
    }

    if (optionalErrors) {
      optionalErrors.forEach((error) => describingIds.push(error.props.id));
    }

    if (describingIds.length > 0) {
      optionalProps['aria-describedby'] = describingIds.join(' ');
    }

    const field = cloneElement(Children.only(children), {
      id: inputId ? undefined : id,
      ...children.props,
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
          {optionalHelpText}
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
