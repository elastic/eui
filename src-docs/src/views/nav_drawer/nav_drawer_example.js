import React from 'react';
import { Link } from 'react-router';

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
  title: 'Nav drawer',
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
            <strong>EuiNavDrawer</strong> provides a side navigation feature
            that is complete with interactions and a mobile-friendly design. It
            can contain one or more <strong>EuiNavDrawerGroup</strong>{' '}
            components and is designed to be used in conjunction with{' '}
            <Link to="/layout/header">
              <strong>EuiHeader</strong>
            </Link>
            .
          </p>
          <EuiCallOut
            title="Note about displaying flyout menus"
            iconType="iInCircle">
            <p>
              Providing a <EuiCode>flyoutMenu</EuiCode> prop on the{' '}
              <EuiCode>listItems</EuiCode> object of an{' '}
              <strong>EuiNavDrawerGroup</strong> will result in that link
              opening a secondary menu. Note that this will also override the{' '}
              <EuiCode>onClick</EuiCode> event. For more details about other
              props available for the <EuiCode>listItems</EuiCode> object,
              please refer to{' '}
              <Link to="/display/list-group">
                <strong>EuiListGroupItem</strong>
              </Link>
              .
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
