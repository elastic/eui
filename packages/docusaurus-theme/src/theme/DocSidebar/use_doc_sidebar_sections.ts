/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo } from 'react';
import {
  useActiveDocContext,
  useLayoutDocsSidebar,
} from '@docusaurus/plugin-content-docs/client';

import { DOC_SECTIONS } from './doc_sections';

export type DocSidebarSection = {
  sidebarId: string;
  label: string;
  path: string;
};

/**
 * Resolves top-level section links the same way DocSidebarNavbarItem does
 * (`useLayoutDocsSidebar`), plus the active section for the current doc.
 *
 * Safe outside DocsSidebarProvider (mobile navbar secondary menu).
 */
export const useDocSidebarSections = (): {
  sections: DocSidebarSection[];
  activeSidebarId: string | undefined;
  activeLabel: string | undefined;
} => {
  // Fixed list — one hook call per known sidebar (hooks can't run in a loop)
  const gettingStarted = useLayoutDocsSidebar('getting-started');
  const components = useLayoutDocsSidebar('components');
  const utilities = useLayoutDocsSidebar('utilities');
  const patterns = useLayoutDocsSidebar('patterns');
  const content = useLayoutDocsSidebar('content');
  const dataviz = useLayoutDocsSidebar('dataviz');

  const { activeDoc } = useActiveDocContext(undefined);

  const linksById = useMemo(
    () => ({
      'getting-started': gettingStarted.link,
      components: components.link,
      utilities: utilities.link,
      patterns: patterns.link,
      content: content.link,
      dataviz: dataviz.link,
    }),
    [
      gettingStarted.link,
      components.link,
      utilities.link,
      patterns.link,
      content.link,
      dataviz.link,
    ]
  );

  const sections = useMemo(
    () =>
      DOC_SECTIONS.flatMap((section) => {
        const link = linksById[section.sidebarId];
        if (!link?.path) {
          return [];
        }
        return [
          {
            sidebarId: section.sidebarId,
            label: section.label,
            path: link.path,
          },
        ];
      }),
    [linksById]
  );

  // POC: homepage (and other non-doc routes) default to Components so the
  // section switcher still renders when there is no active doc.
  const activeSidebarId = activeDoc?.sidebar ?? 'components';
  const activeLabel = sections.find(
    (section) => section.sidebarId === activeSidebarId
  )?.label;

  return { sections, activeSidebarId, activeLabel };
};
