import React from 'react';

import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Panel from './panel';
const panelSource = require('!!raw-loader!./panel');
const panelHtml = renderToHtml(Panel);

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
    demo: <Panel />,
  }],
};
