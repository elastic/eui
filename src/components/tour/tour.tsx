import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, NoArgCallback } from '../common';

import { EuiPopover, EuiPopoverProps } from '../popover';
import { EuiTourStep } from './tour_step';

export type EuiTourProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & EuiPopoverProps & {
    // TODO make than an attchedToId prop of some sort
    button: NonNullable<ReactNode>;

    // TODO carried over from popover, is this needed?
    closePopover: NoArgCallback<void>;

    isOpen?: boolean;

    /**
     * Sets the min-width of the tour popover,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    minWidth?: boolean | number | string;

    style?: CSSProperties;

    // TODO add prop docs desc
    subtitle: string;

    // TODO add prop docs desc
    title: string;
  };

export const EuiTour: React.FunctionComponent<EuiTourProps> = ({
  anchorPosition = 'leftUp',
  button,
  children,
  className,
  closePopover,
  isOpen = false,
  minWidth = true,
  style,
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

  return (
    <EuiPopover
      anchorPosition={anchorPosition}
      // TODO the button should retain its own action, not just opening a popover
      button={button}
      closePopover={closePopover}
      isOpen={isOpen}
      panelClassName={classes}
      style={newStyle || style}
      withTitle>
      <EuiTourStep
        title="Get started"
        subtitle="Demo tour"
      >
        {children}
      </EuiTourStep>
    </EuiPopover>
  );
};
