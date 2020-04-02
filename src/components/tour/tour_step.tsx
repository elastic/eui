import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, NoArgCallback } from '../common';

import { EuiBeacon } from '../beacon';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiI18n } from '../i18n';
import {
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverProps,
  EuiPopoverTitle,
} from '../popover';
import { EuiTitle } from '../title';

import { EuiTourStepIndicator, EuiTourStepStatus } from './tour_step_indicator';

type PopoverOverrides = 'button' | 'closePopover';

type EuiPopoverPartials = Partial<Pick<EuiPopoverProps, PopoverOverrides>>;

export interface EuiTourStepProps
  extends CommonProps,
    Omit<EuiPopoverProps, PopoverOverrides>,
    EuiPopoverPartials {
  children: ReactElement;
  content: ReactNode;

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
   * Function to call for 'Skip tour' and 'End tour' actions
   */
  onFinish: NoArgCallback<void>;

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

  /**
   * Larger title text specific to this step
   */
  title: string;

  /**
   * Extra visual indication of step location
   */
  decoration?: 'none' | 'beacon';

  /**
   * Element to replace the 'Skip tour' link in the footer
   */
  footerAction?: ReactElement;
}

export const EuiTourStep: FunctionComponent<EuiTourStepProps> = ({
  anchorPosition = 'leftUp',
  children,
  className,
  closePopover = () => {},
  content,
  isStepOpen = false,
  isTourActive = false,
  minWidth = true,
  onFinish,
  step = 1,
  stepsTotal,
  style,
  subtitle,
  title,
  decoration = 'beacon',
  footerAction,
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

  const finishButtonProps: EuiButtonEmptyProps = {
    color: 'text',
    flush: 'right',
    size: 'xs',
  };

  const footer = (
    <EuiFlexGroup responsive={false} justifyContent="spaceBetween">
      <EuiFlexItem grow={false}>
        <ul className="euiTourFooter__stepList">
          {[...Array(stepsTotal).keys()].map((_, i) => {
            let status: EuiTourStepStatus = 'incomplete';
            if (step === i + 1) {
              status = 'active';
            } else if (step <= i) {
              status = 'complete';
            }
            return (
              <EuiTourStepIndicator key={i} number={i + 1} status={status} />
            );
          })}
        </ul>
      </EuiFlexItem>

      {footerAction ? (
        <EuiFlexItem grow={false}>{footerAction}</EuiFlexItem>
      ) : (
        <EuiFlexItem grow={false}>
          {stepsTotal === step ? (
            <EuiI18n token="euiTourStep.endTour" default="End tour">
              {(endTour: string) => (
                <EuiButtonEmpty onClick={onFinish} {...finishButtonProps}>
                  {endTour}
                </EuiButtonEmpty>
              )}
            </EuiI18n>
          ) : (
            <EuiI18n token="euiTourStep.skipTour" default="Skip tour">
              {(skipTour: string) => (
                <EuiButtonEmpty onClick={onFinish} {...finishButtonProps}>
                  {skipTour}
                </EuiButtonEmpty>
              )}
            </EuiI18n>
          )}
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );

  const hasBeacon = decoration === 'beacon';

  return isTourActive ? (
    <EuiPopover
      anchorPosition={anchorPosition}
      button={children}
      closePopover={closePopover}
      isOpen={isStepOpen}
      panelClassName={classes}
      style={newStyle || style}
      offset={hasBeacon ? 10 : 0}
      arrowChildren={hasBeacon && <EuiBeacon className="euiTour__beacon" />}
      withTitle
      {...rest}>
      <EuiPopoverTitle className="euiTourHeader">
        <EuiTitle size="xxxs" className="euiTourHeader__subtitle">
          <h1>{subtitle}</h1>
        </EuiTitle>
        <EuiTitle size="xxs" className="euiTourHeader__title">
          <h2>{title}</h2>
        </EuiTitle>
      </EuiPopoverTitle>
      <div className="euiTour__content">{content}</div>
      <EuiPopoverFooter className="euiTourFooter">{footer}</EuiPopoverFooter>
    </EuiPopover>
  ) : (
    <Fragment>{children}</Fragment>
  );
};
