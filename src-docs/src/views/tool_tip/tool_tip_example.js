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
    source: [{
      type: GuideSectionTypes.JS,
      code: toolTipSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: toolTipHtml,
    }],
    text: (
      <p>
        Wrap <EuiCode>EuiToolTip</EuiCode> around any item that you need a tooltip for.
        The <EuiCode>position</EuiCode> prop will take a suggested position, but will
        change it if the tool tip gets too close to the edge of the screen. You can use
        the <EuiCode>clickOnly</EuiCode> prop to tell the too tip to only appear on click
        wrather than on hover.
      </p>
    ),
    props: { EuiToolTip },
    demo: <ToolTip />,
  }],
};
