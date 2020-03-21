import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiLink,
  EuiResizableContainer,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';
import { Panel } from '../../../../src/components/resizable_container/panel';
import { Resizer } from '../../../../src/components/resizable_container/resizer';

import ResizableContainerBasic from './resizable_container_basic';
import ResizableContainerVertical from './resizable_container_vertical';
import ResizableContainerThreePanels from './resizable_container_three_panels';
import ResizableContainerResetValues from './resizable_container_reset_values';
import ResizableResizerSize from './resizable_resizer_size';

const ResizableContainerSource = require('!!raw-loader!./resizable_container_basic');
const ResizableContainerVericalSource = require('!!raw-loader!./resizable_container_vertical');
const ResizableContainerThreePanelsSource = require('!!raw-loader!./resizable_container_three_panels');
const ResizableContainerResetValuesSource = require('!!raw-loader!./resizable_container_reset_values');
const ResizableResizerSizeSource = require('!!raw-loader!./resizable_resizer_size');

const ResizableContainerHtml = renderToHtml(ResizableContainerBasic);
const ResizableContainerVericalHtml = renderToHtml(ResizableContainerVertical);
const ResizableContainerThreePanelsHtml = renderToHtml(
  ResizableContainerThreePanels
);
const ResizableContainerResetValuesHtml = renderToHtml(
  ResizableContainerResetValues
);
const ResizableResizerSizeHtml = renderToHtml(ResizableResizerSize);

export const ResizableContainerExample = {
  title: 'Resizable Container',
  intro: (
    <Fragment>
      <EuiCallOut title="Consuming" color="warning">
        <EuiText size="s">
          <p>
            This component is handy for various resizable containers.
            <EuiCode>{'<EuiResizableContainer />'}</EuiCode> uses{' '}
            <EuiLink
              href="https://reactjs.org/docs/render-props.html#using-props-other-than-render"
              external>
              React Render Props
            </EuiLink>{' '}
            technique to provide <EuiCode>{'<Panel />'}</EuiCode> and{' '}
            <EuiCode>{'<Resizer />'}</EuiCode> components for you layot. Wrap
            parts of your content with the <EuiCode>{'<Panel />'}</EuiCode>{' '}
            component and put the <EuiCode>{'<Resizer />'}</EuiCode> component
            between.
          </p>
        </EuiText>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerHtml,
        },
      ],
      title: 'Horizontal resizable container',
      text: (
        <div>
          <p>
            Simple resizable container with two panels and a resizer between.
            This is the most common case you&#39;ll need in your app. Just drag{' '}
            <strong>the resizer</strong> button between two panels to
            increase/decrease panel size. You could also use arrow keys{' '}
            <strong>&#x2190;</strong>|<strong>&#x2192;</strong> on{' '}
            <strong>the focused resizer</strong> button to change panel size.
          </p>
          <ul>
            <li>
              add <EuiCode>initialSize</EuiCode> in percents to each panel to
              specify the initial size of it. Other calculations will be
              incapsulated, you don&#39;t worry about it.
            </li>
            <li>
              add <EuiCode>scrollable</EuiCode> prop to a panel to appear a nice
              scrollbar for overflowed content
            </li>
          </ul>
        </div>
      ),
      props: { EuiResizableContainer, Panel, Resizer },
      demo: <ResizableContainerBasic />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerResetValuesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerResetValuesHtml,
        },
      ],
      title: 'Horizontal resizable container with controlled sizes',
      text: (
        <div>
          <p>
            Sometimes it&#39;s necessary to control panel sizes from the
            outside. For example to store sizes in{' '}
            <EuiCode>localStorage</EuiCode> or change the layout with predefined
            sizes. Here is the <EuiCode>onPanelWidthChange</EuiCode> and{' '}
            <EuiCode>size</EuiCode> props for help. If you use such an approach,
            you have to specify an <EuiCode>id</EuiCode> prop for each panel to
            track their sizes.
          </p>

          <EuiCallOut title="Note" color="warning">
            <EuiText size="s">
              <p>
                It is obligatory to specify either{' '}
                <EuiCode>initialSize</EuiCode> or <EuiCode>size</EuiCode> (the
                last one should be used in case you want to handle sizes
                outside)
              </p>
            </EuiText>
          </EuiCallOut>
        </div>
      ),
      props: { EuiResizableContainer, Panel, Resizer },
      demo: <ResizableContainerResetValues />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerThreePanelsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerThreePanelsHtml,
        },
      ],
      title: 'Horizontal resizable container with three panels',
      text: (
        <p>
          There are no limits for panels amount. Perhaps you will need to use 3
          or even more..
        </p>
      ),
      props: { EuiResizableContainer, Panel, Resizer },
      demo: <ResizableContainerThreePanels />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerVericalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerVericalHtml,
        },
      ],
      title: 'Vertical container',
      text: <p>Vertical resizable container</p>,
      props: { EuiResizableContainer, Panel, Resizer },
      demo: (
        <div className="guideDemo__highlightSpacer">
          <ResizableContainerVertical />
        </div>
      ),
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableResizerSizeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableResizerSizeHtml,
        },
      ],
      title: 'Resizable Resizer Size',
      text: (
        <div>
          <p>
            Now say that five times fast. You can control the space between
            panels by modifying the <EuiCode>size</EuiCode> of the{' '}
            <EuiCode>Resizer</EuiCode> component. The available sizes are{' '}
            <EuiCode>xl</EuiCode>, <EuiCode>l</EuiCode>, <EuiCode>m</EuiCode>,
            and <EuiCode>s</EuiCode>. You should avoid using different sizes
            within the same <EuiCode>EuiResizableContainer</EuiCode>, as shown
            in the demo below.
          </p>
        </div>
      ),
      props: { EuiResizableContainer, Panel, Resizer },
      demo: <ResizableResizerSize />,
    },
  ],
};
