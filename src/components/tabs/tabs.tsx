import React, { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const displayToClassNameMap = {
  condensed: 'euiTabs--condensed',
  default: null,
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type EuiTabsDisplaySizes = keyof typeof displayToClassNameMap;

const sizeToClassNameMap = {
  s: 'euiTabs--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiTabsSizes = keyof typeof sizeToClassNameMap;

export type EuiTabsProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Choose `default` or alternative `condensed` display styles
     */
    display?: EuiTabsDisplaySizes;
    /**
     * Evenly stretches each tab to fill the
     * horizontal space
     */
    expand?: boolean;
    size?: EuiTabsSizes;
  };

export type EuiTabRef = HTMLDivElement;

export const EuiTabs = React.forwardRef<
  EuiTabRef,
  PropsWithChildren<EuiTabsProps>
>(
  (
    {
      children,
      className,
      display = 'default',
      expand = false,
      size = 'm',
      ...rest
    }: PropsWithChildren<EuiTabsProps>,
    ref
  ) => {
    const classes = classNames(
      'euiTabs',
      displayToClassNameMap[display],
      sizeToClassNameMap[size],
      {
        'euiTabs--expand': expand,
      },
      className
    );

    return (
      <div ref={ref} role="tablist" className={classes} {...rest}>
        {children}
      </div>
    );
  }
);
