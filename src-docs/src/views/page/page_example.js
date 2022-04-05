import React from 'react';
import { Link } from 'react-router-dom';

import { EuiText, EuiSpacer, EuiCallOut, EuiCode } from '../../../../src';

import { PageComponentDemo } from './components/page_demo';

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
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              <strong>EuiPage</strong> is simply a flex wrapper that will
              automatically <EuiCode>grow</EuiCode> to fill the height of a flex
              container. You can also control the flex{' '}
              <EuiCode>direction</EuiCode> and the maximum width using
              <EuiCode>restrictWidth</EuiCode> which centers the page when it
              reaches the provided value (or <EuiCode>1200px</EuiCode> if set to{' '}
              <EuiCode>true</EuiCode>).
            </p>
          </EuiText>
          <PageComponentDemo />
        </>
      ),
    },
  ],
};
