// Prop types are declared for @theme scope in @docusaurus/theme-classic
// but when using swizzle --eject the type import is not available.
// we re-declare the needed types here to ensure type checking
// NOTE: when using swizzle --wrap there is the approach to do the following:
// type Props = WrapperProps<typeof NameOfComponent> but it will result in `any` type

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
