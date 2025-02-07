/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, getSecureRelForTarget } from '../../../services';
import { validateHref } from '../../../services/security/href_validator';
import { EuiIcon, IconType } from '../../icon';
import { CommonProps } from '../../common';

import { euiHeaderLogoStyles } from './header_logo.styles';

export type EuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    rel?: string;
    target?: string;
    iconType?: IconType;
    iconTitle?: string;
    /**
     * ReactNode to render as this component's content
     */
    children?: ReactNode;
  };

export const EuiHeaderLogo: FunctionComponent<EuiHeaderLogoProps> = ({
  iconType = 'logoElastic',
  iconTitle = 'Elastic',
  href,
  rel,
  target,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderLogo', className);
  const styles = useEuiMemoizedStyles(euiHeaderLogoStyles);

  const secureRel = getSecureRelForTarget({ href, rel, target });
  const isHrefValid = !href || validateHref(href);

  return (
    <a
      href={isHrefValid ? href : ''}
      rel={secureRel}
      target={target}
      css={styles.euiHeaderLogo}
      className={classes}
      {...rest}
    >
      <EuiIcon
        aria-label={iconTitle}
        className="euiHeaderLogo__icon"
        size="l"
        type={iconType}
      />

      {children && (
        <span css={styles.euiHeaderLogo__text} className="euiHeaderLogo__text">
          {children}
        </span>
      )}
    </a>
  );
};
