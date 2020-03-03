import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';

export type EuiCollapsibleNavProps = EuiFlyoutProps & {
  children?: ReactNode;
  /**
   * Keep navigation flyout visible and push `<body>` content via padding
   */
  docked?: boolean;
};

export const EuiCollapsibleNav: FunctionComponent<EuiCollapsibleNavProps> = ({
  children,
  className,
  docked,
  onClose,
  ...rest
}) => {
  useEffect(() => {
    if (docked) {
      document.body.classList.add('euiBody--collapsibleNavIsDocked');
    }
    return () => {
      document.body.classList.remove('euiBody--collapsibleNavIsDocked');
    };
  }, [docked]);

  const collapse = () => {
    if (!docked) {
      onClose();
    }
  };

  const classes = classNames(
    'euiCollapsibleNav',
    { 'euiCollapsibleNav--isDocked': docked },
    className
  );

  return (
    <EuiFlyout
      ownFocus={!docked}
      onClose={collapse}
      size="s"
      className={classes}
      hideCloseButton={true}
      {...rest}>
      {/* TODO: Add a "skip navigation" keyboard only button */}
      {children}
    </EuiFlyout>
  );
};
