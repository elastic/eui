/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

import { useEuiTheme } from '../../services';
import { euiModalFooterStyles } from './modal_footer.styles';

export type EuiModalFooterProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalFooter: EuiModalFooterProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalFooter', className);

  const euiTheme = useEuiTheme();
  const styles = euiModalFooterStyles(euiTheme);
  const cssStyles = [styles.euiModalFooter];

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {children}
    </div>
  );
};
