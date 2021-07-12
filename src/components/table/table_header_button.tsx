/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiInnerText } from '../inner_text';

import { IconType, EuiIcon } from '../icon';

export type EuiTableHeaderButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    iconType?: IconType;
  };

export const EuiTableHeaderButton: FunctionComponent<EuiTableHeaderButtonProps> = ({
  children,
  className,
  iconType,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderButton', className);

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiTableHeaderButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      <EuiInnerText>
        {(ref, innerText) => (
          <span title={innerText} ref={ref}>
            {children}
          </span>
        )}
      </EuiInnerText>

      {buttonIcon}
    </button>
  );
};
