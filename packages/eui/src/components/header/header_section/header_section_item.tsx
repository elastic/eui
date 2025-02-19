/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { euiHeaderSectionItemStyles } from './header_section_item.styles';

export type EuiHeaderSectionItemProps = CommonProps & {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
};

/**
 * Header items are small icon links that pop up menus
 */
export const EuiHeaderSectionItem: FunctionComponent<
  EuiHeaderSectionItemProps
> = ({ children, className, ...rest }) => {
  const styles = useEuiMemoizedStyles(euiHeaderSectionItemStyles);

  const classes = classNames('euiHeaderSectionItem', className);

  // we check if there is any children and if not, we don't render anything
  return children ? (
    <div className={classes} css={styles.euiHeaderSectionItem} {...rest}>
      {children}
    </div>
  ) : null;
};
