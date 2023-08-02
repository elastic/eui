/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { useEuiTheme, useGeneratedHtmlId } from '../../../services';

import { euiHeaderAlertStyles } from './header_alert.styles';

export type EuiHeaderAlertProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * Adds a link to the alert.
     */
    action?: ReactNode;
    date: ReactNode;
    text?: ReactNode;
    title: ReactNode;
    /**
     * Accepts an `EuiBadge` that displays on the alert
     */
    badge?: ReactNode;
  };

export const EuiHeaderAlert: FunctionComponent<EuiHeaderAlertProps> = ({
  action,
  className,
  date,
  text,
  title,
  badge,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiHeaderAlertStyles(euiTheme);

  const classes = classNames('euiHeaderAlert', className);

  const ariaId = useGeneratedHtmlId();

  return (
    <article
      aria-labelledby={`${ariaId}-title`}
      className={classes}
      css={styles.euiHeaderAlert}
      {...rest}
    >
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem>
          <div
            className="euiHeaderAlert__date"
            css={styles.euiHeaderAlert__date}
          >
            {date}
          </div>
        </EuiFlexItem>
        {badge && <EuiFlexItem grow={false}>{badge}</EuiFlexItem>}
      </EuiFlexGroup>

      <h3
        id={`${ariaId}-title`}
        className="euiHeaderAlert__title"
        css={styles.euiHeaderAlert__title}
      >
        {title}
      </h3>
      <div className="euiHeaderAlert__text" css={styles.euiHeaderAlert__text}>
        {text}
      </div>
      {action && (
        <div
          className="euiHeaderAlert__action"
          css={styles.euiHeaderAlert__action}
        >
          {action}
        </div>
      )}
    </article>
  );
};
