import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiPanel } from '../../../../src/components';

import Panel from './panel';
const panelSource = require('!!raw-loader!./panel');
const panelHtml = renderToHtml(Panel);

import PanelHover from './panel_hover';
const panelHoverSource = require('!!raw-loader!./panel_hover');
const panelHoverHtml = renderToHtml(PanelHover);

import PanelBadge from './panel_badge';
const panelBadgeSource = require('!!raw-loader!./panel_badge');
const panelBadgeHtml = renderToHtml(PanelBadge);

const panelSnippet = `<EuiPanel paddingSize="none">
  <!-- Panel with no padding -->
</EuiPanel>`;

const panelHoverSnippet = `<EuiPanel onClick={handleClick}>
  <!-- Panel with onClick handler -->
</EuiPanel>`;

const panelBadgeSnippet = `<EuiPanel betaBadgeLabel={badgeLabel}>
  <!-- Panel with BetaBadge -->
</EuiPanel>`;

export const PanelExample = {
  title: 'Panel',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiPanel</strong> is a simple wrapper component to add depth
          to a contained layout. It is commonly used as a base for other larger
          components like{' '}
          <Link to="/layout/page">
            <strong>EuiPage</strong>
          </Link>{' '}
          and{' '}
          <Link to="/layout/popover">
            <strong>EuiPopover</strong>
          </Link>
          .
        </p>
      ),
      props: { EuiPanel },
      snippet: panelSnippet,
      demo: <Panel />,
    },
    {
      title: 'Panel can be hoverable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelHoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelHoverHtml,
        },
      ],
      text: (
        <p>
          Adding an <EuiCode>onClick</EuiCode> handler to the{' '}
          <strong>EuiPanel</strong> will turn the wrapping element into a button
          to allow for interaction.
        </p>
      ),
      snippet: panelHoverSnippet,
      demo: <PanelHover />,
    },
    {
      title: 'Panel beta badges',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelBadgeHtml,
        },
      ],
      text: (
        <p>
          Similar to{' '}
          <Link to="/display/card">
            <strong>EuiCard</strong>
          </Link>
          , panels can also accept an{' '}
          <Link to="/display/badge">
            <strong>EuiBetaBadge</strong>
          </Link>
          .
        </p>
      ),
      snippet: panelBadgeSnippet,
      demo: <PanelBadge />,
    },
  ],
};
