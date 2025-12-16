/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';

import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';

import { EuiIcon } from '../icon';
import { EuiI18n } from '../i18n';

export type EuiTourStepStatus = 'complete' | 'incomplete' | 'active';

export interface EuiTourStepIndicatorProps
  extends CommonProps,
    HTMLAttributes<HTMLLIElement> {
  number: number;
  status: EuiTourStepStatus;
}

export const EuiTourStepIndicator: FunctionComponent<
  EuiTourStepIndicatorProps
> = ({ className, number, status, ...rest }) => {
  const { euiTheme } = useEuiTheme();
  const classes = classNames('euiTourStepIndicator', className);
  const inactiveColor = euiTheme.components.tourStepIndicatorInactiveColor;
  const activeColor = euiTheme.components.tourStepIndicatorActiveColor;

  let indicatorIcon: ReactNode;
  if (status === 'active') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isActive" default="active">
        {(isActive: string) => (
          <EuiIcon
            type="dot"
            aria-label={isActive}
            color={activeColor}
            aria-current="step"
          />
        )}
      </EuiI18n>
    );
  } else if (status === 'complete') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isComplete" default="complete">
        {(isComplete: string) => (
          <EuiIcon type="dot" aria-label={isComplete} color={inactiveColor} />
        )}
      </EuiI18n>
    );
  } else if (status === 'incomplete') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isIncomplete" default="incomplete">
        {(isIncomplete: string) => (
          <EuiIcon type="dot" aria-label={isIncomplete} color={inactiveColor} />
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
        <li
          css={css`
            display: inline-block;
          `}
          className={classes}
          aria-label={ariaLabel}
          {...rest}
        >
          {indicatorIcon}
        </li>
      )}
    </EuiI18n>
  );
};
