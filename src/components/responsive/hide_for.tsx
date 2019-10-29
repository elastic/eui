import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiHideForBreakpoints = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface EuiHideForProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * List of all the responsive sizes to show the children for.
   * Options are `'xs' | 's' | 'm' | 'l' | 'xl'`
   */
  sizes: EuiHideForBreakpoints[];
}

const responsiveSizesToClassNameMap = {
  xs: 'eui-hideFor--xs',
  s: 'eui-hideFor--s',
  m: 'eui-hideFor--m',
  l: 'eui-hideFor--l',
  xl: 'eui-hideFor--xl',
};

type Props = HTMLAttributes<HTMLSpanElement> & EuiHideForProps;

export const EuiHideFor: FunctionComponent<Props> = ({
  children,
  className,
  sizes,
  ...rest
}) => {
  const sizingClasses = sizes.map(function(item) {
    return responsiveSizesToClassNameMap[item];
  });

  const classes = classNames('euiHideFor', sizingClasses, className);

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
