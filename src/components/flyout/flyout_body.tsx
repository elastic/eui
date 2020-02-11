import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiFlyoutBodyProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Use to display a banner at the top of the body. It is suggested to use a borderless `EuiCallOut` for it.
       */
      banner?: ReactNode;
    }
>;

export const EuiFlyoutBody: EuiFlyoutBodyProps = ({
  children,
  className,
  banner,
  ...rest
}) => {
  const classes = classNames('euiFlyoutBody', className);
  const overflowClasses = classNames('euiFlyoutBody__overflow', {
    'euiFlyoutBody__overflow-banner': banner,
  });

  return (
    <div className={classes} {...rest}>
      <div className={overflowClasses}>
        {banner}
        <div className="euiFlyoutBody__overflowContent">{children}</div>
      </div>
    </div>
  );
};
