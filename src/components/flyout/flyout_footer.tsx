/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import { euiFlyoutFooterStyles } from './flyout_footer.styles';

export type EuiFlyoutFooterProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiFlyoutFooter: EuiFlyoutFooterProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFlyoutFooter', className);

  const euiTheme = useEuiTheme();
  const styles = euiFlyoutFooterStyles(euiTheme);

  const cssStyles = [styles.euiFlyoutFooter];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
