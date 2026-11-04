/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useThemeConfig } from '@docusaurus/theme-common';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';

const titleCaseId = (id: string) =>
  id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

/**
 * Human-readable label for the active docs sidebar (e.g. "Components"),
 * resolved from navbar `docSidebar` items when possible.
 *
 * Uses `useActiveDocContext` (not `useDocsSidebar`) so it also works in the
 * mobile navbar secondary menu, which renders outside DocsSidebarProvider.
 */
export const useDocSidebarLabel = (): string | undefined => {
  // undefined pluginId → default docs plugin
  const { activeDoc } = useActiveDocContext(undefined);
  const {
    navbar: { items },
  } = useThemeConfig();

  const sidebarName = activeDoc?.sidebar;
  if (!sidebarName) {
    return undefined;
  }

  const navbarItem = items.find(
    (item) =>
      item.type === 'docSidebar' &&
      'sidebarId' in item &&
      item.sidebarId === sidebarName
  );

  if (navbarItem && 'label' in navbarItem && typeof navbarItem.label === 'string') {
    return navbarItem.label;
  }

  return titleCaseId(sidebarName);
};
