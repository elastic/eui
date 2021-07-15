/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';
import { EuiIcon } from '../../icon';
import { EuiI18n } from '../../i18n';

const sizeToClassNameMap = {
  s: 'euiFormControlLayoutClearButton--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiFormControlLayoutClearButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: typeof SIZES[number];
  };

export const EuiFormControlLayoutClearButton: FunctionComponent<EuiFormControlLayoutClearButtonProps> = ({
  className,
  onClick,
  size = 'm',
  ...rest
}) => {
  const classes = classNames(
    'euiFormControlLayoutClearButton',
    sizeToClassNameMap[size],
    className
  );

  return (
    <EuiI18n
      token="euiFormControlLayoutClearButton.label"
      default="Clear input">
      {(label: string) => (
        <button
          type="button"
          className={classes}
          onClick={onClick}
          aria-label={label}
          {...rest}>
          <EuiIcon
            className="euiFormControlLayoutClearButton__icon"
            type="cross"
          />
        </button>
      )}
    </EuiI18n>
  );
};
