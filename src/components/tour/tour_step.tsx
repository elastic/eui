import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';

import classNames from 'classnames';

import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiPopoverTitle, EuiPopoverFooter } from '../popover';
import { EuiTitle } from '../title';
import { EuiTourStepIndicator } from './tour_step_indicator';

export interface EuiTourStepProps {
  children: ReactNode;
  /**
   * The number of the step in the list of steps
   */
  step?: number;
  title: string;
  subtitle: string;
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
  ...rest
}) => {
  const classes = classNames('euiTourStep', className);

  const footer = (
    <EuiFlexGroup responsive={false} justifyContent="spaceBetween">
      <EuiFlexItem grow={false} aria-labelledby="stepProgress">
        {/* // TODO make this dynamic and more accessible or remove it */}
        {/* <EuiScreenReaderOnly>
          <h6 id="stepProgress">Step 3 of 5</h6>
        </EuiScreenReaderOnly> */}
        {/* // TODO use loop based upon length of steps array; also make this ul a component? */}
        <ul className="euiTourFooter__stepList">
          <EuiTourStepIndicator number={1} status="active" />
          <EuiTourStepIndicator number={2} status="incomplete" />
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
