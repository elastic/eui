import React, { useState } from 'react';

import {
  EuiScreenReaderLive,
  EuiPageTemplate,
  EuiSideNav,
  EuiButton,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idGenerator = htmlIdGenerator('focusRegionOnTextChange');

  const [pageTitle, setPageTitle] = useState('Home');

  const sideNav = [
    {
      name: 'Example side nav',
      id: idGenerator(),
      items: [
        {
          name: 'Home',
          id: idGenerator(),
          onClick: () => setPageTitle('Home'),
        },
        {
          name: 'About',
          id: idGenerator(),
          onClick: () => setPageTitle('About'),
        },
        {
          name: 'Docs',
          id: idGenerator(),
          onClick: () => setPageTitle('Docs'),
        },
        {
          name: 'Contact',
          id: idGenerator(),
          onClick: () => setPageTitle('Contact'),
        },
      ],
    },
  ];

  return (
    <EuiPageTemplate grow={false} offset={0}>
      <EuiPageTemplate.Sidebar>
        <EuiSideNav items={sideNav} isOpenOnMobile />
      </EuiPageTemplate.Sidebar>
      <EuiPageTemplate.Header iconType="logoElastic" pageTitle={pageTitle} />

      <EuiPageTemplate.Section>
        <EuiScreenReaderLive focusRegionOnTextChange>
          {pageTitle}
        </EuiScreenReaderLive>
        <EuiButton>
          Clicking a nav link and then pressing tab should focus this button
        </EuiButton>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};
