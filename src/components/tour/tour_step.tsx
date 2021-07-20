/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
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
import { htmlIdGenerator } from '../../services';

type PopoverOverrides = 'button' | 'closePopover';

type EuiPopoverPartials = Partial<Pick<EuiPopoverProps, PopoverOverrides>>;

export interface EuiTourStepProps
  extends CommonProps,
    Omit<EuiPopoverProps, PopoverOverrides>,
    EuiPopoverPartials {
  /**
   * Element to which the tour step popover attaches when open
   */
  children: ReactElement;

  /**
   * Contents of the tour step popover
   */
  content: ReactNode;

  /**
   * Step will display if set to `true`
   */
  isStepOpen?: boolean;

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
   * The number of the step within the parent tour. 1-based indexing.
   */
  step: number;

  /**
   * The total number of steps in the tour
   */
  stepsTotal: number;

  /**
   * Optional, standard DOM `style` attribute. Passed to the EuiPopover panel.
   */
  style?: CSSProperties;

  /**
   * Smaller title text that appears atop each step in the tour. The subtitle gets wrapped in the appropriate heading level.
   */
  subtitle: ReactNode;

  /**
   * Larger title text specific to this step. The title gets wrapped in the appropriate heading level.
   */
  title: ReactNode;

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
  const generatedId = htmlIdGenerator();
  const titleId = generatedId();
  if (step === 0) {
    console.warn(
      'EuiTourStep `step` should 1-based indexing. Please update to eliminate 0 indexes.'
    );
  }
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
    <EuiFlexGroup
      responsive={false}
      justifyContent={stepsTotal > 1 ? 'spaceBetween' : 'flexEnd'}>
      {stepsTotal > 1 && (
        <EuiFlexItem grow={false}>
          <ul className="euiTourFooter__stepList">
            {[...Array(stepsTotal).keys()].map((_, i) => {
              let status: EuiTourStepStatus = 'complete';
              if (step === i + 1) {
                status = 'active';
              } else if (step <= i) {
                status = 'incomplete';
              }
              return (
                <EuiTourStepIndicator key={i} number={i + 1} status={status} />
              );
            })}
          </ul>
        </EuiFlexItem>
      )}

      {footerAction ? (
        <EuiFlexItem grow={false}>{footerAction}</EuiFlexItem>
      ) : (
        <EuiFlexItem grow={false}>
          <EuiI18n
            tokens={[
              'euiTourStep.endTour',
              'euiTourStep.skipTour',
              'euiTourStep.closeTour',
            ]}
            defaults={['End tour', 'Skip tour', 'Close tour']}>
            {([endTour, skipTour, closeTour]: string[]) => {
              let content = closeTour;
              if (stepsTotal > 1) {
                content = stepsTotal === step ? endTour : skipTour;
              }
              return (
                <EuiButtonEmpty onClick={onFinish} {...finishButtonProps}>
                  {content}
                </EuiButtonEmpty>
              );
            }}
          </EuiI18n>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );

  const hasBeacon = decoration === 'beacon';

  return (
    <EuiPopover
      anchorPosition={anchorPosition}
      button={children}
      closePopover={closePopover}
      isOpen={isStepOpen}
      ownFocus={false}
      panelClassName={classes}
      panelStyle={newStyle || style}
      offset={hasBeacon ? 10 : 0}
      aria-labelledby={titleId}
      arrowChildren={hasBeacon && <EuiBeacon className="euiTour__beacon" />}
      {...rest}>
      <EuiPopoverTitle className="euiTourHeader" id={titleId}>
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
  );
};
