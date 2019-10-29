import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiHideForBreakpoints = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface EuiHideForProps {
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

export const EuiHideFor: FunctionComponent<EuiHideForProps> = ({
  children,
  sizes,
}) => {
  const utilityClasses = sizes.map(function(item) {
    return responsiveSizesToClassNameMap[item];
  });

  if (React.isValidElement(children)) {
    return (
      <React.Fragment>
        {React.Children.map(children, (child: ReactElement<CommonProps>) =>
          React.cloneElement(child, {
            className: classNames(child.props.className, utilityClasses),
          })
        )}
      </React.Fragment>
    );
  } else {
    return <span className={classNames(utilityClasses)}>{children}</span>;
  }
};
