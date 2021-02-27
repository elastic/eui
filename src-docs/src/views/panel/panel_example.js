import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiCallOut,
} from '../../../../src/components';

import { panelConfig } from './playground';

import Panel from './panel';
const panelSource = require('!!raw-loader!./panel');
const panelHtml = renderToHtml(Panel);

import PanelShadow from './panel_shadow';
const panelShadowSource = require('!!raw-loader!./panel_shadow');
const panelShadowHtml = renderToHtml(PanelShadow);

import PanelColor from './panel_color';
const panelColorSource = require('!!raw-loader!./panel_color');
const panelColorHtml = renderToHtml(PanelColor);

import PanelBadge from './panel_badge';
const panelBadgeSource = require('!!raw-loader!./panel_badge');
const panelBadgeHtml = renderToHtml(PanelBadge);

import PanelGrow from './panel_grow';
const panelGrowSource = require('!!raw-loader!./panel_grow');
const panelGrowHtml = renderToHtml(PanelGrow);

const panelSnippet = `<EuiPanel paddingSize="none">
  <!-- Panel with no padding -->
</EuiPanel>`;

const panelShadowSnippet = [
  `<EuiPanel hasShadow={false}>
  <!-- Panel without shadow -->
</EuiPanel>`,
  `<EuiPanel hasBorder={false}>
  <!-- Panel without border -->
</EuiPanel>`,
];

const panelColorSnippet = [
  `<EuiPanel color="subdued" borderRadius="none">
  <!-- Panel with gray background and no rounded corners -->
</EuiPanel>`,
  `<EuiPanel color="transparent" hasBorder={false}>
  <!-- Transparent panel -->
</EuiPanel>`,
];

const panelGrowSnippet = `<EuiPanel grow={false}>
  <!-- Panel whose height won't grow to match -->
</EuiPanel>`;

export const PanelExample = {
  title: 'Panel',
  intro: (
    <>
      <EuiText>
        <p>
          <strong>EuiPanel</strong> is a building block component. It is
          commonly used as a base for other larger components like{' '}
          <Link to="/layout/page">
            <strong>EuiPage</strong>
          </Link>{' '}
          and{' '}
          <Link to="/layout/popover">
            <strong>EuiPopover</strong>
          </Link>
          . Use it as a layout helper for containing content.
        </p>
      </EuiText>

      <EuiSpacer size="l" />
    </>
  ),
  sections: [
    {
      title: 'Padding',
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
        <p>The most basic use is to simply add padding around your content.</p>
      ),
      props: { EuiPanel },
      snippet: panelSnippet,
      demo: <Panel />,
    },
    {
      title: 'Shadow and border',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelShadowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelShadowHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiPanel</strong> can give depth to your container with{' '}
            <EuiCode>hasShadow</EuiCode> while <EuiCode>hasBorder</EuiCode> can
            add containment. Just be sure not to include too many nested panels
            with these settings.
          </p>
          <EuiCallOut
            color="warning"
            title="Certain allowed combinations of shadow, border, and color depend on the current theme.">
            <p>
              For instance, only plain or transparent panels can have a border
              and/or shadow. The Amsterdam theme doesn&apos;t allow combining
              the <EuiCode>hasBorder</EuiCode> option with{' '}
              <EuiCode>hasShadow</EuiCode>. The default theme only allows
              removing the border if both <EuiCode>hasShadow</EuiCode> and{' '}
              <EuiCode>hasBorder</EuiCode> are set to <EuiCode>false</EuiCode>.
            </p>
          </EuiCallOut>
        </>
      ),
      props: { EuiPanel },
      snippet: panelShadowSnippet,
      demo: <PanelShadow />,
    },
    {
      title: 'Colors and corners',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelColorHtml,
        },
      ],
      text: (
        <>
          <p>
            Use <EuiCode>color</EuiCode> to add background shading to your panel
            and provide an additional helpful aesthetic to your container in
            context. Be mindful to use color sparingly. You can also remove the
            rounded corners depending on the placement of your panel with{' '}
            <EuiCode language="tsx">{'borderRadius="none"'}</EuiCode>
          </p>
          <p>
            Passing <EuiCode language="ts">{'color="transparent"'}</EuiCode> can
            give you a quick empty box simply for adding padding to all sides.
          </p>
        </>
      ),
      props: { EuiPanel },
      snippet: panelColorSnippet,
      demo: <PanelColor />,
    },
    {
      title: 'Growing height',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: panelGrowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: panelGrowHtml,
        },
      ],
      text: (
        <p>
          Using <strong>EuiPanel</strong> in an{' '}
          <Link to="/layout/flex#panels-grow-to-fill-flex-items">
            <strong>EuiFlexItem</strong>
          </Link>{' '}
          will always grow its height to match. This is great for rows of
          panels. However, you can also turn this feature off by setting{' '}
          <EuiCode language="tsx">{'grow={false}'}</EuiCode>.
        </p>
      ),
      props: { EuiPanel },
      snippet: panelGrowSnippet,
      demo: <PanelGrow />,
    },
    {
      title: 'Panels could be hoverable and have beta badges',
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
        <EuiCallOut color="warning" title="Deprecation notice">
          <p>
            The ability to add <EuiCode>onClick</EuiCode> and{' '}
            <Link to="/display/badge">beta badges</Link> is being deprecated. We
            strongly advise using{' '}
            <Link to="/display/card">
              <strong>EuiCard</strong>
            </Link>{' '}
            for this type of functionality.
          </p>
        </EuiCallOut>
      ),
      demo: <PanelBadge />,
    },
  ],
  playground: panelConfig,
};
