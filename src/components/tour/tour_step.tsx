import React, { Fragment, FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiScreenReaderOnly } from '../accessibility';
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

import { EuiTourStepIndicator } from './tour_step_indicator';
import { EuiTourStepInterface } from './types';

type PopoverOverrides = 'button' | 'closePopover';

type EuiPopoverPartials = Partial<Pick<EuiPopoverProps, PopoverOverrides>>;

export interface EuiTourStepProps
  extends CommonProps,
    Omit<EuiPopoverProps, PopoverOverrides>,
    EuiPopoverPartials,
    EuiTourStepInterface {}

export const EuiTourStep: FunctionComponent<EuiTourStepProps> = ({
  anchorPosition = 'leftUp',
  children,
  className,
  closePopover = () => {},
  content,
  isStepOpen = false,
  isTourActive = false,
  minWidth = true,
  onEnd,
  onSkip,
  step = 1,
  stepsTotal,
  style,
  subtitle,
  title,
  decoration = 'beacon',
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
      <EuiFlexItem grow={false} aria-labelledby="stepProgress">
        <EuiI18n
          token="euiTourStep.stepProgress"
          values={{ step, stepsTotal }}
          default={({
            step,
            stepsTotal,
          }: {
            step: number;
            stepsTotal: number;
          }) => `Step ${step} of ${stepsTotal}`}>
          {(stepProgress: string) => (
            <EuiScreenReaderOnly>
              <h6 id="stepProgress">{stepProgress}</h6>
            </EuiScreenReaderOnly>
          )}
        </EuiI18n>
        <ul className="euiTourFooter__stepList">
          {[...Array(stepsTotal).keys()].map((_, i) => (
            <EuiTourStepIndicator
              key={i}
              number={i + 1}
              status={step === i + 1 ? 'active' : 'incomplete'}
            />
          ))}
        </ul>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {stepsTotal === step ? (
          <EuiI18n token="euiTourStep.endTour" default="End tour">
            {(endTour: string) => (
              <EuiButtonEmpty onClick={onEnd} {...finishButtonProps}>
                {endTour}
              </EuiButtonEmpty>
            )}
          </EuiI18n>
        ) : (
          <EuiI18n token="euiTourStep.skipTour" default="Skip tour">
            {(skipTour: string) => (
              <EuiButtonEmpty onClick={onSkip} {...finishButtonProps}>
                {skipTour}
              </EuiButtonEmpty>
            )}
          </EuiI18n>
        )}
      </EuiFlexItem>
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
