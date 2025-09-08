/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ReactNode } from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarLayout from '@theme-original/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarHeader from './Header';
import NavbarMobileSidebarPrimaryMenu from '@theme-original/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme-original/Navbar/MobileSidebar/SecondaryMenu';

import { VersionSwitcherProps } from '../../../components/version_switcher';

type Props = {
  versionSwitcherOptions?: VersionSwitcherProps;
};

export default function NavbarMobileSidebar({
  versionSwitcherOptions,
}: Props): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  useLockBodyScroll(mobileSidebar.shown);

  if (!mobileSidebar.shouldRender) {
    return null;
  }

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
