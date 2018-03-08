import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiToolTip,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import ToolTip from './tool_tip';
const toolTipSource = require('!!raw-loader!./tool_tip');
const toolTipHtml = renderToHtml(ToolTip);

export const ToolTipExample = {
  title: 'ToolTip',
  intro: (
    <div>
      <EuiCallOut
        title="Be careful when using tool tips on clickable objects"
        color="warning"
      >
        <p>
          <strong>Do not use the <EuiCode>clickOnly</EuiCode> prop if you are wrapping
          a tooltip around an element that is itself clickable</strong>. Also, because
          our tool tips are accessible through tabbing and focus events this means
          that any tabbable elements (like buttons or inputs) you nest inside will
          require two tabs (one for the tool tip and one for the nested item) to
          cycle through. Usually this isn&apos;t a problem, but keep it in mind.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </div>
  ),
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
