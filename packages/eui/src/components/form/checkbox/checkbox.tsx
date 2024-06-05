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
import { css } from '@emotion/react';
import classNames from 'classnames';

import { useCombinedRefs } from '../../../services';
import { keysOf, CommonProps } from '../../common';

const typeToClassNameMap = {
  inList: 'euiCheckbox--inList',
};

export const TYPES = keysOf(typeToClassNameMap);

export type EuiCheckboxType = keyof typeof typeToClassNameMap;

export interface EuiCheckboxProps
  extends CommonProps,
    InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
  inputRef?: (element: HTMLInputElement) => void;
  label?: ReactNode;
  type?: EuiCheckboxType;
  disabled?: boolean;
  /**
   * when `true` creates a shorter height checkbox row
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
  css: customCss,
  id,
  checked = false,
  label,
  onChange,
  type,
  disabled = false,
  compressed = false,
  indeterminate = false,
  inputRef,
  labelProps,
  ...rest
}) => {
  const classes = classNames(
    'euiCheckbox',
    type && typeToClassNameMap[type],
    {
      'euiCheckbox--noLabel': !label,
      'euiCheckbox--compressed': compressed,
    },
    className
  );

  const styles = { euiCheckbox: css`` }; // TODO: Emotion conversion
  const cssStyles = [styles.euiCheckbox, customCss];

  const optionalLabel = useMemo(() => {
    if (!label) return;

    const labelClasses = classNames(
      'euiCheckbox__label',
      labelProps?.className
    );

    return (
      <label {...labelProps} className={labelClasses} htmlFor={id}>
        {label}
      </label>
    );
  }, [label, labelProps, id]);

  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
  const setIndeterminateState = useCallback(
    (input?: HTMLInputElement) => {
      if (input) input.indeterminate = indeterminate;
    },
    [indeterminate]
  );
  const refs = useCombinedRefs([inputRef, setIndeterminateState]);

  return (
    <div css={cssStyles} className={classes}>
      <input
        className="euiCheckbox__input"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={refs}
        {...rest}
      />

      <div className="euiCheckbox__square" />

      {optionalLabel}
    </div>
  );
};
