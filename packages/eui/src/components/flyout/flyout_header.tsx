/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiMemoizedStyles } from '../../services';
import { euiFlyoutHeaderStyles } from './flyout_header.styles';
import { useHasActiveSession } from './manager';
import { EuiFlyoutMenuWrapper } from './flyout_menu';
import { useFlyoutCustomMenuContext } from './flyout_custom_menu_context';

export type EuiFlyoutHeaderProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      hasBorder?: boolean;
    }
>;

export const EuiFlyoutHeader: EuiFlyoutHeaderProps = ({
  children,
  className,
  hasBorder = false,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiFlyoutHeaderStyles);

  const isInManagedFlyout = useHasActiveSession();
  const { setHasCustomMenu } = useFlyoutCustomMenuContext();

  // Signal that we're providing a custom menu
  useEffect(() => {
    if (isInManagedFlyout) {
      setHasCustomMenu(true);
      return () => setHasCustomMenu(false);
    }
  }, [isInManagedFlyout, setHasCustomMenu]);

  if (isInManagedFlyout) {
    return <EuiFlyoutMenuWrapper {...rest}>{children}</EuiFlyoutMenuWrapper>;
  }

  const classes = classNames('euiFlyoutHeader', className);
  const cssStyles = [styles.euiFlyoutHeader, hasBorder && styles.hasBorder];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
