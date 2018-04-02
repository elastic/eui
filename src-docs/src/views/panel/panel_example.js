import React from 'react';

import { Link } from 'react-router';

// import { renderToHtml } from '../../services';

// import {
//   GuideSectionTypes,
// } from '../../components';

import {
  EuiCode,
  EuiPanel,
} from '../../../../src/components';

// import Panel from './panel';
// const panelSource = require('!!raw-loader!./panel');
// const panelHtml = renderToHtml(Panel);

// import PanelHover from './panel_hover';
// const panelHoverSource = require('!!raw-loader!./panel_hover');
// const panelHoverHtml = renderToHtml(PanelHover);

export const PanelExample = {
  title: 'Panel',
  sections: [{
    text: (
      <p>
        <EuiCode>Panel</EuiCode> is a simple wrapper component to add
        depth to a contained layout. It it commonly used as a base for
        other larger components like <Link to="/layout/page">Page</Link> and <Link to="/layout/popover">Popover</Link>.
      </p>
    ),
    playground: EuiPanel,
    demo: <EuiPanel>This is a panel. Use wisely. 🤪</EuiPanel>,
  }],
};
