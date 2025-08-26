import { type ReactNode } from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '@theme-original/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '@theme-original/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme-original/Navbar/MobileSidebar/SecondaryMenu';

import { pronounceVersion } from '@site/src/utils';
import euiVersions from '@site/static/versions.json';

export default function NavbarMobileSidebar(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);

  if (!mobileSidebar.shouldRender) {
    return null;
  }

  const versions = euiVersions?.euiVersions ?? [];
  const currentVersion = versions[0]!;

  const versionSwitcherOptions = {
    ariaLabel: 'EUI version list',
    currentVersion,
    extraAction: (version: string) => ({
      'aria-label': `View release notes for ${pronounceVersion(
        currentVersion
      )}`,
      title: `View release ${version}`,
      iconType: 'package',
      iconSize: 's',
      href: `https://github.com/elastic/eui/releases/tag/v${version}`,
      target: '_blank',
    }),
    previousVersionUrl: 'https://eui.elastic.co',
    versions,
  };

  return (
    <NavbarMobileSidebarLayout
      header={
        <NavbarMobileSidebarHeader
          versionSwitcherOptions={versionSwitcherOptions}
        />
      }
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}
