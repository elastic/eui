import React, { HTMLAttributes } from 'react';
import { CommonProps, Omit } from '../../common';
import classNames from 'classnames';
import { EuiText } from '../../text';

export type EuiSelectableMessageProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> &
  CommonProps & {};

export const EuiSelectableMessage: React.FunctionComponent<
  EuiSelectableMessageProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiSelectableMessage', className);

  return (
    <EuiText color="subdued" size="xs" className={classes} {...rest}>
      {children}
    </EuiText>
  );
};
