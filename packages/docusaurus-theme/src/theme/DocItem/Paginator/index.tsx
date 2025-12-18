/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme-original/DocPaginator';

/**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */
export default function DocItemPaginator(): JSX.Element {
  const { metadata } = useDoc();
  return <DocPaginator previous={metadata.previous} next={metadata.next} />;
}
