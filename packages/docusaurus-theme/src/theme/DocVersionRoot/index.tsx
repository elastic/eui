import React from 'react';
import { HtmlClassNameProvider, PageMetadata } from '@docusaurus/theme-common';
import {
  docVersionSearchTag,
  DocsVersionProvider,
} from '@docusaurus/theme-common/internal';
import renderRoutes from '@docusaurus/renderRoutes';
import SearchMetadata from '@theme-original/SearchMetadata';

import type { Props } from '@theme-original/DocVersionRoot';

function DocVersionRootMetadata(props: any): JSX.Element {
  const { version } = props;
  return (
    <>
      <SearchMetadata
        version={version.version}
        tag={docVersionSearchTag(version.pluginId, version.version)}
      />
      <PageMetadata>
        {version.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </PageMetadata>
    </>
  );
}

function DocVersionRootContent(props: any): JSX.Element {
  const { version, route } = props;
  return (
    <HtmlClassNameProvider className={version.className}>
      <DocsVersionProvider version={version}>
        {renderRoutes(route.routes!)}
      </DocsVersionProvider>
    </HtmlClassNameProvider>
  );
}
export default function DocVersionRoot(props: any): JSX.Element {
  return (
    <>
      <DocVersionRootMetadata {...props} />
      <DocVersionRootContent {...props} />
    </>
  );
}
