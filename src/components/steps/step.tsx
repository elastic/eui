import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';

import classNames from 'classnames';

import { EuiTitle } from '../title';

import { EuiStepStatus, EuiStepNumber } from './step_number';

import { EuiI18n } from '../i18n';

export interface EuiStepProps {
  children: ReactNode;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title: string;
  /**
   * May replace the number provided in props.step with alternate styling.
   */
  status?: EuiStepStatus;
}

export type StandaloneEuiStepProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiStepProps;

export const EuiStep: FunctionComponent<StandaloneEuiStepProps> = ({
  className,
  children,
  headingElement = 'p',
  step = 1,
  title,
  status,
  ...rest
}) => {
  const classes = classNames('euiStep', className);

  return (
    <div className={classes} {...rest}>
      <div className="euiStep__titleWrapper">
        <EuiI18n
          token="euiStep.ariaLabel"
          default={({ status }: { status?: EuiStepStatus }) => {
            if (status === 'incomplete') return 'Incomplete Step';
            return 'Step';
          }}
          values={{ status }}>
          {(ariaLabel: string) => (
            <EuiStepNumber
              className="euiStep__circle"
              aria-label={`${ariaLabel} ${step}`}
              number={step}
              status={status}
              isHollow={status === 'incomplete'}
            />
          )}
        </EuiI18n>

        <EuiTitle size="s" className="euiStep__title">
          {React.createElement(headingElement, null, title)}
        </EuiTitle>
      </div>

      <div className="euiStep__content">{children}</div>
    </div>
  );
};
