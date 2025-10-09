/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import classNames from 'classnames';
import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { euiFlyoutHeaderStyles } from './flyout_header.styles';
import { EuiFlyoutMenu } from './flyout_menu';
import { useFlyoutManagedMenuContext } from './flyout_menu_context';
import { useHasActiveSession } from './manager';

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
  const { setHasManagedMenu: setHasCustomMenu } = useFlyoutManagedMenuContext();

  // Signal that we're providing a custom menu
  useEffect(() => {
    if (isInManagedFlyout) {
      setHasCustomMenu(true);
      return () => setHasCustomMenu(false);
    }
  }, [isInManagedFlyout, setHasCustomMenu]);

  if (isInManagedFlyout) {
    return (
      <EuiFlyoutMenu asWrapper {...rest}>
        {children}
      </EuiFlyoutMenu>
    );
  }

  const classes = classNames('euiFlyoutHeader', className);
  const cssStyles = [styles.euiFlyoutHeader, hasBorder && styles.hasBorder];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
