import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiToolTip,
  EuiIconTip,
  EuiText,
} from '../../../../src/components';
import { toolTipConfig, iconTipConfig } from './playground';

import ToolTip from './tool_tip';
const toolTipSource = require('!!raw-loader!./tool_tip');
const tooltipSnippet = [
  `<EuiToolTip content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</EuiToolTip>
`,
  `<EuiToolTip title="Tooltip title" content="Tooltip text">
  <!-- An inline element to trigger the tooltip -->
</EuiToolTip>
`,
  `<EuiToolTip content="Right side tooltip" position="right">
  <!-- An inline element to trigger the tooltip -->
</EuiToolTip>
`,
  `<EuiToolTip content="A tooltip with a long delay" delay="long">
  <!-- An inline element to trigger the tooltip -->
</EuiToolTip>
`,
];

import ToolTipComponent from './tool_tip_components';
const toolTipComponentSource = require('!!raw-loader!./tool_tip_components');

import IconTip from './icon_tip';
const infoTipSource = require('!!raw-loader!./icon_tip');
const infoTipSnippet = `<EuiIconTip
  content="Tooltip text for the icon"
  position="top"
  type="iInCircle"
/>
`;

export const ToolTipExample = {
  title: 'Tooltip',
  intro: (
    <EuiText>
      <p>
        Generally, tooltips should provide short, <strong>non-essential</strong>
        , contextual information, usually naming or describing with more detail.
        If you need interactive content or anything other than text, we
        recommend using{' '}
        <Link to="/layout/popover">
          <strong>EuiPopover</strong>
        </Link>{' '}
        instead.
      </p>

      <EuiCallOut
        iconType="accessibility"
        color="warning"
        title={
          <>
            Putting anything other than plain text in a tooltip is lost on
            screen readers.
          </>
        }
      />
    </EuiText>
  ),
  sections: [
    {
      text: (
        <>
          <p>
            Wrap <strong>EuiToolTip</strong> around any item that you need a
            tooltip for and provide the <EuiCode>content</EuiCode> and
            optionally the <EuiCode>title</EuiCode>. The{' '}
            <EuiCode>position</EuiCode> prop will take a suggested position, but
            will change it if the tooltip gets too close to the edge of the
            screen.
          </p>

          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <>
                Anchoring a tooltip to a non-interactive element makes it
                difficult for keyboard-only and screen reader users to read.
              </>
            }
          />
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toolTipSource,
        },
      ],
      props: { EuiToolTip },
      snippet: tooltipSnippet,
      demo: <ToolTip />,
      playground: toolTipConfig,
    },
    {
      title: 'Wrapping components',
      text: (
        <>
          <p>
            <strong>EuiToolTip</strong> wraps its children in a{' '}
            <EuiCode>{'<span>'}</EuiCode> element that is{' '}
            <EuiCode language="css">{'display: inline-block'}</EuiCode>. If you
            are wrapping a block-level child (e.g. a{' '}
            <EuiCode>{'<div>'}</EuiCode>
            ), you may need to change this by passing{' '}
            <EuiCode language="tsx">{'display="block"'}</EuiCode> but the
            resulting DOM may be in violation of the HTML5 spec.
          </p>
          <p>
            It also applies <EuiCode>onFocus</EuiCode> and{' '}
            <EuiCode>onBlur</EuiCode> props the the cloned{' '}
            <EuiCode>children</EuiCode>. If you pass in a custom component, then
            you&rsquo;ll need to make sure these props are applied to the root
            element rendered by your component. The best way to do that is to
            follow{' '}
            <a href="https://github.com/elastic/eui/blob/master/wiki/component-design.md#pass-through-props">
              EUI&rsquo;s guidelines on pass-through props
            </a>
            .
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toolTipComponentSource,
        },
      ],

      props: { EuiToolTip },
      demo: <ToolTipComponent />,
    },
    {
      title: 'IconTip',
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoTipSource,
        },
      ],
      props: { EuiIconTip },
      snippet: infoTipSnippet,
      demo: <IconTip />,
      playground: iconTipConfig,
    },
  ],
};
