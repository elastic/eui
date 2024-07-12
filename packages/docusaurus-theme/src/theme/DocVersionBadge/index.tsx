import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsVersion } from '@docusaurus/theme-common/internal';
import type { Props } from '@theme-original/DocVersionBadge';

export default function DocVersionBadge({
  className,
}: Props): JSX.Element | null {
  const versionMetadata = useDocsVersion();
  if (versionMetadata.badge) {
    return (
      <span
        className={clsx(
          className,
          ThemeClassNames.docs.docVersionBadge,
          'badge badge--secondary'
        )}
      >
        <Translate
          id="theme.docs.versionBadge.label"
          values={{ versionLabel: versionMetadata.label }}
        >
          {'Version: {versionLabel}'}
        </Translate>
      </span>
    );
  }
  return null;
}
