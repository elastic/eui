/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { EuiIcon } from '../icon';
import { EuiI18n } from '../i18n';

const statusToClassNameMap = {
  complete: 'euiTourStepIndicator--complete',
  incomplete: 'euiTourStepIndicator--incomplete',
  active: 'euiTourStepIndicator--active',
};

export const STATUS = keysOf(statusToClassNameMap);

export type EuiTourStepStatus = keyof typeof statusToClassNameMap;

export interface EuiTourStepIndicatorProps
  extends CommonProps,
    HTMLAttributes<HTMLLIElement> {
  number: number;
  status: EuiTourStepStatus;
}

export const EuiTourStepIndicator: FunctionComponent<EuiTourStepIndicatorProps> = ({
  className,
  number,
  status,
  ...rest
}) => {
  const classes = classNames(
    'euiTourStepIndicator',
    status ? statusToClassNameMap[status] : undefined,
    className
  );

  let indicatorIcon: ReactNode;
  if (status === 'active') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isActive" default="active">
        {(isActive: string) => (
          <EuiIcon
            type="dot"
            className="euiStepNumber__icon"
            aria-label={isActive}
            color="success"
            aria-current="step"
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'complete') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isComplete" default="complete">
        {(isComplete: string) => (
          <EuiIcon
            type="dot"
            className="euiStepNumber__icon"
            aria-label={isComplete}
            color="subdued"
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'incomplete') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isIncomplete" default="incomplete">
        {(isIncomplete: string) => (
          <EuiIcon
            type="dot"
            className="euiStepNumber__icon"
            aria-label={isIncomplete}
            color="subdued"
          />
        )}
      </EuiI18n>
    );
  }

  return (
    <EuiI18n
      token="euiTourStepIndicator.ariaLabel"
      default="Step {number} {status}"
      values={{ status, number }}
    >
      {(ariaLabel: string) => (
        <li className={classes} aria-label={ariaLabel} {...rest}>
          {indicatorIcon}
        </li>
      )}
    </EuiI18n>
  );
};
