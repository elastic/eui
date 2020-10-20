import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

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
import toolTipConfig from './playground';

import ToolTip from './tool_tip';
const toolTipSource = require('!!raw-loader!./tool_tip');
const toolTipHtml = renderToHtml(ToolTip);
const tooltipSnippet = [
  `<EuiToolTip position="top" content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</EuiToolTip>
`,
  `<EuiToolTip title="Tooltip title" content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</EuiToolTip>
`,
  `<EuiToolTip content="A tooltip with a long delay" delay="long">
  <!-- An inline element to trigger the tooltip -->
</EuiToolTip>
`,
];

import IconTip from './icon_tip';
const infoTipSource = require('!!raw-loader!./icon_tip');
const infoTipHtml = renderToHtml(IconTip);
const infoTipSnippet = `<EuiIconTip
  content="Tooltip text for the icon"
  position="top"
  type="iInCircle"
/>
`;

export const ToolTipExample = {
  title: 'Tooltip',
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
        Wrap <strong>EuiToolTip</strong> around any item that you need a tooltip
        for. The <EuiCode>position</EuiCode> prop will take a suggested
        position, but will change it if the tooltip gets too close to the edge
        of the screen.
      </EuiText>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h2>Applying tooltips to custom components</h2>
      </EuiTitle>

      <EuiSpacer size="s" />

      <EuiText>
        Internally, <strong>EuiToolTip</strong> applies{' '}
        <EuiCode>onFocus</EuiCode>, <EuiCode>onBlur</EuiCode>,{' '}
        <EuiCode>onMouseOver</EuiCode>, and <EuiCode>onMouseOut</EuiCode> props
        to whatever you pass as <EuiCode>children</EuiCode>. If you pass in a
        custom component, then you&rsquo;ll need to make sure these props are
        applied to the root element rendered by your component. The best way to
        do that is to follow{' '}
        <a href="https://github.com/elastic/eui/blob/master/wiki/component-design.md#pass-through-props">
          EUI&rsquo;s guidelines on pass-through props
        </a>
        .
      </EuiText>

      <EuiSpacer size="l" />

      <EuiCallOut
        iconType="accessibility"
        color="warning"
        title={
          <>
            Anchoring a tooltip to a non-interactive element makes it difficult
            for keyboard-only and screen reader users to read.
          </>
        }
      />

      <EuiSpacer size="l" />

      <EuiCallOut
        iconType="accessibility"
        color="warning"
        title={
          <>
            Putting anything other than plain text in a tooltip is lost on
            screen readers. Consider switching to{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            if you need more content inside a tooltip.
          </>
        }
      />

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
      snippet: tooltipSnippet,
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
            You can use <strong>EuiIconTip</strong> to explain options, other
            controls, or entire parts of the user interface. When possible,
            surface explanations inline within the UI, and only hide them behind
            a <strong>EuiIconTip</strong> as a last resort.
          </p>
          <p>
            It accepts all the same props as <strong>EuiToolTip</strong>. For
            convenience, you can also specify optional icon{' '}
            <EuiCode>size</EuiCode>, <EuiCode>type</EuiCode>, and
            <EuiCode>color</EuiCode> props.
          </p>
        </Fragment>
      ),
      props: { EuiToolTip, EuiIconTip },
      snippet: infoTipSnippet,
      demo: <IconTip />,
    },
  ],
  playground: toolTipConfig,
};
