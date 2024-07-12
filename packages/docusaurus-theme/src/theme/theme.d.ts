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
