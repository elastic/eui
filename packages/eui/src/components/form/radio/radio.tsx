/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ChangeEventHandler,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';

import { euiRadioStyles } from './radio.styles';

export interface RadioProps {
  autoFocus?: boolean;
  /**
   * When `true` creates a shorter height radio row
   */
  compressed?: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Object of props passed to the <label/>
   */
  labelProps?: CommonProps & LabelHTMLAttributes<HTMLLabelElement>;
}

interface idWithLabel extends RadioProps {
  label: ReactNode;
  id: string;
}

interface withId extends RadioProps {
  id: string;
}

export type EuiRadioProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'id'> &
  ExclusiveUnion<ExclusiveUnion<RadioProps, idWithLabel>, withId>;

export const EuiRadio: FunctionComponent<EuiRadioProps> = ({
  className,
  id,
  name,
  checked,
  label,
  value,
  onChange,
  disabled,
  compressed,
  autoFocus,
  labelProps,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiRadioStyles);

  const classes = classNames(
    'euiRadio',
    {
      'euiRadio--compressed': compressed,
    },
    className
  );

  const optionalLabel = useMemo(() => {
    if (!label) return;

    const labelClasses = classNames('euiRadio__label', labelProps?.className);
    const labelCssStyles = [styles.euiRadio__label, labelProps?.css];

    return (
      <label
        {...labelProps}
        css={labelCssStyles}
        className={labelClasses}
        htmlFor={id}
      >
        {label}
      </label>
    );
  }, [label, labelProps, id, styles]);

  return (
    <div css={styles.euiRadio} className={classes} {...rest}>
      <input
        css={styles.euiRadio__input}
        className="euiRadio__input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
      />

      {optionalLabel}
    </div>
  );
};
