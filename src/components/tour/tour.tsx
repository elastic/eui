import React, { CSSProperties, HTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiButton } from '../button';
import { EuiPopover, EuiPopoverProps } from '../popover';
import { EuiTourStep } from './tour_step';

export type EuiTourProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & EuiPopoverProps & {
    title: string;
    subtitle: string;
    /**
     * Sets the min-width of the tour popover,
     * set to `true` to use the default size,
     * set to `false` to not restrict the width,
     * set to a number for a custom width in px,
     * set to a string for a custom width in custom measurement.
     */
    minWidth?: boolean | number | string;

    style?: CSSProperties;
  };

export const EuiTour: React.FunctionComponent<EuiTourProps> = ({
  anchorPosition = 'leftUp',
  children,
  className,
  minWidth = true,
  style,
  subtitle,
  title,
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);
  
  const button = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={() => handleToggle()}>
      Do this first
    </EuiButton>
  );

  const handleToggle = () => {
    if (isPopoverOpen) {
      setIsPopoverOpen(false);
    } else {
      setIsPopoverOpen(true);
    }
  };

  return (
    <EuiPopover
      anchorPosition={anchorPosition}
      button={button}
      closePopover={() => handleToggle()}
      isOpen={isPopoverOpen}
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
