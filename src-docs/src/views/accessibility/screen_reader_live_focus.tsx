import React, { useState } from 'react';

import {
  EuiScreenReaderLive,
  EuiPageTemplate,
  EuiSideNav,
  EuiButton,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const useGeneratedId = () =>
    useGeneratedHtmlId({ prefix: 'focusRegionOnTextChange' });

  const [pageTitle, setPageTitle] = useState('Home');

  const sideNav = [
    {
      name: 'Example side nav',
      id: useGeneratedId(),
      items: [
        {
          name: 'Home',
          id: useGeneratedId(),
          onClick: () => setPageTitle('Home'),
        },
        {
          name: 'About',
          id: useGeneratedId(),
          onClick: () => setPageTitle('About'),
        },
        {
          name: 'Docs',
          id: useGeneratedId(),
          onClick: () => setPageTitle('Docs'),
        },
        {
          name: 'Contact',
          id: useGeneratedId(),
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
