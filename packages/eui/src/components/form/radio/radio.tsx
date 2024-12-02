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
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';
import { EuiIcon } from '../../icon';

import { euiRadioStyles } from './radio.styles';

export interface RadioProps {
  autoFocus?: boolean;
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
  autoFocus,
  labelProps,
  ...rest
}) => {
  const classes = classNames('euiRadio', className);

  const styles = useEuiMemoizedStyles(euiRadioStyles);
  const inputStyles = [
    styles.input.euiRadio__circle,
    !!label && styles.input.hasLabel,
    disabled
      ? checked
        ? styles.input.disabled.selected
        : styles.input.disabled.unselected
      : checked
      ? styles.input.enabled.selected
      : styles.input.enabled.unselected,
  ];

  const labelClasses = classNames('euiRadio__label', labelProps?.className);
  const labelStyles = [
    styles.label.euiRadio__label,
    disabled ? styles.label.disabled : styles.label.enabled,
    labelProps?.css,
  ];

  return (
    <div css={styles.euiRadio} className={classes} {...rest}>
      <div css={inputStyles} className="euiRadio__circle">
        <EuiIcon
          css={styles.input.euiRadio__icon}
          type={checked ? 'dot' : 'empty'} // Note that the icon does explicitly need to be empty for Windows high contrast themes
        />
        <input
          css={styles.input.euiRadio__input}
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
      </div>

      {label && (
        <label
          {...labelProps}
          css={labelStyles}
          className={labelClasses}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};
