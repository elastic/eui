import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { EuiIcon, IconColor } from '../icon';

import { EuiFlexGroup, EuiFlexItem } from '../flex';

type EuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Sets the color of the dot icon.
     * It accepts any `IconColor`: `default`, `primary`, `secondary`, `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` or `ghost`; or any valid CSS color value as a `string`
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
