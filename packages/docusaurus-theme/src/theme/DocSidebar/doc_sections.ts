/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Top-level docs sections (one Docusaurus sidebar each).
 * Kept here so the sidebar switcher can list them after they're removed
 * from the navbar.
 */
export const DOC_SECTIONS = [
  { sidebarId: 'getting-started', label: 'Getting started' },
  { sidebarId: 'components', label: 'Components' },
  { sidebarId: 'utilities', label: 'Utilities' },
  { sidebarId: 'patterns', label: 'Patterns' },
  { sidebarId: 'content', label: 'Content' },
  { sidebarId: 'dataviz', label: 'Data visualization' },
] as const;

export type DocSectionId = (typeof DOC_SECTIONS)[number]['sidebarId'];

/**
 * POC: primary sections shown in the navbar after the version switcher.
 * Paths match HomepageUsers category card hrefs.
 */
export const HOME_NAV_SECTIONS = [
  {
    sidebarId: 'getting-started',
    label: 'Getting started',
    href: '/docs/getting-started/setup/',
  },
  {
    sidebarId: 'components',
    label: 'Components',
    href: '/docs/components/',
  },
  {
    sidebarId: 'utilities',
    label: 'Utilities',
    href: '/docs/utilities/accessibility/',
  },
] as const;

/** POC: secondary sections in the navbar overflow (“More”) menu */
export const HOME_NAV_OVERFLOW_SECTIONS = [
  {
    sidebarId: 'patterns',
    label: 'Patterns',
    href: '/docs/patterns/',
  },
  {
    sidebarId: 'content',
    label: 'Content',
    href: '/docs/content/',
  },
  {
    sidebarId: 'dataviz',
    label: 'Data visualization',
    href: '/docs/dataviz/',
  },
] as const;

/** POC: all sections — used by the ellipsis menu on small viewports */
export const HOME_NAV_ALL_SECTIONS = [
  ...HOME_NAV_SECTIONS,
  ...HOME_NAV_OVERFLOW_SECTIONS,
] as const;