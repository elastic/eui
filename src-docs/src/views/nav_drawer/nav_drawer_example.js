import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiNavDrawer, EuiCode, EuiCallOut } from '../../../../src/components';

import NavDrawer from './nav_drawer';
const navDrawerSource = require('!!raw-loader!./nav_drawer');
const navDrawerHtml = renderToHtml(NavDrawer);
const navDrawerSnippet = `<EuiNavDrawer showToolTips={true}>
  <EuiNavDrawerGroup listItems={this.navLinks} />
</EuiNavDrawer>`;

export const NavDrawerExample = {
  title: 'Nav Drawer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: navDrawerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: navDrawerHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiNavDrawer</EuiCode> provides a side navigation feature
            that is complete with interactions and a mobile-friendly design. It
            can contain one or more <EuiCode>EuiNavDrawerGroup</EuiCode>{' '}
            components and is designed to be used in conjunction with{' '}
            <EuiCode>EuiHeader</EuiCode>.
          </p>
          <EuiCallOut
            title="Note about displaying flyout menus"
            iconType="iInCircle">
            <p>
              Providing a <EuiCode>flyoutMenu</EuiCode> prop on the{' '}
              <EuiCode>listItems</EuiCode> object of an{' '}
              <EuiCode>EuiNavDrawerGroup</EuiCode> will result in that link
              opening a secondary menu. Note that this will also override the{' '}
              <EuiCode>onClick</EuiCode> event. See sample data in the Demo JS
              tab.
            </p>
          </EuiCallOut>
        </div>
      ),
      snippet: navDrawerSnippet,
      props: {
        EuiNavDrawer,
      },
      demo: <NavDrawer />,
    },
  ],
};
