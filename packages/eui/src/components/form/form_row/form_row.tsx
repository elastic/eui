/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  cloneElement,
  FunctionComponent,
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { ExclusiveUnion, CommonProps, keysOf } from '../../common';

import { useGeneratedHtmlId } from '../../../services';

import { EuiFormHelpText } from '../form_help_text';
import { EuiFormErrorText } from '../form_error_text';
import { EuiFormLabel } from '../form_label';
import { useFormContext } from '../eui_form_context';

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
  /**
   * Expand to fill 100% of the parent.
   * Defaults to `fullWidth` prop of `<EuiForm>`.
   * @default false
   */
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
  /**
   *  Passed along to the label element; and to the child field element when `disabled` doesn't already exist on the child field element.
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

export type EuiFormRowProps = ExclusiveUnion<LabelProps, LegendProps>;

export const EuiFormRow: FunctionComponent<EuiFormRowProps> = ({
  className,
  children,
  helpText,
  isInvalid,
  error,
  label,
  labelType = 'label',
  labelAppend,
  hasEmptyLabelSpace = false,
  fullWidth: _fullWidth,
  describedByIds,
  display = 'row',
  hasChildLabel = true,
  id: propsId,
  isDisabled,
  ...rest
}) => {
  const { defaultFullWidth } = useFormContext();
  const fullWidth = _fullWidth ?? defaultFullWidth;
  const id = useGeneratedHtmlId({ conditionalId: propsId });
  const hasLabel = label || labelAppend;

  const [isFocused, setIsFocused] = useState(false);
  const onFocusWithin = useCallback(() => setIsFocused(true), []);
  const onBlurWithin = useCallback(() => setIsFocused(false), []);

  const classes = classNames(
    'euiFormRow',
    {
      'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
      'euiFormRow--fullWidth': fullWidth,
      'euiFormRow--hasLabel': hasLabel,
    },
    displayToClassNameMap[display],
    className
  );

  const optionalHelpTexts = useMemo(() => {
    if (!helpText) return;
    const helpTexts = Array.isArray(helpText) ? helpText : [helpText];

    return helpTexts.map((helpText, i) => {
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
  }, [helpText, id]);

  const optionalErrors = useMemo(() => {
    if (!(error && isInvalid)) return;
    const errorTexts = Array.isArray(error) ? error : [error];

    return errorTexts.map((error, i) => {
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
  }, [error, isInvalid, id]);

  const ariaDescribedBy = useMemo(() => {
    const describingIds = [...(describedByIds || [])];

    if (optionalHelpTexts?.length) {
      optionalHelpTexts.forEach((optionalHelpText) =>
        describingIds.push(optionalHelpText.props.id)
      );
    }
    if (optionalErrors?.length) {
      optionalErrors.forEach((error) => describingIds.push(error.props.id));
    }
    if (describingIds.length) {
      return describingIds.join(' ');
    }
  }, [describedByIds, optionalHelpTexts, optionalErrors]);

  const fieldWrapperClasses = classNames('euiFormRow__fieldWrapper', {
    euiFormRow__fieldWrapperDisplayOnly: display.startsWith('center'),
  });
  const field = useMemo(() => {
    const child = Children.only(children);
    return cloneElement(child, {
      id,
      // Allow the child's disabled or isDisabled prop to supercede the `isDisabled`
      disabled: child.props.disabled ?? child.props.isDisabled ?? isDisabled,
      'aria-describedby': ariaDescribedBy,
    });
  }, [children, id, isDisabled, ariaDescribedBy]);

  const Element = labelType === 'legend' ? 'fieldset' : 'div';

  return (
    <Element
      className={classes}
      id={`${id}-row`}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {hasLabel && (
        <div className="euiFormRow__labelWrapper">
          <EuiFormLabel
            className="euiFormRow__label"
            aria-invalid={isInvalid}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isFocused={isFocused && !isDisabled}
            id={`${id}-label`}
            // ExclusiveUnion shenanigans
            {...(labelType === 'legend'
              ? { type: labelType }
              : {
                  type: labelType,
                  htmlFor: hasChildLabel ? id : undefined,
                })}
          >
            {label}
          </EuiFormLabel>
          {labelAppend && ' '}
          {labelAppend}
        </div>
      )}
      <div
        className={fieldWrapperClasses}
        onFocus={onFocusWithin}
        onBlur={onBlurWithin}
      >
        {field}
        {optionalErrors}
        {optionalHelpTexts}
      </div>
    </Element>
  );
};
