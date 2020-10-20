/**
 * This demo has been simplified to showcase just the buttons within sections.
 * See the main example for all the menu items.
 */

import React from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiAvatar,
} from '../../../../src/components';

export default () => {
  const renderLogo = (
    <EuiHeaderLogo
      iconType="logoElastic"
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label="Go to home page"
    />
  );

  const renderSpaces = (
    <EuiHeaderSectionItemButton aria-label="Spaces menu">
      <EuiAvatar type="space" name="Sales Team" size="s" />
    </EuiHeaderSectionItemButton>
  );

  const breadcrumbs = [
    {
      text: 'Management',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Users',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
      },
    },
    {
      text: 'Create',
    },
  ];

  const renderSearch = (
    <EuiHeaderSectionItemButton aria-label="Sitewide search">
      <EuiIcon type="search" size="m" />
    </EuiHeaderSectionItemButton>
  );
  const renderUser = (
    <EuiHeaderSectionItemButton aria-label="Account menu">
      <EuiAvatar name="John Username" size="s" />
    </EuiHeaderSectionItemButton>
  );

  const renderApps = (
    <EuiHeaderSectionItemButton
      aria-label="Apps menu with 1 new app"
      notification="1">
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );

  const sections = [
    {
      items: [renderLogo, renderSpaces],
      borders: 'right',
      breadcrumbs: breadcrumbs,
      breadcrumbProps: {
        'aria-label': 'Header sections breadcrumbs',
      },
    },
    {
      items: [renderSearch, renderUser, renderApps],
    },
  ];

  return <EuiHeader sections={sections} />;
};
