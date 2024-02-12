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
import { useEuiTheme } from '../../services';
import { euiFlyoutBodyStyles } from './flyout_body.styles';

export type EuiFlyoutBodyProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Use to display a banner at the top of the body. It is suggested to use `EuiCallOut` for it.
       */
      banner?: ReactNode;
      /**
       * [Scrollable regions (or their children) should be focusable](https://dequeuniversity.com/rules/axe/4.0/scrollable-region-focusable)
       * to allow keyboard users to scroll the region via arrow keys.
       *
       * By default, EuiFlyoutBody's scroll overflow wrapper sets a `tabIndex` of `0`.
       * If you know your flyout body content already contains focusable children
       * that satisfy keyboard accessibility requirements, you can use this prop
       * to override this default.
       */
      scrollableTabIndex?: number;
    }
>;

export const EuiFlyoutBody: EuiFlyoutBodyProps = ({
  children,
  className,
  banner,
  scrollableTabIndex = 0,
  ...rest
}) => {
  const classes = classNames('euiFlyoutBody', className);

  const euiTheme = useEuiTheme();
  const styles = euiFlyoutBodyStyles(euiTheme);

  const cssStyles = [styles.euiFlyoutBody];
  const bannerCssStyles = [banner && styles.euiFlyoutBody__banner];
  const overflowCssStyles = [
    banner
      ? styles.euiFlyoutBody__overflow.hasBanner
      : styles.euiFlyoutBody__overflow.noBanner,
  ];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      <div
        tabIndex={scrollableTabIndex}
        className="euiFlyoutBody__overflow"
        css={overflowCssStyles}
      >
        {banner && (
          <div className="euiFlyoutBody__banner" css={bannerCssStyles}>
            {banner}
          </div>
        )}
        <div className="euiFlyoutBody__overflowContent">{children}</div>
      </div>
    </div>
  );
};
