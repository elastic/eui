/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  InputHTMLAttributes,
  Ref,
  FunctionComponent,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';
import { getIconAffordanceStyles } from '../form_control_layout/_num_icons';
import { useFormContext } from '../eui_form_context';

import { euiFieldTextStyles } from './field_text.styles';

export type EuiFieldTextProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    icon?: EuiFormControlLayoutProps['icon'];
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    isLoading?: boolean;
    readOnly?: boolean;
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: EuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append. Best used inside EuiFormControlLayoutDelimited.
     */
    controlOnly?: boolean;

    /**
     * when `true` creates a shorter height input
     */
    compressed?: boolean;
  };

export const EuiFieldText: FunctionComponent<EuiFieldTextProps> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    id,
    name,
    placeholder,
    value,
    className,
    style,
    icon,
    isInvalid,
    inputRef,
    fullWidth = defaultFullWidth,
    isLoading,
    compressed,
    prepend,
    append,
    readOnly,
    controlOnly,
    ...rest
  } = props;

  const classes = classNames('euiFieldText', className, {
    ...(!controlOnly && {
      'euiFieldText--inGroup': prepend || append,
    }),
    'euiFieldText-isLoading': isLoading,
  });

  const styles = useEuiMemoizedStyles(euiFieldTextStyles);
  const cssStyles = [
    styles.euiFieldText,
    compressed ? styles.compressed : styles.uncompressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
  ];

  const iconAffordanceStyles = useMemo(() => {
    return !controlOnly
      ? getIconAffordanceStyles({ icon, isInvalid, isLoading })
      : undefined;
  }, [controlOnly, icon, isInvalid, isLoading]);

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className={classes}
        css={cssStyles}
        style={{ ...iconAffordanceStyles, ...style }}
        value={value}
        ref={inputRef}
        readOnly={readOnly}
        {...rest}
      />
    </EuiValidatableControl>
  );

  if (controlOnly) return control;

  return (
    <EuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      isInvalid={isInvalid}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}
    >
      {control}
    </EuiFormControlLayout>
  );
};
