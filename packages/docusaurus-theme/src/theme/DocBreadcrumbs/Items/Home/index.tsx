/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import { EuiIcon, useEuiMemoizedStyles } from '@elastic/eui';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { getItemStyles } from '../item.styles';

export default function HomeBreadcrumbItem(): JSX.Element {
  const homeHref = useBaseUrl('/');
  const { siteConfig } = useDocusaurusContext();
  const { title } = siteConfig;

  const styles = useEuiMemoizedStyles(getItemStyles);

  return (
    <li className="breadcrumbs__item" css={styles.item}>
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}
      >
        {title}
      </Link>
      <EuiIcon type="arrowRight" size="s" css={styles.icon} />
    </li>
  );
}
