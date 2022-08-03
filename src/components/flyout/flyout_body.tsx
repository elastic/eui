/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useContext,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiTheme } from '../../services';
import { euiFlyoutBodyStyles } from './flyout_body.styles';

import { EuiFlyoutContext } from './flyout_context';

export type EuiFlyoutBodyProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      /**
       * Use to display a banner at the top of the body. It is suggested to use `EuiCallOut` for it.
       */
      banner?: ReactNode;
    }
>;

export const EuiFlyoutBody: EuiFlyoutBodyProps = ({
  children,
  className,
  banner,
  ...rest
}) => {
  const { paddingSize } = useContext(EuiFlyoutContext);
  const euiTheme = useEuiTheme();
  const styles = euiFlyoutBodyStyles(paddingSize, euiTheme);

  const cssStyles = [styles.euiFlyoutBody, banner && styles.banner];

  const overflowCSSStyles = [
    styles.overflow,
    banner && styles['overflow--hasBanner'],
  ];

  // Overflow padding for body contents excluding the banner
  const overflowBodyCSSStyles = [styles['overflow-bodyPadding']];

  const classes = classNames('euiFlyoutBody', className);
  const overflowClasses = classNames('euiFlyoutBody__overflow', {
    'euiFlyoutBody__overflow--hasBanner': banner,
  });

  return (
    <div className={classes} {...rest} css={cssStyles}>
      <div tabIndex={0} className={overflowClasses} css={overflowCSSStyles}>
        {banner && <div className="euiFlyoutBody__banner">{banner}</div>}
        <div
          className="euiFlyoutBody__overflowContent"
          css={overflowBodyCSSStyles}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
