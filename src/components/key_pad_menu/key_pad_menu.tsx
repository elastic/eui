/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiFormLabel } from '../form';

export type EuiKeyPadMenuProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Renders the the group as a `fieldset` with a `legend` to label the items.
     */
    legend?: ReactNode;
  };

export const EuiKeyPadMenu: FunctionComponent<EuiKeyPadMenuProps> = ({
  children,
  className,
  legend,
  ...rest
}) => {
  const classes = classNames('euiKeyPadMenu', className);

  return legend ? (
    <fieldset className={classes} {...rest}>
      <EuiFormLabel type="legend">{legend}</EuiFormLabel>
      {children}
    </fieldset>
  ) : (
    <ul className={classes} {...rest}>
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};
