import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';

import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiIcon } from '../icon';
import { EuiPopoverTitle, EuiPopoverFooter } from '../popover';
import { EuiTitle } from '../title';

import { EuiI18n } from '../i18n';

export type EuiTourStepStatus =
  | 'complete'
  | 'incomplete'
  | 'active';

export interface EuiTourStepProps {
  children: ReactNode;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title: string;
  subtitle: string;
  /**
   * May replace the number provided in props.step with alternate styling.
   */
  status?: EuiTourStepStatus;
}

export type StandaloneEuiTourStepProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiTourStepProps;

export const EuiTourStep: FunctionComponent<StandaloneEuiTourStepProps> = ({
  className,
  children,
  step = 1,
  title,
  subtitle,
  status,
  ...rest
}) => {
  const classes = classNames('euiTourStep', className);

  const footer = (
    <EuiFlexGroup responsive={false} justifyContent="spaceBetween">
      <EuiFlexItem grow={false} aria-labelledby="stepProgress">
        {/* // TODO make this dynamic and more accessible or remove it */}
        <EuiScreenReaderOnly>
          <h6 id="stepProgress">Step 3 of 5</h6>
        </EuiScreenReaderOnly>
        {/* // TODO use loop based upon length of steps array */}
        <ul className="euiTourFooter__stepList">
            {/* <EuiScreenReaderOnly> */}
              <EuiI18n
                token="euiStep.ariaLabel"
                default={({ status }: { status?: EuiTourStepStatus }) => {
                  if (status === 'incomplete') return 'Incomplete Step';
                  return 'Step';
                }}
                values={{ status }}>
                  {(ariaLabel: string) => (
                  <li
                    // TODO should this class name be like __stepPageIndicator ?
                    className="euiTourFooter__stepListItem"
                    aria-label={`${ariaLabel} ${step}`}
                    step={step}
                    status={status}
                    isActive={status === 'active'}
                  >
                    <EuiIcon type="dot" color="subdued" aria-label="Step 1" />
                  </li>
                )}
              </EuiI18n>
            {/* </EuiScreenReaderOnly> */}
        </ul>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => handleSkip()} color="text" flush="right" size="xs">Skip tour</EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const handleSkip = () => {
    // TODO pass this fucntion in?
    // setIsPopoverOpen(false);
    window.alert('Skip tour clicked');
  };

  return (
    <div className={classes} {...rest}>
      <EuiPopoverTitle className="euiTourStepHeader">
        <EuiTitle size="xxxs" className="euiTourStepHeader__subtitle">
          <h6>{subtitle}</h6>
        </EuiTitle>
        <EuiTitle size="xxs" className="euiTourStepHeader__title">
          <h5>{title}</h5>
        </EuiTitle>
      </EuiPopoverTitle>
      <div className="euiTourStep__content">{children}</div>
      <EuiPopoverFooter className="euiTourStepFooter">{footer}</EuiPopoverFooter>
    </div>
  );
};
