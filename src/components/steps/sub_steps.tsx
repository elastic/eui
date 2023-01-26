/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import { euiSubStepsStyles } from './sub_steps.styles';

export type EuiSubStepsProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiSubSteps: EuiSubStepsProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiSubSteps', className);
  const euiTheme = useEuiTheme();
  const styles = euiSubStepsStyles(euiTheme);
  const cssStyles = [styles.euiSubSteps];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
