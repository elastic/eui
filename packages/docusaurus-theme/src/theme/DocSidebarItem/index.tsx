import { JSX } from 'react';
import type { Props } from '@theme-original/DocSidebarItem';
import DocSidebarItemHtml from '@theme-original/DocSidebarItem/Html';
import DocSidebarItemCategory from './Category';
import DocSidebarItemLink from './Link';

export default function DocSidebarItem({
  item,
  ...props
}: Props): JSX.Element | null {
  switch (item.type) {
    case 'category':
      return <DocSidebarItemCategory item={item} {...props} />;
    case 'html':
      return <DocSidebarItemHtml item={item} {...props} />;
    case 'link':
    default:
      return <DocSidebarItemLink item={item} {...props} />;
  }
}
