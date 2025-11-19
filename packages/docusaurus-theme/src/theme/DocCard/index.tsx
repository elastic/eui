import { type ReactNode } from 'react';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import { usePluralForm } from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import { translate } from '@docusaurus/Translate';

import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import { EuiCard, EuiIcon } from '@elastic/eui';

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        { count }
      )
    );
}

function CardLayout({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description?: string;
}): ReactNode {
  return (
    <EuiCard
      icon={<EuiIcon size="l" type={icon} />}
      title={title}
      description={description || ''}
      titleSize="xs"
      layout="horizontal"
      href={href}
    />
  );
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      href={href}
      // Coincidentally, `folderOpen` is the same icon in EUI icon library
      icon="folderOpen"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  // We update Docusaurus `link` icon to EUI `popout` icon
  const icon = isInternalUrl(item.href) ? 'document' : 'popout';
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({
  item,
}: {
  item: PropSidebarItemCategory | PropSidebarItemLink;
}): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
