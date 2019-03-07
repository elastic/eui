import React, { HTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
// @ts-ignore
import { EuiText } from '../../text';

export type EuiSelectableMessageProps = HTMLAttributes<HTMLDivElement> &
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
