/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  LabelHTMLAttributes,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';

interface EuiFormLabelCommonProps {
  isFocused?: boolean;
  isInvalid?: boolean;
  /**
   * Changes `cursor` to `default`.
   */
  isDisabled?: boolean;
  /**
   * Default type is a `label` but can be changed to a `legend`
   * if using inside a `fieldset`.
   */
  type?: 'label' | 'legend';
}

export type _EuiFormLabelProps = {
  type?: 'label';
} & EuiFormLabelCommonProps &
  CommonProps &
  LabelHTMLAttributes<HTMLLabelElement>;

export type _EuiFormLegendProps = {
  type: 'legend';
} & EuiFormLabelCommonProps &
  CommonProps &
  HTMLAttributes<HTMLLegendElement>;

export type EuiFormLabelProps = ExclusiveUnion<
  _EuiFormLabelProps,
  _EuiFormLegendProps
>;

export const EuiFormLabel: FunctionComponent<EuiFormLabelProps> = ({
  type = 'label',
  isFocused,
  isInvalid,
  isDisabled,
  children,
  className,
  ...rest
}: EuiFormLabelProps) => {
  const classes = classNames('euiFormLabel', className, {
    'euiFormLabel-isFocused': isFocused,
    'euiFormLabel-isInvalid': isInvalid,
    'euiFormLabel-isDisabled': isDisabled,
  });

  if (type === 'legend') {
    return (
      <legend
        className={classes}
        {...(rest as HTMLAttributes<HTMLLegendElement>)}
      >
        {children}
      </legend>
    );
  } else {
    return (
      <label
        className={classes}
        {...(rest as LabelHTMLAttributes<HTMLLabelElement>)}
      >
        {children}
      </label>
    );
  }
};
