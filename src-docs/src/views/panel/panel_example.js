import React from 'react';

import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiPanel,
} from '../../../../src/components';

import Panel from './panel';
const panelSource = require('!!raw-loader!./panel');
const panelHtml = renderToHtml(Panel);

import PanelHover from './panel_hover';
const panelHoverSource = require('!!raw-loader!./panel_hover');
const panelHoverHtml = renderToHtml(PanelHover);

export const PanelExample = {
  title: 'Panel',
  sections: [{
    title: 'Panel',
    source: [{
      type: GuideSectionTypes.JS,
      code: panelSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: panelHtml,
    }],
    text: (
      <p>
        <EuiCode>Panel</EuiCode> is a simple wrapper component to add
        depth to a contained layout. It it commonly used as a base for
        other larger components like <Link to="/page">Page</Link> and <Link to="/popover">Popover</Link>.
      </p>
    ),
    props: { EuiPanel },
    demo: <Panel />,
  }, {
    title: 'Panel can be hoverable',
    source: [{
      type: GuideSectionTypes.JS,
      code: panelHoverSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: panelHoverHtml,
    }],
    text: (
      <p>
        Adding an <EuiCode>onClick</EuiCode> handler to the <EuiCode>EuiPanel</EuiCode> will
        turn the wrapping element into a button to allow for interaction.
      </p>
    ),
    demo: <PanelHover />,
  }],
};
