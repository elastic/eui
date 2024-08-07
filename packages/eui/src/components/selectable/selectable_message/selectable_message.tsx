/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { EuiText } from '../../text';

import { euiSelectableMessageStyles } from './selectable_message.styles';

export type EuiSelectableMessageProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> &
  CommonProps & {
    /**
     * Match this to the `listProps.bordered` property of your `EuiSelectable` instance
     */
    bordered?: boolean;
  };

export const EuiSelectableMessage: FunctionComponent<
  EuiSelectableMessageProps
> = ({ children, className, bordered = false, ...rest }) => {
  const classes = classNames('euiSelectableMessage', className);
  const styles = useEuiMemoizedStyles(euiSelectableMessageStyles);
  const cssStyles = [styles.euiSelectableMessage, bordered && styles.bordered];

  return (
    <EuiText
      color="subdued"
      size="xs"
      css={cssStyles}
      className={classes}
      {...rest}
    >
      {children}
    </EuiText>
  );
};
