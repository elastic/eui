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
  ReactNode,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useCombinedRefs, useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';

import { euiCheckboxStyles } from './checkbox.styles';

export interface EuiCheckboxProps
  extends CommonProps,
    InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
  inputRef?: (element: HTMLInputElement) => void;
  label?: ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
  /**
   * Object of props passed to the `label` element
   */
  labelProps?: CommonProps & LabelHTMLAttributes<HTMLLabelElement>;
}

export const EuiCheckbox: FunctionComponent<EuiCheckboxProps> = ({
  className,
  id,
  checked = false,
  label,
  onChange,
  type,
  disabled = false,
  readOnly = false,
  indeterminate = false,
  inputRef,
  labelProps,
  ...rest
}) => {
  const classes = classNames('euiCheckbox', className);

  const styles = useEuiMemoizedStyles(euiCheckboxStyles);
  const inputStyles = [
    styles.input.euiCheckbox__square,
    !!label && styles.input.hasLabel,
    disabled
      ? checked || indeterminate
        ? styles.input.disabled.selected
        : styles.input.disabled.unselected
      : checked || indeterminate
      ? styles.input.enabled.selected
      : styles.input.enabled.unselected,
    readOnly && styles.input.readOnly,
  ];

  const labelClasses = classNames('euiCheckbox__label', labelProps?.className);
  const labelStyles = [
    styles.label.euiCheckbox__label,
    disabled ? styles.label.disabled : styles.label.enabled,
    readOnly && styles.label.readOnly,
    labelProps?.css,
  ];

  const iconStyles = [
    styles.input.icon.euiCheckbox__icon,
    indeterminate ? styles.input.icon.indeterminate : styles.input.icon.check,
  ];

  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
  const setIndeterminateState = useCallback(
    (input?: HTMLInputElement) => {
      if (input) input.indeterminate = indeterminate;
    },
    [indeterminate]
  );
  const refs = useCombinedRefs([inputRef, setIndeterminateState]);

  return (
    <div css={styles.euiCheckbox} className={classes}>
      <div css={inputStyles} className="euiCheckbox__square">
        <EuiIcon
          css={iconStyles}
          type={indeterminate ? 'stopFilled' : checked ? 'check' : 'empty'}
        />
        <input
          css={styles.input.euiCheckbox__input}
          className="euiCheckbox__input"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          ref={refs}
          {...rest}
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
