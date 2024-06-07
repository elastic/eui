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
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useCombinedRefs, useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

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
  /**
   * @deprecated - can be removed with no visual regressions
   */
  compressed?: boolean;
  indeterminate?: boolean;
  /**
   * Object of props passed to the <label/>
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
  compressed, // @deprecated
  indeterminate = false,
  inputRef,
  labelProps,
  ...rest
}) => {
  const classes = classNames('euiCheckbox', className);

  const styles = useEuiMemoizedStyles(euiCheckboxStyles);

  const optionalLabel = useMemo(() => {
    if (!label) return;

    const labelClasses = classNames(
      'euiCheckbox__label',
      labelProps?.className
    );
    const labelCssStyles = [styles.euiCheckbox__label, labelProps?.css];

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
      <input
        css={styles.euiCheckbox__input}
        className="euiCheckbox__input"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={refs}
        {...rest}
      />
      {optionalLabel}
    </div>
  );
};
