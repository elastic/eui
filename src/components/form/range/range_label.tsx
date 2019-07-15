import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiRangeLabelProps {
  children: string | number;
  disabled?: boolean;
  side?: 'min' | 'max';
}

export const EuiRangeLabel: FunctionComponent<EuiRangeLabelProps> = ({
  children,
  disabled,
  side = 'max',
}) => {
  const classes = classNames('euiRangeLabel', `euiRangeLabel--${side}`, {
    'euiRangeLabel--isDisabled': disabled,
  });
  return <label className={classes}>{children}</label>;
};
