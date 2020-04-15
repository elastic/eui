/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { EuiIcon, IconType } from '../icon';
import { CommonProps } from '../common';
import { getSecureRelForTarget } from '../../services';

export type EuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    rel?: string;
    target?: string;
    iconType?: IconType;
    iconTitle?: string;
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
  const secureRel = getSecureRelForTarget({ href, rel, target });
  return (
    <a
      href={href}
      rel={secureRel}
      target={target}
      className={classes}
      {...rest}>
      <EuiIcon
        aria-label={iconTitle}
        className="euiHeaderLogo__icon"
        size="l"
        type={iconType}
      />

      {children && <span className="euiHeaderLogo__text">{children}</span>}
    </a>
  );
};
