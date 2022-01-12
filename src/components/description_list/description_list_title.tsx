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
import { EuiBadge } from '../badge';

export type EuiDescriptionListTitleProps = {
  inline?: boolean;
};

export const EuiDescriptionListTitle: FunctionComponent<
  EuiDescriptionListTitleProps & CommonProps & HTMLAttributes<HTMLElement>
> = ({ children, inline, className, ...rest }) => {
  const classes = classNames('euiDescriptionList__title', className);
  return (
    <dt className={classes} {...rest}>
      {inline ? (
        <EuiBadge className="euiDescriptionList__titleBadge">
          {children}
        </EuiBadge>
      ) : (
        children
      )}
    </dt>
  );
};
