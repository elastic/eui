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
import { EuiResizablePanel } from '../../../../src/components/resizable_container/resizable_panel';
import { EuiResizableButton } from '../../../../src/components/resizable_container/resizable_button';

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

const snippet = `<EuiResizableContainer style={{ height: '400px' }}>
  {(EuiResizablePanel, EuiResizableButton) => (
    <>
      <EuiResizablePanel initialSize={50} minSize="200px">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>

      <EuiResizableButton />

      <EuiResizablePanel initialSize={50} minSize="200px">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>
    </>
  )}
</EuiResizableContainer>`;

export const ResizableContainerExample = {
  title: 'Resizable container',
  isNew: true,
  intro: (
    <Fragment>
      <EuiCallOut title="Consuming" color="warning">
        <EuiText size="s">
          <p>
            This component is handy for various resizable containers.{' '}
            <strong>EuiResizableContainer</strong> uses the{' '}
            <EuiLink
              href="https://reactjs.org/docs/render-props.html#using-props-other-than-render"
              external>
              React Render Props
            </EuiLink>{' '}
            technique to provide <strong>EuiResizablePanel</strong> and{' '}
            <strong>EuiResizableButton</strong> components for you layout. Wrap
            parts of your content with the <strong>EuiResizablePanel</strong>{' '}
            component and put the <strong>EuiResizableButton</strong> component
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
      title: 'Horizontal resizing',
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
              add <EuiCode>scrollable=false</EuiCode> prop to a panel to
              eliminate overflow scrolling
            </li>
          </ul>
        </div>
      ),
      props: { EuiResizableContainer, EuiResizablePanel, EuiResizableButton },
      snippet,
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
      title: 'Horizontal resizing with controlled widths',
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

          <EuiCallOut title="Required properties" color="warning">
            <EuiText size="s">
              <p>
                Either <EuiCode>initialSize</EuiCode> or <EuiCode>size</EuiCode>{' '}
                must be specified. The <EuiCode>size</EuiCode> prop is for cases
                where a parent component will control sizing updates.
              </p>
            </EuiText>
          </EuiCallOut>
        </div>
      ),
      props: { EuiResizableContainer, EuiResizablePanel, EuiResizableButton },
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
      title: 'Horizontal resizing with three panels',
      text: (
        <p>
          The <strong>EuiResizablePanel</strong> and{' '}
          <strong>EuiResizableButton</strong> components can each be used
          multiple times to create a more complex layout.
        </p>
      ),
      props: { EuiResizableContainer, EuiResizablePanel, EuiResizableButton },
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
      title: 'Vertical resizing',
      text: (
        <p>
          Set <EuiCode>direction=vertical</EuiCode> on{' '}
          <strong>EuiResizableContainer</strong> to set a vertical orientation
          of the resizable panels.
        </p>
      ),
      props: { EuiResizableContainer, EuiResizablePanel, EuiResizableButton },
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
      title: 'Resizable button spacing',
      text: (
        <div>
          <p>
            You can control the space between panels by modifying the{' '}
            <EuiCode>size</EuiCode> prop of the{' '}
            <strong>EuiResizableButton</strong> component. The available sizes
            are <EuiCode>xl</EuiCode>, <EuiCode>l</EuiCode>,{' '}
            <EuiCode>m</EuiCode>, and <EuiCode>s</EuiCode>. You should avoid
            using different sizes within the same{' '}
            <strong>EuiResizableContainer</strong>, as shown in the demo below.
          </p>
        </div>
      ),
      props: { EuiResizableContainer, EuiResizablePanel, EuiResizableButton },
      demo: <ResizableResizerSize />,
    },
  ],
};
