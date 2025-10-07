import { type ReactNode } from 'react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';

import euiVersions from '@site/static/versions.json';
import { pronounceVersion } from '@site/src/utils';

export default function Navbar(): ReactNode {
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
    <NavbarLayout versionSwitcherOptions={versionSwitcherOptions}>
      <NavbarContent versionSwitcherOptions={versionSwitcherOptions} />
    </NavbarLayout>
  );
}
