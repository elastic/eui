import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiShowForBreakpoints = 'xs' | 's' | 'm' | 'l' | 'xl';
export type EuiShowForDisplay = 'block' | 'inlineBlock' | 'flex';

export interface EuiShowForProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * List of all the responsive sizes to show the children for.
   * Options are `'xs' | 's' | 'm' | 'l' | 'xl'`
   */
  sizes: EuiShowForBreakpoints[];
  /**
   * Optional display as property. `undefined` renders as `inline`.
   * Options are `undefined | 'block' | 'inlineBlock' | 'flex'`
   */
  display?: EuiShowForDisplay;
}

const responsiveSizesToClassNameMap = {
  xs: 'eui-showFor--xs',
  s: 'eui-showFor--s',
  m: 'eui-showFor--m',
  l: 'eui-showFor--l',
  xl: 'eui-showFor--xl',
};

type Props = HTMLAttributes<HTMLSpanElement> & EuiShowForProps;

export const EuiShowFor: FunctionComponent<Props> = ({
  children,
  className,
  sizes,
  display,
  ...rest
}) => {
  const sizingClasses = sizes.map(function(item) {
    const append = display ? `--${display}` : '';
    return `${responsiveSizesToClassNameMap[item]}${append}`;
  });

  const classes = classNames('euiShowFor', sizingClasses, className);

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
