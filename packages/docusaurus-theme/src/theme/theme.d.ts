// Docusaurus static asset alias
declare module '@site/*';

// Prop types are declared for @theme scope in @docusaurus/theme-classic
// but when using swizzle --eject the type import is not available.
// we re-declare the needed types here to ensure type checking
// NOTE: when using swizzle --wrap there is the approach to do the following:
// type Props = WrapperProps<typeof NameOfComponent> but it will result in `any` type

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-plugin-content-docs/src/plugin-content-docs.d.ts#L635
declare module '@theme-original/DocRoot' {
  import type { RouteConfigComponentProps } from 'react-router-config';
  import type { Required } from 'utility-types';

  export interface Props extends Required<RouteConfigComponentProps, 'route'> {}

  export default function DocRoot(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L510
declare module '@theme-original/DocRoot/Layout' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
  }

  export default function DocRootLayout(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L543
declare module '@theme-original/DocRoot/Layout/Main' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly hiddenSidebarContainer: boolean;
    readonly children: ReactNode;
  }

  export default function DocRootLayoutMain(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L520
declare module '@theme-original/DocRoot/Layout/Sidebar' {
  import type { Dispatch, SetStateAction } from 'react';
  import type { PropSidebar } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly sidebar: PropSidebar;
    readonly hiddenSidebarContainer: boolean;
    readonly setHiddenSidebarContainer: Dispatch<SetStateAction<boolean>>;
  }

  export default function DocRootLayoutSidebar(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L533
declare module '@theme-original/DocRoot/Layout/Sidebar/ExpandButton' {
  export interface Props {
    toggleSidebar: () => void;
  }

  export default function DocRootLayoutSidebarExpandButton(
    props: Props
  ): JSX.Element;
}

// original" https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L672
declare module '@theme-original/DocVersionBanner' {
  export interface Props {
    readonly className?: string;
  }

  export default function DocVersionBanner(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L680
declare module '@theme-original/DocVersionBadge' {
  export interface Props {
    readonly className?: string;
  }

  export default function DocVersionBadge(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/d2bb74a8fd4ee92fc7ff806657dbb35de1de845f/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L560
declare module '@theme-original/DocItem/Content' {
  export interface Props {
    readonly children: JSX.Element;
  }
}

// original: https://github.com/facebook/docusaurus/blob/d2bb74a8fd4ee92fc7ff806657dbb35de1de845f/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L554
declare module '@theme-original/DocPaginator' {
  import type { PropNavigation } from '@docusaurus/plugin-content-docs';

  export interface Props extends PropNavigation {}

  export default function DocPaginator(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/d2bb74a8fd4ee92fc7ff806657dbb35de1de845f/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1252
declare module '@theme-original/PaginatorNavLink' {
  import type { ReactNode } from 'react';
  import type { PropNavigationLink } from '@docusaurus/plugin-content-docs';

  export interface Props extends Omit<PropNavigationLink, 'title'> {
    readonly title: ReactNode;
    readonly subLabel?: JSX.Element;
    readonly isNext?: boolean;
  }

  export default function PaginatorNavLink(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L702
declare module '@theme-original/EditThisPage' {
  export interface Props {
    readonly editUrl: string;
  }
  export default function EditThisPage(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L364
declare module '@theme/CodeBlock' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
    readonly metastring?: string;
    readonly title?: string;
    readonly language?: string;
    readonly showLineNumbers?: boolean;
  }

  export default function CodeBlock(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L510
declare module '@theme/MDXComponents/Code' {
  import type {ComponentProps} from 'react';

  export interface Props extends ComponentProps<'code'> {}

  export default function MDXCode(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L563
declare module '@theme-original/DocSidebar' {
  import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
    readonly onCollapse: () => void;
    readonly isHidden: boolean;
  }

  export default function DocSidebar(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L576
declare module '@theme-original/DocSidebar/Mobile' {
  import type { Props as DocSidebarProps } from '@theme-original/DocSidebar';

  export interface Props extends DocSidebarProps {}

  export default function DocSidebarMobile(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L584
declare module '@theme-original/DocSidebar/Desktop' {
  import type { Props as DocSidebarProps } from '@theme-original/DocSidebar';

  export interface Props extends DocSidebarProps {}

  export default function DocSidebarDesktop(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L592
declare module '@theme-original/DocSidebar/Desktop/Content' {
  import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly className?: string;
    readonly path: string;
    readonly sidebar: readonly PropSidebarItem[];
  }

  export default function Content(props: Props): JSX.Element;
}

// original
declare module '@theme-original/DocSidebar/Desktop/CollapseButton' {
  export interface Props {
    readonly onClick: React.MouseEventHandler;
  }

  export default function CollapseButton(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L612
declare module '@theme-original/DocSidebarItem' {
  import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

  export interface Props {
    readonly activePath: string;
    readonly onItemClick?: (item: PropSidebarItem) => void;
    readonly level: number;
    readonly tabIndex?: number;
    readonly item: PropSidebarItem;
    readonly index: number;
  }

  export default function DocSidebarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L661
declare module '@theme-original/DocSidebarItems' {
  import type { Props as DocSidebarItemProps } from '@theme-original/DocSidebarItem';
  import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

  export interface Props extends Omit<DocSidebarItemProps, 'item' | 'index'> {
    readonly items: readonly PropSidebarItem[];
  }

  export default function DocSidebarItems(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L627
declare module '@theme-original/DocSidebarItem/Link' {
  import type { Props as DocSidebarItemProps } from '@theme-original/DocSidebarItem';

  import type { PropSidebarItemLink } from '@docusaurus/plugin-content-docs';

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemLink;
  }

  export default function DocSidebarItemLink(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L639
declare module '@theme-original/DocSidebarItem/Html' {
  import type { Props as DocSidebarItemProps } from '@theme-original/DocSidebarItem';
  import type { PropSidebarItemHtml } from '@docusaurus/plugin-content-docs';

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemHtml;
  }

  export default function DocSidebarItemHtml(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L650
declare module '@theme-original/DocSidebarItem/Category' {
  import type { Props as DocSidebarItemProps } from '@theme-original/DocSidebarItem';
  import type { PropSidebarItemCategory } from '@docusaurus/plugin-content-docs';

  export interface Props extends DocSidebarItemProps {
    readonly item: PropSidebarItemCategory;
  }

  export default function DocSidebarItemCategory(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1051
declare module '@theme-original/NavbarItem/DefaultNavbarItem' {
  import type { Props as NavbarNavLinkProps } from '@theme-original/NavbarItem/NavbarNavLink';

  export type DesktopOrMobileNavBarItemProps = NavbarNavLinkProps & {
    readonly isDropdownItem?: boolean;
    readonly className?: string;
    readonly position?: 'left' | 'right';
  };

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DefaultNavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/a6de0f2725c68854bb37acab25705c4a7709f230/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1407
declare module '@theme-original/ColorModeToggle' {
  import type { ColorMode } from '@docusaurus/theme-common';

  export interface Props {
    readonly className?: string;
    readonly buttonClassName?: string;
    readonly value: ColorMode;
    /**
     * The parameter represents the "to-be" value. For example, if currently in
     * dark mode, clicking the button should call `onChange("light")`
     */
    readonly onChange: (colorMode: ColorMode) => void;
  }

  export default function ColorModeToggle(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/026a317fc4300e6ae1817404519d229d2ca684a4/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1014
declare module '@theme-original/Navbar/Layout' {
  export interface Props {
    readonly children: React.ReactNode;
  }

  export default function NavbarLayout(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1067
declare module '@theme-original/NavbarItem/NavbarNavLink' {
  import type { ReactNode } from 'react';
  import type { Props as LinkProps } from '@docusaurus/Link';

  export interface Props extends LinkProps {
    readonly activeBasePath?: string;
    readonly activeBaseRegex?: string;
    readonly exact?: boolean;
    readonly label?: ReactNode;
    readonly html?: string;
    readonly prependBaseUrlToHref?: boolean;
    readonly isDropdownLink?: boolean;
  }

  export default function NavbarNavLink(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1084
declare module '@theme-original/NavbarItem/DropdownNavbarItem' {
  import type { Props as NavbarNavLinkProps } from '@theme-original/NavbarItem/NavbarNavLink';
  import type { LinkLikeNavbarItemProps } from '@theme-original/NavbarItem';

  export type LinkLikeNavbarItemProps = LinkLikeNavbarItemProps;

  export type DesktopOrMobileNavBarItemProps = NavbarNavLinkProps & {
    readonly position?: 'left' | 'right';
    readonly items: readonly LinkLikeNavbarItemProps[];
    readonly className?: string;
  };

  export interface Props extends DesktopOrMobileNavBarItemProps {
    readonly mobile?: boolean;
  }

  export default function DropdownNavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1101
declare module '@theme-original/NavbarItem/SearchNavbarItem' {
  export interface Props {
    readonly mobile?: boolean;
    readonly className?: string;
  }

  export default function SearchNavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1110
declare module '@theme-original/NavbarItem/LocaleDropdownNavbarItem' {
  import type { Props as DropdownNavbarItemProps } from '@theme-original/NavbarItem/DropdownNavbarItem';
  import type { LinkLikeNavbarItemProps } from '@theme-original/NavbarItem';

  export interface Props extends DropdownNavbarItemProps {
    readonly dropdownItemsBefore: LinkLikeNavbarItemProps[];
    readonly dropdownItemsAfter: LinkLikeNavbarItemProps[];
    readonly queryString?: string;
  }

  export default function LocaleDropdownNavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1123
declare module '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem' {
  import type { Props as DropdownNavbarItemProps } from '@theme-original/NavbarItem/DropdownNavbarItem';
  import type { LinkLikeNavbarItemProps } from '@theme-original/NavbarItem';

  export interface Props extends DropdownNavbarItemProps {
    readonly docsPluginId?: string;
    readonly dropdownActiveClassDisabled?: boolean;
    readonly dropdownItemsBefore: LinkLikeNavbarItemProps[];
    readonly dropdownItemsAfter: LinkLikeNavbarItemProps[];
  }

  export default function DocsVersionDropdownNavbarItem(
    props: Props
  ): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1139
declare module '@theme/NavbarItem/DocsVersionNavbarItem' {
  import type { Props as DefaultNavbarItemProps } from '@theme-original/NavbarItem/DefaultNavbarItem';

  export interface Props extends DefaultNavbarItemProps {
    readonly docsPluginId?: string;
  }

  export default function DocsVersionNavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1149
declare module '@theme-original/NavbarItem/DocNavbarItem' {
  import type { Props as DefaultNavbarItemProps } from '@theme-original/NavbarItem/DefaultNavbarItem';

  export interface Props extends DefaultNavbarItemProps {
    readonly docId: string;
    readonly docsPluginId?: string;
  }

  export default function DocsSidebarNavbarItem(
    props: Props
  ): JSX.Element | null;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1162
declare module '@theme-original/NavbarItem/DocSidebarNavbarItem' {
  import type { Props as DefaultNavbarItemProps } from '@theme-original/NavbarItem/DefaultNavbarItem';

  export interface Props extends DefaultNavbarItemProps {
    readonly sidebarId: string;
    readonly docsPluginId?: string;
  }

  export default function DocSidebarNavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1173
declare module '@theme-original/NavbarItem/HtmlNavbarItem' {
  import type { Props as DefaultNavbarItemProps } from '@theme-original/NavbarItem/DefaultNavbarItem';

  export interface Props extends DefaultNavbarItemProps {
    readonly value: string;
  }

  export default function HtmlNavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/fa743c81defd24e22eae45c81bd79eb8ec2c4ef0/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1214
declare module '@theme-original/NavbarItem' {
  import type { ComponentProps } from 'react';
  import type { Props as DefaultNavbarItemProps } from '@theme-original/NavbarItem/DefaultNavbarItem';
  import type { Props as DocNavbarItemProps } from '@theme-original/NavbarItem/DocNavbarItem';
  import type { Props as DocSidebarNavbarItemProps } from '@theme-original/NavbarItem/DocSidebarNavbarItem';
  import type { Props as DocsVersionNavbarItemProps } from '@theme-original/NavbarItem/DocsVersionNavbarItem';
  import type { Props as DropdownNavbarItemProps } from '@theme-original/NavbarItem/DropdownNavbarItem';
  import type { Props as DocsVersionDropdownNavbarItemProps } from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
  import type { Props as LocaleDropdownNavbarItemProps } from '@theme-original/NavbarItem/LocaleDropdownNavbarItem';
  import type { Props as SearchNavbarItemProps } from '@theme-original/NavbarItem/SearchNavbarItem';
  import type { Props as HtmlNavbarItemProps } from '@theme-original/NavbarItem/HtmlNavbarItem';

  export type LinkLikeNavbarItemProps =
    | ({ readonly type?: 'default' } & DefaultNavbarItemProps)
    | ({ readonly type: 'doc' } & DocNavbarItemProps)
    | ({ readonly type: 'docsVersion' } & DocsVersionNavbarItemProps)
    | ({ readonly type: 'docSidebar' } & DocSidebarNavbarItemProps)
    | ({ readonly type: 'html' } & HtmlNavbarItemProps);

  export type Props = ComponentProps<'a'> & {
    readonly position?: 'left' | 'right';
  } & (
      | LinkLikeNavbarItemProps
      | ({ readonly type?: 'dropdown' } & DropdownNavbarItemProps)
      | ({
          readonly type: 'docsVersionDropdown';
        } & DocsVersionDropdownNavbarItemProps)
      | ({ readonly type: 'localeDropdown' } & LocaleDropdownNavbarItemProps)
      | ({
          readonly type: 'search';
        } & SearchNavbarItemProps)
    );

  export type NavbarItemType = Props['type'];

  export default function NavbarItem(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/80203b385dd5a2a87039af3a73e141101574e440/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1340
declare module '@theme-original/TOC' {
  import type { TOCItem } from '@docusaurus/mdx-loader';

  // `minHeadingLevel` only comes from doc/post front matter, and won't have a
  // default set by Joi. See TOC, TOCInline, TOCCollapsible for examples.
  export interface Props {
    readonly toc: readonly TOCItem[];
    readonly minHeadingLevel?: number;
    readonly maxHeadingLevel?: number;
    readonly className?: string;
  }

  export default function TOC(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/80203b385dd5a2a87039af3a73e141101574e440/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1328
declare module '@theme-original/TOCItems/Tree' {
  import type { TOCTreeNode } from '@docusaurus/theme-common/internal';

  export interface Props {
    readonly toc: readonly TOCTreeNode[];
    readonly className: string;
    readonly linkClassName: string | null;
    readonly isChild?: boolean;
  }

  export default function TOCItems(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/8b877d27d4b1bcd5c2ee13dde8332407a1c26447/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1381
declare module '@theme-original/TOCCollapsible/CollapseButton' {
  import type { ComponentProps } from 'react';

  export interface Props extends ComponentProps<'button'> {
    collapsed: boolean;
  }

  export default function TOCCollapsibleCollapseButton(
    props: Props
  ): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/a6de0f2725c68854bb37acab25705c4a7709f230/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L1424
declare module '@theme-original/Logo' {
  import type { ComponentProps } from 'react';

  export interface Props extends ComponentProps<'a'> {
    readonly imageClassName?: string;
    readonly titleClassName?: string;
  }

  export default function Logo(props: Props): JSX.Element;
}

// original: https://github.com/facebook/docusaurus/blob/a6de0f2725c68854bb37acab25705c4a7709f230/packages/docusaurus-theme-classic/src/theme-classic.d.ts#L805C1-L814C3
declare module '@theme/Heading' {
  import type {ComponentProps} from 'react';

  type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  export interface Props extends ComponentProps<HeadingType> {
    readonly as: HeadingType;
  }

  export default function Heading(props: Props): JSX.Element;
}

declare module '@theme/Demo/default_scope' {
  export type ScopeType = Record<string, unknown>;

  export const demoDefaultScope: ScopeType;
}
