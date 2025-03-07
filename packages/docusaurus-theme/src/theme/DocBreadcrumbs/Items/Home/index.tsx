import { JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import { EuiIcon, useEuiMemoizedStyles } from '@elastic/eui';

import { getItemStyles } from '../item.styles';

export default function HomeBreadcrumbItem(): JSX.Element {
  const homeHref = useBaseUrl('/');

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
        EUI
      </Link>
      <EuiIcon type="arrowRight" size="s" css={styles.icon} />
    </li>
  );
}
