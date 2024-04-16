/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../services';
import { CommonProps } from '../../common';

import { EuiCollapsibleNavContext } from '../context';
import {
  EuiCollapsibleNavItem,
  EuiCollapsibleNavSubItems,
  type EuiCollapsibleNavItemProps,
  type _SharedEuiCollapsibleNavItemProps,
} from '../collapsible_nav_item/collapsible_nav_item';
import { EuiCollapsedNavPopover } from '../collapsible_nav_item/collapsed/collapsed_nav_popover';

import { euiCollapsibleNavKibanaSolutionStyles } from './collapsible_nav_kibana_solution.styles';

export type KibanaCollapsibleNavSolutionProps =
  _SharedEuiCollapsibleNavItemProps &
    Pick<
      EuiCollapsibleNavItemProps,
      'title' | 'titleElement' | 'icon' | 'iconProps'
    > &
    Required<Pick<EuiCollapsibleNavItemProps, 'items'>> & {
      /**
       * Optional props to pass to the wrapping div
       */
      wrapperProps?: HTMLAttributes<HTMLDivElement> & CommonProps;
    };

/**
 * This component should only ever be used as a **top-level component**, and not as a sub-item.
 * It also should **not** be used in the nav footer.
 *
 * This component is **incredibly** specific to Kibana (honestly, possibly should just live there)
 * and is not meant to be a generic component.
 */
export const KibanaCollapsibleNavSolution: FunctionComponent<
  KibanaCollapsibleNavSolutionProps
> = ({ items, className, wrapperProps, ...props }) => {
  const { isCollapsed, isPush } = useContext(EuiCollapsibleNavContext);

  const classes = classNames(
    'kibanaCollapsibleNavSolution',
    className,
    wrapperProps?.className
  );

  const styles = useEuiMemoizedStyles(euiCollapsibleNavKibanaSolutionStyles);
  const cssStyles = [
    styles.euiCollapsibleNavKibanaSolution,
    isPush && isCollapsed
      ? styles.euiCollapsibleNavKibanaSolution__title
      : styles.isWrapper,
    wrapperProps?.css,
  ];

  const labelledById = useGeneratedHtmlId();

  return (
    <div {...wrapperProps} className={classes} css={cssStyles}>
      {isCollapsed && isPush ? (
        <EuiCollapsedNavPopover className={classes} items={items} {...props} />
      ) : (
        <>
          <EuiCollapsibleNavItem
            id={labelledById}
            {...props}
            css={styles.euiCollapsibleNavKibanaSolution__title}
          />
          <EuiCollapsibleNavSubItems
            items={items}
            isGroup
            role="group"
            aria-labelledby={props.id || labelledById}
          />
        </>
      )}
    </div>
  );
};
