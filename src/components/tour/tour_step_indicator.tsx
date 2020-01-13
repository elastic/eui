import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiIcon } from '../icon';

import { EuiI18n } from '../i18n';
import { CommonProps, keysOf } from '../common';

const statusToClassNameMap = {
  complete: 'euiTourStepIndicator--complete',
  incomplete: 'euiTourStepIndicator--incomplete',
  active: 'euiTourStepIndicator--active',
};

export const STATUS = keysOf(statusToClassNameMap);

export type EuiTourStepStatus =
  | 'complete'
  | 'incomplete'
  | 'active';

export interface EuiTourStepIndicatorProps {
  // TODO this shouldn't be a prop, but I added it to clear a warning
  indicatorIcon?: ReactNode;
  number?: number;
  /**
   * May replace the number provided in props.number with alternate styling
   */
  status?: EuiTourStepStatus;
}

export const EuiTourStepIndicator: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiTourStepIndicatorProps
  // Note - tslint:disable refers to the `number` as it conflicts with the build in number type
  // tslint:disable-next-line:variable-name
> = ({ className, indicatorIcon, number, status }) => {
  const classes = classNames(
    'euiTourStepIndicator',
    status ? statusToClassNameMap[status] : undefined,
    className
  );

  if (status === 'complete' || status === 'active') {
    indicatorIcon = (
      <EuiI18n token="euiTourStepIndicator.isComplete" default="complete">
        {(isComplete: string) => (
          <EuiIcon
            type="dot"
            className="euiStepNumber__icon"
            aria-label={isComplete}
            color="secondary"
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
    // TODO since this is not interactive, is the aria-label useful/readable?
    <EuiI18n
      token="euiTourStepIndicator.ariaLabel"
      default={({ status }: { status?: EuiTourStepStatus }) => {
        return 'Step ' + number + ' ' + status;
      }}
      values={{ status }}>
        {(ariaLabel: string) => (
        <li
          className={classes}
          aria-label={ariaLabel}
          // TODO is this needed?
          // {...rest}
        >
          {indicatorIcon}
        </li>
      )}
    </EuiI18n>
  );
};
