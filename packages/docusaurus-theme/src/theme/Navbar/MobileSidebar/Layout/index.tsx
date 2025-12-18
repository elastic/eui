import { JSX } from 'react';
import { css } from '@emotion/react';
import Layout from '@theme-init/Navbar/MobileSidebar/Layout';
import type LayoutType from '@theme-init/Navbar/MobileSidebar/Layout';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof LayoutType>;

const styles = {
  mobileSidebar: css`
    --ifm-navbar-sidebar-width: 100vw;

    @media (min-width: 400px) {
      --ifm-navbar-sidebar-width: 75vw;
    }

    @media (min-width: 600px) {
      --ifm-navbar-sidebar-width: 50vw;
    }

    .navbar-sidebar__back {
      font-size: var(--eui-font-size-s);
      line-height: var(--eui-fline-height-xs);
      padding-block: var(--eui-size-m);
      padding-inline: var(--eui-size-s);
    }
  `,
};

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <div css={styles.mobileSidebar}>
      <Layout {...props} />
    </div>
  );
}
