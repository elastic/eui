/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  HTMLAttributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';

import {
  useGeneratedHtmlId,
  findElementBySelectorOrRef,
  ElementTarget,
  useEuiMemoizedStyles,
} from '../../services';
import { logicalStyles } from '../../global_styling';
import { CommonProps, ExclusiveUnion, NoArgCallback } from '../common';
import { EuiPopoverPosition } from '../../services/popover';
import { EuiPopover, EuiPopoverProps, EuiWrappingPopover } from '../popover';
import { EuiBeacon } from '../beacon';

import { EuiTourHeader } from './_tour_header';
import { EuiTourFooter } from './_tour_footer';
import { euiTourStyles, euiTourBeaconStyles } from './tour.styles';

type _EuiPopoverProps = EuiPopoverProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'content' | 'title' | 'step'>;
type _PopoverOverrides = 'button' | 'closePopover';
type _PopoverPartials = 'closePopover';
type ExtendedEuiPopoverProps = Omit<_EuiPopoverProps, _PopoverOverrides> &
  Partial<Pick<EuiPopoverProps, _PopoverPartials>>;

export type EuiTourStepAnchorProps = ExclusiveUnion<
  {
    /**
     * Element to which the tour step popover attaches when open
     */
    children: ReactElement;
    /**
     * Selector or reference to the element to which the tour step popover attaches when open
     */
    anchor?: never;
  },
  {
    children?: never;
    anchor: ElementTarget;
  }
>;

export type EuiTourStepProps = CommonProps &
  ExtendedEuiPopoverProps &
  EuiTourStepAnchorProps & {
    /**
     * Contents of the tour step popover
     */
    content: ReactNode;

    /**
     * Step will display if set to `true`
     */
    isStepOpen?: boolean;

    /**
     * Change the default min width of the popover panel
     */
    minWidth?: CSSProperties['minWidth'];

    /**
     * Change the default max width of the popover panel
     */
    maxWidth?: CSSProperties['maxWidth'];

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
     * Smaller title text that appears atop each step in the tour. The subtitle gets wrapped in the appropriate heading level.
     */
    subtitle?: ReactNode;

    /**
     * Larger title text specific to this step. The title gets wrapped in the appropriate heading level.
     */
    title: ReactNode;

    /**
     * Extra visual indication of step location
     */
    decoration?: 'none' | 'beacon';

    /**
     * Accepts any `ReactNode` to replace the 'Skip tour' link in the footer.
     * Ideally, pass one button or an array of up to 2 buttons.
     */
    footerAction?: ReactNode | ReactNode[];
  };

export const EuiTourStep: FunctionComponent<EuiTourStepProps> = ({
  anchorPosition = 'leftUp',
  anchor,
  children,
  className,
  css,
  closePopover = () => {},
  content,
  isStepOpen = false,
  minWidth = 300,
  maxWidth = 600,
  onFinish,
  step = 1,
  stepsTotal,
  subtitle,
  title,
  decoration = 'beacon',
  footerAction,
  panelProps,
  panelClassName,
  ...rest
}) => {
  const titleId = useGeneratedHtmlId();
  if (step === 0) {
    console.warn(
      'EuiTourStep `step` should use 1-based indexing. Please update to eliminate 0 indexes.'
    );
  }

  const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<EuiPopoverPosition>();

  const onPositionChange = useCallback((position: EuiPopoverPosition) => {
    setPopoverPosition(position);
  }, []);

  useEffect(() => {
    if (anchor) {
      // Wait until next tick to find anchor node in case it's not already
      // in DOM requestAnimationFrame isn't used here because we don't need to
      // synchronize with repainting ticks and the updated value still
      // needs to go through a react DOM rerender which may take more than
      // 1 frame (16ms) of time.
      // TODO: It would be ideal to have some kind of intersection observer here instead
      const timeout = window.setTimeout(() => {
        setAnchorNode(findElementBySelectorOrRef(anchor));
      });

      return () => window.clearTimeout(timeout);
    }
  }, [anchor]);

  const anchorClasses = classNames('euiTourAnchor', className);
  const popoverClasses = classNames('euiTour', panelClassName);
  const tourStyles = useEuiMemoizedStyles(euiTourStyles);
  const beaconStyles = useEuiMemoizedStyles(euiTourBeaconStyles);
  const beaconCss = [
    beaconStyles.euiTourBeacon,
    isStepOpen && beaconStyles.isOpen,
    popoverPosition && beaconStyles[popoverPosition],
  ];

  const hasBeacon = decoration === 'beacon';

  const widthStyles = useMemo(
    () => logicalStyles({ minWidth, maxWidth }),
    [minWidth, maxWidth]
  );

  const noAnchor = !anchor && children;
  const PopoverComponent = noAnchor ? EuiPopover : EuiWrappingPopover;
  const button = noAnchor ? children : anchorNode;

  return button ? (
    <PopoverComponent
      button={button as HTMLElement & ReactNode}
      className={anchorClasses}
      anchorPosition={anchorPosition}
      closePopover={closePopover}
      isOpen={isStepOpen}
      ownFocus={false}
      panelClassName={popoverClasses}
      panelProps={{
        ...panelProps,
        css: [tourStyles.euiTour, css, panelProps?.css],
      }}
      offset={hasBeacon ? 10 : 0}
      aria-labelledby={titleId}
      arrowChildren={
        hasBeacon && <EuiBeacon css={beaconCss} className="euiTour__beacon" />
      }
      onPositionChange={onPositionChange}
      {...rest}
    >
      <div style={widthStyles}>
        <EuiTourHeader id={titleId} title={title} subtitle={subtitle} />
        <div className="euiTour__content">{content}</div>
        <EuiTourFooter
          footerAction={footerAction}
          step={step}
          stepsTotal={stepsTotal}
          onFinish={onFinish}
        />
      </div>
    </PopoverComponent>
  ) : null;
};
