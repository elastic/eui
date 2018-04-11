import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiToolTip,
  EuiIconTip,
  EuiSpacer,
} from '../../../../src/components';

import ToolTip from './tool_tip';
const toolTipSource = require('!!raw-loader!./tool_tip');
const toolTipHtml = renderToHtml(ToolTip);

import IconTip from './icon_tip';
const infoTipSource = require('!!raw-loader!./icon_tip');
const infoTipHtml = renderToHtml(IconTip);

export const ToolTipExample = {
  title: 'ToolTip',
  intro: (
    <Fragment>
      <EuiCallOut
        title="EuiToolTip only applies to inline elements"
      >
        <p>
          EuiToolTip wraps its children in a span element, so if you pass in a block-level child
          (e.g. a div) the resulting DOM will be in violation of the HTML5 spec.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
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
  }, {
    title: 'IconTip',
    source: [{
      type: GuideSectionTypes.JS,
      code: infoTipSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: infoTipHtml,
    }],
    text: (
      <Fragment>
        <p>
          You can use <EuiCode>EuiIconTip</EuiCode> to explain options, other controls, or entire
          parts of the user interface. When possible, surface explanations inline within the UI,
          and only hide them behind a <EuiCode>EuiIconTip</EuiCode> as a last resort.
        </p>
        <p>
          It accepts all the same props as <EuiCode>EuiToolTip</EuiCode>.
          For convenience, you can also specify optional icon <EuiCode>type</EuiCode> and
          <EuiCode>color</EuiCode> props.
        </p>
      </Fragment>
    ),
    props: { EuiToolTip, EuiIconTip },
    demo: <IconTip />,
  }],
};
