import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiPageHeader,
  EuiPageHeaderSection,
} from '../../../../src/components';

import { pageHeaderConfig } from './playground';

import PageHeader from './page_header';
const pageHeaderSource = require('!!raw-loader!./page_header');

import PageHeaderTabs from './page_header_tabs';
const pageHeaderTabsSource = require('!!raw-loader!./page_header_tabs');

import PageHeaderCustom from './page_header_custom';
import { EuiText } from '../../../../src/components/text';
const pageHeaderCustomSource = require('!!raw-loader!./page_header_custom');

export const PageHeaderExample = {
  title: 'Page header',
  intro: (
    <EuiText>
      <p>
        While the <strong>EuiPageHeader</strong> component can be placed
        anywhere within your page layout, we recommend using it within the{' '}
        <Link to="/layout/page">
          <strong>EuiPageTemplate</strong>
        </Link>{' '}
        component by passing the configuration props as its{' '}
        <EuiCode>pageHeader</EuiCode>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderSource,
        },
      ],
      playground: pageHeaderConfig,
      text: (
        <>
          <p>
            <strong>EuiPageHeader</strong> provides props for opinionated,
            consistent formatting of your header. Any combination of{' '}
            <EuiCode>pageTitle</EuiCode>, <EuiCode>description</EuiCode>,{' '}
            <EuiCode>tabs</EuiCode>, or any <EuiCode>children</EuiCode> will
            adjust the layout as needed.
          </p>
          <p>
            An additional prop <EuiCode>rightSideItems</EuiCode> allows for a
            simple <strong>array of nodes</strong> which will layout in a
            flexbox row. This is commonly used for adding multiple buttons, of
            which, at least one should be primary (or{' '}
            <EuiCode language="ts">{'fill="true"'}</EuiCode>). These items are
            also displayed in <strong>reverse order</strong> so that the first
            and primary array item will be displayed on the far right.
          </p>
          <p>
            You can further adjust the display of these content types with an
            optional <EuiCode>iconType</EuiCode> placed to the left of the
            title, <EuiCode>alignItems</EuiCode> for adjusting the vertical
            alignment of the two sides, and <EuiCode>responsiveOrder</EuiCode>{' '}
            to determine which content side to display first on smaller screens.
          </p>
        </>
      ),
      demo: <PageHeader />,
      props: { EuiPageHeader },
      snippet: `<EuiPageHeader
  pageTitle="Page title"
  tabs={[
    { label:"Tab 1", isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
  rightSideItems={[
    <EuiButton fill>Button 1</EuiButton>,
    <EuiButton>Button 2</EuiButton>
  ]}
/>`,
    },
    {
      title: 'Tabs in the page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderTabsSource,
        },
      ],
      text: (
        <>
          <p>
            When supplying <EuiCode>tabs</EuiCode> without a{' '}
            <EuiCode>pageTitle</EuiCode>, <strong>EuiPageHeader</strong> will
            promote those tabs as if they are the page title. This means that
            any <EuiCode>description</EuiCode> or <EuiCode>children</EuiCode>{' '}
            will sit <strong>below</strong> the tabs.
          </p>
        </>
      ),
      demo: <PageHeaderTabs />,
      props: { EuiPageHeader },
      snippet: `<EuiPageHeader
  tabs={[
    { label:"Tab 1", isSelected: true },
    { label:"Tab 2" }
  ]}
  description="Example of a description."
/>`,
    },
    {
      title: 'Customizing the page header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pageHeaderCustomSource,
        },
      ],
      text: (
        <>
          <p>
            The page header content props are helpful props to push content into
            established Elastic page layout patterns. They are completely
            optional and by design, inflexible. If you need a layout that does
            not match these patterns you can pass in your own{' '}
            <EuiCode>children</EuiCode> utilizing the{' '}
            <strong>EuiPageHeaderSection</strong> components.
          </p>
        </>
      ),
      demo: <PageHeaderCustom />,
      props: { EuiPageHeader, EuiPageHeaderSection },
    },
  ],
};
