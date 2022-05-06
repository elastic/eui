/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { withEuiSystem, WithEuiSystemProps } from '../provider/system';
import { euiHealthStyles } from './health.styles';

import { CommonProps } from '../common';
import { EuiIcon, IconColor } from '../icon';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

export const TEXT_SIZES = ['xs', 's', 'm', 'inherit'] as const;

export type EuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Sets the color of the dot icon.
     * It accepts any `IconColor`: `default`, `primary`, `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` or `ghost`; or any valid CSS color value as a `string`
     */
    color?: IconColor;
    /**
     * Matches the text scales of EuiText.
     * The `inherit` style will get its font size from the parent element
     */
    textSize?: typeof TEXT_SIZES[number];
  };

export const _EuiHealth: FunctionComponent<
  EuiHealthProps & WithEuiSystemProps
> = ({ children, className, color, euiTheme, textSize = 's', ...rest }) => {
  const styles = euiHealthStyles(euiTheme);
  const cssStyles = [styles.euiHealth, styles[textSize]];
  const classes = classNames('euiHealth', className);

  return (
    <div css={cssStyles} className={classes} {...rest}>
      <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiIcon type="dot" color={color} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{children}</EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export const EuiHealth = withEuiSystem(_EuiHealth);
