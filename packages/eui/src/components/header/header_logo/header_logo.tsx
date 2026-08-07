/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

import {
  useEuiMemoizedStyles,
  getSecureRelForTarget,
  useEuiTheme,
} from '../../../services';
import { validateHref } from '../../../services/security/href_validator';
import { useEuiButtonColorCSS } from '../../../global_styling';

import { EuiIcon } from '../../icon';
import { CommonProps } from '../../common';

import { euiHeaderLogoStyles } from './header_logo.styles';
import SvgElasticLogoFull from './elastic_logo_full';

export type EuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    rel?: string;
    target?: string;
    iconTitle?: string;
    logoType?: 'glyph' | 'full';
  };

export const EuiHeaderLogo: FunctionComponent<EuiHeaderLogoProps> = ({
  iconTitle = 'Elastic',
  href,
  rel,
  target,
  className,
  logoType = 'glyph',
  ...rest
}) => {
  const classes = classNames('euiHeaderLogo', className);
  const { euiTheme } = useEuiTheme();
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
      {logoType === 'glyph' && (
        <EuiIcon
          aria-label={iconTitle}
          className="euiHeaderLogo__icon"
          size="l"
          type={'logoElastic'}
        />
      )}
      {logoType === 'full' && (
        <SvgElasticLogoFull
          title={iconTitle}
          style={{ maxHeight: euiTheme.size.l, width: 'auto' }}
          className="euiHeaderLogo__image"
        />
      )}
    </a>
  );
};
