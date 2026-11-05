/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * POC: flatten Components topic groups into one A–Z sidebar, then re-bucket
 * Forms, Tables (tables + data grid), and page layout docs under the existing
 * Page template category.
 * Files stay in place (URLs unchanged); only sidebar structure changes.
 */

type SidebarItem = {
  type: string;
  label?: string;
  id?: string;
  items?: SidebarItem[];
  link?: { type?: string; id?: string; [key: string]: unknown };
  [key: string]: unknown;
};

/** Topic / organizer categories to unwrap (not component families like Badge). */
const TOPIC_ORGANIZER_LABELS = new Set([
  'Containers',
  'Data grid',
  'Display',
  'Editors and syntax',
  'Forms',
  'Layout',
  'Navigation',
  'Tables',
  'Templates',
  // Forms control-type buckets
  'Date and time controls',
  'Form layouts',
  'Numeric controls',
  'Other controls',
  'Search and filter controls',
  'Selection controls',
  'Text controls',
  // Data grid sub-bucket
  'Advanced use cases',
]);

const getLabel = (item: SidebarItem): string => {
  if (typeof item.label === 'string' && item.label.length > 0) {
    return item.label;
  }
  if (typeof item.id === 'string') {
    const segment = item.id.split('/').pop() ?? item.id;
    return segment;
  }
  return '';
};

const collectDocIds = (item: SidebarItem): string[] => {
  if (item.type === 'doc' && typeof item.id === 'string') {
    return [item.id];
  }

  const ids: string[] = [];
  if (item.link?.type === 'doc' && typeof item.link.id === 'string') {
    ids.push(item.link.id);
  }
  for (const child of item.items ?? []) {
    ids.push(...collectDocIds(child));
  }
  return ids;
};

const isFormsItem = (item: SidebarItem): boolean =>
  collectDocIds(item).some((id) => id.startsWith('components/forms/'));

const isTablesItem = (item: SidebarItem): boolean =>
  collectDocIds(item).some(
    (id) =>
      id.startsWith('components/tables/') ||
      id.startsWith('components/data-grid/')
  );

/** Docs that belong under Page template (existing category + layout siblings). */
const isPageTemplateFamily = (item: SidebarItem): boolean => {
  const ids = collectDocIds(item);
  return ids.some(
    (id) =>
      id.startsWith('components/templates/page-template') ||
      id === 'layout_page_components_overview' ||
      id.startsWith('components/layout/page_components') ||
      id === 'components/layout/page-header' ||
      id.startsWith('components/layout/page-header')
  );
};

const isPageTemplateCategory = (item: SidebarItem): boolean => {
  if (item.type !== 'category') {
    return false;
  }
  if (getLabel(item).toLowerCase() === 'page template') {
    return true;
  }
  return collectDocIds(item).some((id) =>
    id.startsWith('components/templates/page-template')
  );
};

const flattenTopicOrganizers = (items: SidebarItem[]): SidebarItem[] => {
  const result: SidebarItem[] = [];

  for (const item of items) {
    if (
      item.type === 'category' &&
      typeof item.label === 'string' &&
      TOPIC_ORGANIZER_LABELS.has(item.label) &&
      Array.isArray(item.items)
    ) {
      result.push(...flattenTopicOrganizers(item.items));
      continue;
    }

    if (item.type === 'category' && Array.isArray(item.items)) {
      result.push({
        ...item,
        items: flattenTopicOrganizers(item.items),
      });
      continue;
    }

    result.push(item);
  }

  return result;
};

const isOverviewItem = (item: SidebarItem): boolean => {
  if (item.type === 'doc' && item.id === 'components/index') {
    return true;
  }
  return getLabel(item).toLowerCase() === 'overview';
};

const sortAlphabetically = (items: SidebarItem[]): SidebarItem[] => {
  const overview: SidebarItem[] = [];
  const rest: SidebarItem[] = [];

  for (const item of items) {
    if (isOverviewItem(item)) {
      overview.push(
        item.type === 'doc' ? { ...item, label: 'Overview' } : item
      );
    } else {
      rest.push(item);
    }
  }

  rest.sort((a, b) =>
    getLabel(a).localeCompare(getLabel(b), undefined, { sensitivity: 'base' })
  );

  return [...overview, ...rest];
};

/** Re-bucket Forms, Tables, and page-layout siblings into their groups. */
const regroupSidebarBuckets = (items: SidebarItem[]): SidebarItem[] => {
  const formsItems: SidebarItem[] = [];
  const tablesItems: SidebarItem[] = [];
  const pageTemplateFamily: SidebarItem[] = [];
  let pageTemplateCategory: SidebarItem | undefined;
  const otherItems: SidebarItem[] = [];

  for (const item of items) {
    if (isPageTemplateCategory(item)) {
      pageTemplateCategory = item;
    } else if (isPageTemplateFamily(item)) {
      pageTemplateFamily.push(item);
    } else if (isFormsItem(item)) {
      formsItems.push(item);
    } else if (isTablesItem(item)) {
      tablesItems.push(item);
    } else {
      otherItems.push(item);
    }
  }

  const result = [...otherItems];

  if (pageTemplateCategory || pageTemplateFamily.length > 0) {
    const existingChildren = Array.isArray(pageTemplateCategory?.items)
      ? pageTemplateCategory.items
      : [];

    result.push({
      type: 'category',
      label: 'Page template',
      collapsed: true,
      collapsible: true,
      ...(pageTemplateCategory?.link
        ? { link: pageTemplateCategory.link }
        : {}),
      items: sortAlphabetically([
        ...existingChildren,
        ...pageTemplateFamily,
      ]),
    });
  }

  if (formsItems.length > 0) {
    result.push({
      type: 'category',
      label: 'Forms',
      collapsed: true,
      collapsible: true,
      items: sortAlphabetically(formsItems),
    });
  }

  if (tablesItems.length > 0) {
    result.push({
      type: 'category',
      label: 'Tables',
      collapsed: true,
      collapsible: true,
      items: sortAlphabetically(tablesItems),
    });
  }

  return result;
};

export const flattenComponentsSidebarItems = (
  items: SidebarItem[]
): SidebarItem[] =>
  sortAlphabetically(regroupSidebarBuckets(flattenTopicOrganizers(items)));
