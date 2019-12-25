import React, { HTMLAttributes, PropsWithChildren } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CommonProps } from '../common'

export type EuiTabsDisplayKeys = 'default' | 'condensed';
export type EuiTabsSizeKeys = 's' | 'm'

const displayToClassNameMap: { [key in EuiTabsDisplayKeys]: string | null } = {
  condensed: 'euiTabs--condensed',
  default: null,
};

export const DISPLAYS = Object.keys(displayToClassNameMap);

const sizeToClassNameMap: { [key in EuiTabsSizeKeys]: string | null } = {
  s: 'euiTabs--small',
  m: null,
};

export const SIZES = Object.keys(sizeToClassNameMap);

export type EuiTabsProps = CommonProps
  & HTMLAttributes<HTMLDivElement>
  & {
  display?: EuiTabsDisplayKeys
  expand?: boolean;
  size?: EuiTabsSizeKeys
  className?: string;
}

export const EuiTabs = ({
  children,
  className,
  display,
  expand,
  size,
  ...rest
}: PropsWithChildren<EuiTabsProps>) => {
  const classes = classNames(
    'euiTabs',
    /**
     * Safe usage of ! as these values are always set
     * by default property values
     */
    displayToClassNameMap[display!],
    sizeToClassNameMap[size!],
    {
      'euiTabs--expand': expand,
    },
    className
  );

  return (
    <div role="tablist" className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Choose `default` or alternative `condensed` display styles
   */
  display: PropTypes.oneOf(DISPLAYS),
  /**
   * Evenly stretches each tab to fill the
   * horizontal space
   */
  expand: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
};

EuiTabs.defaultProps = {
  display: 'default',
  expand: false,
  size: 'm',
};
