import React from 'react';
import { Link } from 'react-router-dom';

import { EuiText, EuiSpacer, EuiCallOut, EuiCode } from '../../../../src';

import { PageComponentDemo } from './components/page_demo';
import { PageSectionDemo } from './components/page_section_demo';

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
      title: 'Page and page body',
      wrapText: false,
      text: (
        <div>
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
            <p>
              Typically you&apos;ll want to wrap all your page contents in{' '}
              <strong>EuiPageBody</strong> and set{' '}
              <EuiCode>{'panelled={true}'}</EuiCode> when you have a side bar.
            </p>
          </EuiText>
          <PageComponentDemo />
        </div>
      ),
    },
    {
      title: 'Page section',
      wrapText: false,
      text: (
        <div>
          <EuiText>
            <p>
              <strong>EuiPageSection</strong> is a stackable component that is
              essentially an <strong>EuiPanel</strong> with props for quickly
              creating common usages. Use <EuiCode>panelled</EuiCode> to quickly
              turn on/off the panel background and other attributes. You&apos;ll
              need to set <EuiCode>{'grow={false}'}</EuiCode> to any content
              that you don&apos;t want to stretch within the page.
            </p>
            <p>
              To create dividers between contents, use the{' '}
              <EuiCode>bottomBorder</EuiCode> prop. The{' '}
              <EuiCode>{"'extended'"}</EuiCode> version ensures the border
              touches the sides of the parent. It also supports{' '}
              <EuiCode>restrictWidth</EuiCode> and <EuiCode>alignment</EuiCode>{' '}
              to align with common usages.
            </p>
          </EuiText>
          <PageSectionDemo />
        </div>
      ),
    },
  ],
};
