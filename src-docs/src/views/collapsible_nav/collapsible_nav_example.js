import React from 'react';
import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCollapsibleNav,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import CollapsibleNav from './collapsible_nav';
const collapsibleNavSource = require('!!raw-loader!./collapsible_nav');
const collapsibleNavHtml = renderToHtml(CollapsibleNav);

export const CollapsibleNavExample = {
  title: 'Collapsible nav',
  intro: (
    <EuiText>
      <p>
        This is a high level component that creates a flyout-style navigational
        pane. It is the next evolution of{' '}
        <Link to="/layout/nav-drawer">
          <strong>EuiNavDrawer</strong>
        </Link>{' '}
        which will be deprecated in the coming months.
      </p>
      <EuiSpacer size="m" />
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiCollapsibleNav</strong> is simply a custom wrapper around{' '}
          <Link to="/layout/flyout">
            <strong>EuiFlyout</strong>
          </Link>{' '}
          the visibility of which must be maintained by the consuming
          application. An extra feature that it provides is the ability to{' '}
          <EuiCode>dock</EuiCode> the flyout. This affixes the flyout to the
          window and pushes the body content by adding left side padding.
        </p>
      ),
      props: { EuiCollapsibleNav },
      demo: <CollapsibleNav />,
    },
  ],
};
