/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { RenderLinkOrButton, useEuiTheme } from '../../services';
import { CommonProps } from '../common';

import { EuiExternalLinkIcon } from './external_link_icon';
import { euiLinkStyles } from './link.styles';

export const COLORS = [
  'primary',
  'subdued',
  'success',
  'accent',
  'danger',
  'warning',
  'text',
  'ghost',
] as const;

export type EuiLinkColor = (typeof COLORS)[number];

export type EuiLinkProps = CommonProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'color'> & {
    /**
     * Any of our named colors.
     */
    color?: EuiLinkColor;
    /**
     * Set to true to show an icon indicating that it is an external link;
     * Defaults to true if `target="_blank"`
     */
    external?: boolean;
  };

export const EuiLink = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  EuiLinkProps
>(
  (
    {
      children,
      color = 'primary',
      className,
      href,
      external,
      target,
      rel,
      type = 'button',
      onClick,
      disabled,
      ...rest
    },
    ref
  ) => {
    const euiTheme = useEuiTheme();
    const styles = euiLinkStyles(euiTheme);

    return (
      <RenderLinkOrButton
        className={classNames('euiLink', className)}
        fallbackElement="a"
        elementRef={ref}
        href={href}
        target={target}
        rel={rel}
        isDisabled={disabled}
        onClick={onClick}
        componentCss={(isDisabled) => [
          styles.euiLink,
          isDisabled ? styles.disabled : styles[color],
        ]}
        buttonProps={{ type }}
        linkProps={{
          children: (
            <>
              {children}
              <EuiExternalLinkIcon external={external} target={target} />
            </>
          ),
        }}
        {...rest}
      >
        {children}
      </RenderLinkOrButton>
    );
  }
);

EuiLink.displayName = 'EuiLink';
