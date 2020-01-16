import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, NoArgCallback } from '../common';

import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import {
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverProps,
  EuiPopoverTitle,
} from '../popover';
import { EuiTitle } from '../title';
import { EuiTourStepIndicator } from './tour_step_indicator';

export interface EuiTourProps {
  children: ReactNode;
  content: ReactNode;

  // TODO carried over from popover
  closePopover: NoArgCallback<void>;

  /**
   * Set to `true`, step will display if parent tour is active
   */
  isStepOpen?: boolean;

  /**
   * State of the parent tour
   */
  isTourActive: boolean;

  /**
   * Sets the min-width of the tour popover,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  minWidth?: boolean | number | string;

  /**
   * OnClick function for the 'Skip tour' footer link
   */
  skipOnClick: NoArgCallback<void>;

  /**
   * The number of the step within the parent tour
   */
  step: number;

  /**
   * The total number of steps in the tour
   */
  stepsTotal: number;

  style?: CSSProperties;

  /**
   * Smaller title text that appears atop each step in the tour
   */
  subtitle: string;

  // Larger title text specific to this step
  title: string;
}

// TODO button is required on EuiPopover, but not on EuiTour which passes children to the button
export type StandaloneEuiTourProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiPopoverProps &
  EuiTourProps;

export const EuiTour: FunctionComponent<StandaloneEuiTourProps> = ({
  anchorPosition = 'leftUp',
  children,
  className,
  closePopover,
  content,
  isStepOpen = false,
  isTourActive = false,
  minWidth = true,
  skipOnClick,
  step = 1,
  stepsTotal,
  style,
  subtitle,
  title,
  ...rest
}) => {
  let newStyle;

  let widthClassName;
  if (minWidth === true) {
    widthClassName = 'euiTour--minWidth-default';
  } else if (minWidth !== false) {
    const value = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    newStyle = { ...style, minWidth: value };
  }

  const classes = classNames('euiTour', widthClassName, className);

  const stepIndicators = [];
  for (let i = 1; i <= stepsTotal; i++) {
    stepIndicators.push(
      <EuiTourStepIndicator
        key={i}
        number={i}
        status={step === i ? 'active' : 'incomplete'}
      />
    );
  }

  const footer = (
    <EuiFlexGroup responsive={false} justifyContent="spaceBetween">
      <EuiFlexItem grow={false} aria-labelledby="stepProgress">
        {/* // TODO make this dynamic and more accessible or remove it */}
        {/* <EuiScreenReaderOnly>
          <h6 id="stepProgress">Step 3 of 5</h6>
        </EuiScreenReaderOnly> */}
        {/* // TODO use loop based upon length of steps array; also make this ul a component? */}
        {/* Would the total steps be stored in a wrapper component? */}
        <ul className="euiTourFooter__stepList">{stepIndicators}</ul>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {/* // TODO if final step, change this to a done button */}
        <EuiButtonEmpty
          onClick={skipOnClick}
          color="text"
          flush="right"
          size="xs">
          Skip tour
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return isTourActive ? (
    <EuiPopover
      anchorPosition={anchorPosition}
      button={children}
      closePopover={closePopover}
      isOpen={isStepOpen}
      panelClassName={classes}
      style={newStyle || style}
      withTitle
      {...rest}>
      <EuiPopoverTitle className="euiTourHeader">
        <EuiTitle size="xxxs" className="euiTourHeader__subtitle">
          <h6>{subtitle}</h6>
        </EuiTitle>
        <EuiTitle size="xxs" className="euiTourHeader__title">
          <h5>{title}</h5>
        </EuiTitle>
      </EuiPopoverTitle>
      <div className="euiTour__content">{content}</div>
      <EuiPopoverFooter className="euiTourFooter">{footer}</EuiPopoverFooter>
    </EuiPopover>
  ) : (
    <Fragment>{children}</Fragment>
  );
};
