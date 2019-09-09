import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiToolTip,
  EuiIconTip,
  EuiSpacer,
  EuiText,
  EuiTitle,
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
      <EuiCallOut title="EuiToolTip only applies to inline elements">
        <p>
          EuiToolTip wraps its children in a span element, so if you pass in a
          block-level child (e.g. a div) the resulting DOM will be in violation
          of the HTML5 spec.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />

      <EuiText>
        Wrap <EuiCode>EuiToolTip</EuiCode> around any item that you need a
        tooltip for. The <EuiCode>position</EuiCode> prop will take a suggested
        position, but will change it if the tooltip gets too close to the edge
        of the screen.
      </EuiText>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h2>Applying tooltips to custom components</h2>
      </EuiTitle>

      <EuiSpacer size="s" />

      <EuiText>
        Internally, <code>EuiToolTip</code> applies <code>onFocus</code>,{' '}
        <code>onBlur</code>, <code>onMouseOver</code>, and{' '}
        <code>onMouseOut</code> props to whatever you pass as{' '}
        <code>children</code>. If you pass in a custom component, then
        you&rsquo;ll need to make sure these props are applied to the root
        element rendered by your component. The best way to do that is to follow{' '}
        <a href="https://github.com/elastic/eui/blob/master/wiki/component-design.md#pass-through-props">
          EUI&rsquo;s guidelines on pass-through props
        </a>
        .
      </EuiText>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toolTipSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toolTipHtml,
        },
      ],
      props: { EuiToolTip },
      demo: <ToolTip />,
    },
    {
      title: 'IconTip',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoTipSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoTipHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can use <EuiCode>EuiIconTip</EuiCode> to explain options, other
            controls, or entire parts of the user interface. When possible,
            surface explanations inline within the UI, and only hide them behind
            a <EuiCode>EuiIconTip</EuiCode> as a last resort.
          </p>
          <p>
            It accepts all the same props as <EuiCode>EuiToolTip</EuiCode>. For
            convenience, you can also specify optional icon{' '}
            <EuiCode>size</EuiCode>, <EuiCode>type</EuiCode>, and
            <EuiCode>color</EuiCode> props.
          </p>
        </Fragment>
      ),
      props: { EuiToolTip, EuiIconTip },
      demo: <IconTip />,
    },
  ],
};
