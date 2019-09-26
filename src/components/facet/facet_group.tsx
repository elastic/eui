import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { EuiFlexGroup } from '../flex';

type FacetGroupLayout = 'vertical' | 'horizontal';

const layoutToClassNameMap: { [layout in FacetGroupLayout]: string } = {
  vertical: 'euiFacetGroup--vertical',
  horizontal: 'euiFacetGroup--horizontal',
};

export const LAYOUTS = keysOf(layoutToClassNameMap);

export interface EuiFacetGroupProps {
  layout?: FacetGroupLayout;
}

type Props = CommonProps & HTMLAttributes<HTMLDivElement> & EuiFacetGroupProps;

export const EuiFacetGroup: FunctionComponent<Props> = ({
  children,
  className,
  layout = 'vertical',
  ...rest
}) => {
  const classes = classNames(
    'euiFacetGroup',
    layoutToClassNameMap[layout],
    className
  );
  const direction = layout === 'vertical' ? 'column' : 'row';
  const wrap = layout === 'vertical' ? false : true;

  return (
    <EuiFlexGroup
      className={classes}
      direction={direction}
      wrap={wrap}
      gutterSize="none"
      {...rest}>
      {children}
    </EuiFlexGroup>
  );
};
