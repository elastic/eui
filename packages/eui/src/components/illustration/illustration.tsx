/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useEuiMemoizedStyles, useEuiTheme } from '../../services';

import { euiIllustrationStyles } from './illustration.styles';

/**
 * The data contract for an illustration asset (e.g. an export from `@elastic/eui-illustrations`).
 * It is declared here so that `@elastic/eui` does not depend on the illustrations package.
 * The illustrations package can be released independently as long as its assets satisfy this shape.
 *
 * @remarks
 * The `light`/`dark` markup is inlined via `dangerouslySetInnerHTML`. Only pass
 * trusted, package-authored SVGs — never untrusted or user-supplied markup, as
 * it would be rendered as-is and could introduce an XSS vulnerability.
 */
export interface EuiIllustrationSource {
  /** Unique id for the illustration. */
  readonly id: string;
  /** Human-readable title, used as the default accessible label. */
  readonly title: string;
  /** Trusted SVG markup for the light color mode. Inlined verbatim — see the interface's security note. */
  readonly light: string;
  /** Trusted SVG markup for the dark color mode. Inlined verbatim — see the interface's security note. */
  readonly dark: string;
}

export type EuiIllustrationProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> &
  CommonProps & {
    /**
     * The illustration asset to render, typically imported from
     * `@elastic/eui-illustrations`.
     */
    type: EuiIllustrationSource;
    /**
     * Accessible label for the illustration. Defaults to the illustration's
     * `title`. Pass an empty string to mark the illustration as decorative.
     */
    alt?: string;
    /**
     * When `true`, stretches the SVG to fill the full width of its container.
     * When `false`, the SVG maintains its intrinsic width.
     * Defaults to `true`.
     */
    fullWidth?: boolean;
  };

export const EuiIllustration: FunctionComponent<EuiIllustrationProps> = ({
  type,
  alt,
  className,
  fullWidth = true,
  ...rest
}) => {
  const { colorMode } = useEuiTheme();
  const styles = useEuiMemoizedStyles(euiIllustrationStyles);
  const classes = classNames('euiIllustration', className);
  const cssStyles = [styles.euiIllustration, fullWidth && styles.fullWidth];

  const svg = colorMode === 'DARK' ? type.dark : type.light;

  const isDecorative = alt === '';
  const a11yProps = isDecorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': alt ?? type.title };

  return (
    <span
      className={classes}
      css={cssStyles}
      {...a11yProps}
      {...rest}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
EuiIllustration.displayName = 'EuiIllustration';
