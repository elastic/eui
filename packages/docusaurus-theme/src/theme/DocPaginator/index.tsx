/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import { css } from '@emotion/react';
import Translate, { translate } from '@docusaurus/Translate';
import PaginatorNavLink from '@theme-original/PaginatorNavLink';
import type { Props } from '@theme-original/DocPaginator';

const styles = {
  pagination: css`
    // docusaurus reset, we add spacing via the
    // horizontal rule in Layout instead
    margin-top: 0;
  `,
};

export default function DocPaginator(props: Props): JSX.Element {
  const { previous, next } = props;
  return (
    <nav
      className="pagination-nav docusaurus-mt-lg"
      css={styles.pagination}
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}
    >
      {previous && (
        <PaginatorNavLink
          {...previous}
          subLabel={
            <Translate
              id="theme.docs.paginator.previous"
              description="The label used to navigate to the previous doc"
            >
              Previous
            </Translate>
          }
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          subLabel={
            <Translate
              id="theme.docs.paginator.next"
              description="The label used to navigate to the next doc"
            >
              Next
            </Translate>
          }
          isNext
        />
      )}
    </nav>
  );
}
