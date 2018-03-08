import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiToolTip,
} from '../../../../src/components';

import ToolTip from './tool_tip';
const toolTipSource = require('!!raw-loader!./tool_tip');
const toolTipHtml = renderToHtml(ToolTip);

export const ToolTipExample = {
  title: 'ToolTip',
  sections: [{
    title: 'ToolTip',
    source: [{
      type: GuideSectionTypes.JS,
      code: toolTipSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: toolTipHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiToolTip</EuiCode> component.
      </p>
    ),
    props: { EuiToolTip },
    demo: <ToolTip />,
  }],
};
