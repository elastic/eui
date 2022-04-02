import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiCode,
  EuiPage,
  EuiPageBody,
} from '../../../../src';

import { pageConfig } from './components/playground';

import { PageComponentDemo } from './components/page_demo';
const PageSource = require('!!raw-loader!./components/page');
import { PageBodyDemo } from './components/page_body_demo';
const PageBodySource = require('!!raw-loader!./components/page_body');

export const PageExample = {
  title: 'Page components',
  intro: (
    <>
      <EuiText>
        <p>
          Page layouts are modular and fit together in a precise manner, though
          certain parts can also be added or removed as needed. EUI provides
          both the <strong>individual page components</strong> and an{' '}
          <Link to="/templates/page-template">over-arching template</Link> for
          easily creating some pre-defined layouts.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        iconType="document"
        title="The following examples showcase the individual components only."
      >
        <p>
          If you&apos;re looking for full page layout examples, we recommend
          using the <Link to="/templates/page-template">EuiPageTemplate</Link>{' '}
          and use this page to modify the props of each part of the template.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Page',
      text: (
        <>
          <p>
            <strong>EuiPage</strong> is simply a flex wrapper that will
            automatically <EuiCode>grow</EuiCode> to fill the height of a flex
            container. You can also control the flex{' '}
            <EuiCode>direction</EuiCode> and the maximum width using
            <EuiCode>restrictWidth</EuiCode> which centers the page when it
            reaches the provided value (or <EuiCode>1200px</EuiCode> if set to{' '}
            <EuiCode>true</EuiCode>).
          </p>
        </>
      ),
      demo: <PageComponentDemo />,
      demoPanelProps: {
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      },
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageSource,
        },
      ],
      props: {
        EuiPage,
      },
      playground: pageConfig,
    },
    {
      title: 'Page body',
      text: (
        <p>
          Typically you&apos;ll want to wrap all your page contents in{' '}
          <strong>EuiPageBody</strong> and set{' '}
          <EuiCode>{'panelled={true}'}</EuiCode> when you have a side bar.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: PageBodySource,
        },
      ],
      demo: <PageBodyDemo />,
      demoPanelProps: {
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      },
      props: {
        EuiPageBody,
      },
    },
  ],
};
