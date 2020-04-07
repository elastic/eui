import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { EuiIcon, IconColor } from '../icon';

import { EuiFlexGroup, EuiFlexItem } from '../flex';

type EuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * sets the color of the health component.
     * It can either accept `enum` values like `default`, `primary`,  `secondary`,  `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` and `ghost` or any `custom color` wrapped in `string` which can be any `valid CSS color data-type` like custom hex string present in the example
     */
    color?: IconColor;
  };

export const EuiHealth: FunctionComponent<EuiHealthProps> = ({
  children,
  className,
  color,
  ...rest
}) => {
  const classes = classNames('euiHealth', className);

  return (
    <div className={classes} {...rest}>
      <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiIcon type="dot" color={color} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{children}</EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
