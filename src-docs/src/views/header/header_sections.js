import React from 'react';

import {
  EuiHeader,
  EuiFieldSearch,
  EuiHeaderLogo,
} from '../../../../src/components';

import HeaderAppMenu from './header_app_menu';
import HeaderUserMenu from './header_user_menu';
import HeaderSpacesMenu from './header_spaces_menu';

export default () => {
  const renderLogo = (
    <EuiHeaderLogo
      iconType="logoKibana"
      href="#"
      aria-label="Go to home page"
    />
  );

  const breadcrumbs = [
    {
      text: 'Management',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked management');
      },
      'data-test-subj': 'breadcrumbsAnimals',
      className: 'customClass',
    },
    {
      text: 'Truncation test is here for a really long item',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked truncation test');
      },
    },
    {
      text: 'hidden',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked hidden');
      },
    },
    {
      text: 'Users',
      href: '#',
      onClick: e => {
        e.preventDefault();
        console.log('You clicked users');
      },
    },
    {
      text: 'Create',
    },
  ];

  const renderSearch = (
    <EuiFieldSearch placeholder="Search for anything" compressed />
  );

  const sections = [
    {
      items: [renderLogo, <HeaderSpacesMenu />],
      borders: 'right',
      breadcrumbs: breadcrumbs,
    },
    {
      items: [renderSearch, <div style={{ width: 8 }} />],
      borders: 'none',
    },
    {
      items: [<HeaderUserMenu />, <HeaderAppMenu />],
    },
  ];

  return <EuiHeader sections={sections} />;
};
