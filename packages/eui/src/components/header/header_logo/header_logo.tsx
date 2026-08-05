/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, getSecureRelForTarget } from '../../../services';
import { validateHref } from '../../../services/security/href_validator';
import { useEuiButtonColorCSS } from '../../../global_styling';
import { EuiIcon } from '../../icon';
import { CommonProps } from '../../common';

import { euiHeaderLogoStyles } from './header_logo.styles';

export type EuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    rel?: string;
    target?: string;
    iconTitle?: string;
    logoType?: 'full' | 'icon';
  };

export const EuiHeaderLogo: FunctionComponent<EuiHeaderLogoProps> = ({
  logoType = 'icon',
  iconTitle = 'Elastic',
  href,
  rel,
  target,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderLogo', className);
  const styles = useEuiMemoizedStyles(euiHeaderLogoStyles);
  const buttonColorStyles = useEuiButtonColorCSS({ display: 'empty' });
  const cssStyles = [styles.euiHeaderLogo, buttonColorStyles.text];

  const secureRel = getSecureRelForTarget({ href, rel, target });
  const isHrefValid = !href || validateHref(href);

  return (
    <a
      href={isHrefValid ? href : ''}
      rel={secureRel}
      target={target}
      css={cssStyles}
      className={classes}
      {...rest}
    >
      <EuiIcon
        aria-label={iconTitle}
        className="euiHeaderLogo__icon"
        size="l"
        type={logoType === 'full' ? 'logoElasticFull' : 'logoElastic'}
      />
    </a>
  );
};
