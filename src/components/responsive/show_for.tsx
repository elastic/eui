import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiShowForBreakpoints = 'xs' | 's' | 'm' | 'l' | 'xl';
export type EuiShowForDisplay = 'block' | 'inlineBlock' | 'flex';

export interface EuiShowForProps {
  children?: React.ReactNode;
  /**
   * List of all the responsive sizes to show the children for.
   * Options are `'xs' | 's' | 'm' | 'l' | 'xl'`
   */
  sizes: EuiShowForBreakpoints[];
  /**
   * Optional display as property. Leaving as `undefined` renders as `inline`.
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

export const EuiShowFor: FunctionComponent<EuiShowForProps> = ({
  children,
  sizes,
  display,
}) => {
  const utilityClasses = sizes.map(function(item) {
    const append = display ? `--${display}` : '';
    return `${responsiveSizesToClassNameMap[item]}${append}`;
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
