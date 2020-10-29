import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
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
import ResizablePanelCollapsible from './resizable_panel_collapsible';
import ResizablePanelCollapsibleOpts from './resizable_panel_collapsible_options';
import ResizablePanelCollapsibleExt from './resizable_panel_collapsible_external';

const ResizableContainerSource = require('!!raw-loader!./resizable_container_basic');
const ResizableContainerVerticalSource = require('!!raw-loader!./resizable_container_vertical');
const ResizableContainerThreePanelsSource = require('!!raw-loader!./resizable_container_three_panels');
const ResizableContainerResetValuesSource = require('!!raw-loader!./resizable_container_reset_values');
const ResizableResizerSizeSource = require('!!raw-loader!./resizable_resizer_size');
const ResizablePanelCollapsibleSource = require('!!raw-loader!./resizable_panel_collapsible');
const ResizablePanelCollapsibleOptsSource = require('!!raw-loader!./resizable_panel_collapsible_options');
const ResizablePanelCollapsibleExtSource = require('!!raw-loader!./resizable_panel_collapsible_external');

const ResizableContainerHtml = renderToHtml(ResizableContainerBasic);
const basicSnippet = `<EuiResizableContainer style={{ height: '400px' }}>
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

const ResizableContainerVerticalHtml = renderToHtml(ResizableContainerVertical);
const verticalSnippet = `<EuiResizableContainer direction="vertical" style={{ height: '400px' }}>
  {(EuiResizablePanel, EuiResizableButton) => (
    <>
      <EuiResizablePanel initialSize={50} minSize="20%">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>

      <EuiResizableButton />

      <EuiResizablePanel initialSize={50} minSize="20%">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>
    </>
  )}
</EuiResizableContainer>`;
const ResizableContainerThreePanelsHtml = renderToHtml(
  ResizableContainerThreePanels
);
const ResizableContainerResetValuesHtml = renderToHtml(
  ResizableContainerResetValues
);
const ResizableResizerSizeHtml = renderToHtml(ResizableResizerSize);
const ResizablePanelCollapsibleHtml = renderToHtml(ResizablePanelCollapsible);
const collapsibleSnippet = `<EuiResizableContainer style={{ height: '400px' }}>
  {(EuiResizablePanel, EuiResizableButton) => (
    <>
      <EuiResizablePanel mode="collapsible" initialSize={20} minSize="5px">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>

      <EuiResizableButton />

      <EuiResizablePanel mode="main" initialSize={80} minSize="200px">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>
    </>
  )}
</EuiResizableContainer>`;
const ResizablePanelCollapsibleOptsHtml = renderToHtml(
  ResizablePanelCollapsibleOpts
);
const collapsibleOptsSnippet = `<EuiResizableContainer style={{ height: '400px' }}>
  {(EuiResizablePanel, EuiResizableButton) => (
    <>
      <EuiResizablePanel mode={['collapsible'], {
          notCollapsedIcon: 'arrowLeft',
          collapsedIcon: 'arrowRight',
          className: 'panel-toggle'
        }}
        initialSize={20}
        minSize="5px"
      >
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>

      <EuiResizableButton />

      <EuiResizablePanel mode="main" initialSize={80} minSize="200px">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>
    </>
  )}
</EuiResizableContainer>`;
const ResizablePanelCollapsibleExtHtml = renderToHtml(
  ResizablePanelCollapsibleExt
);
const collapsibleExtSnippet = `<EuiResizableContainer style={{ height: '400px' }}>
  {(EuiResizablePanel, EuiResizableButton, {togglePanel}) => (
    <>
      <EuiResizablePanel initialSize={20} minSize="5px">
        <EuiText>
          <p>{text}</p>
        </EuiText>
      </EuiResizablePanel>

      <EuiResizableButton />

      <EuiResizablePanel initialSize={80} minSize="200px">
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
            <strong>EuiResizableButton</strong> components for layout, and{' '}
            <EuiCode>actions</EuiCode> for custom handling collapse and resize
            functionality in your app. Wrap parts of your content with the{' '}
            <strong>EuiResizablePanel</strong> component and put the{' '}
            <strong>EuiResizableButton</strong> component between.
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
      snippet: basicSnippet,
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
          code: ResizableContainerVerticalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerVerticalHtml,
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
      snippet: verticalSnippet,
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
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleHtml,
        },
      ],
      title: 'Collapsible resizable panels',
      text: (
        <div>
          <p>
            Panels can be designated as collpasible, which allows them to hide
            content and automatically resize to a minimal width. The intent of
            collapsible panels is to enable large, layout-level content areas to
            cede space to a main content area. For instance, collapsing an
            action panel to allow more focus on the primary display panel.
          </p>
          <p>
            Use the <EuiCode>mode</EuiCode> prop on an{' '}
            <strong>EuiResizablePanel</strong> to mark it as{' '}
            <EuiCode>collapsible</EuiCode> or <EuiCode>main</EuiCode>. From the
            provided <EuiCode>mode</EuiCode> configuration, the{' '}
            <strong>EuiResizableContainer</strong> will determine placement of
            the toggle button and functionality of panel collapsing. To prevent
            empty states, not all panels can be{' '}
            <EuiCode>mode=collapsible</EuiCode> (there must be at least one{' '}
            <EuiCode>mode=main</EuiCode> panel).
          </p>
        </div>
      ),
      demo: <ResizablePanelCollapsible />,
      snippet: collapsibleSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleOptsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleOptsHtml,
        },
      ],
      title: 'Collapsible panel options',
      text: (
        <div>
          <p>
            An <strong>EuiResizablePanel</strong> marked as{' '}
            <EuiCode>mode=collapsible</EuiCode> also accepts configuration
            options by passing a second parameter, in the form of:
          </p>
          <EuiCodeBlock language="js">
            {`mode={["collapsible", {
  'data-test-subj': 'panel-1-toggle',
  className: 'panel-toggle'
}]}`}
          </EuiCodeBlock>
        </div>
      ),
      demo: <ResizablePanelCollapsibleOpts />,
      snippet: collapsibleOptsSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleExtSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleExtHtml,
        },
      ],
      title: 'Collapsible panels with external control',
      text: (
        <div>
          <p>
            <strong>EuiResizableContainer</strong> also provides action hooks
            for parent components to access internal methods, such as{' '}
            <strong>EuiResizablePanel</strong> collapse toggling.
          </p>
          <p>
            The actions are accessible via the third parameter of the render
            prop function.
          </p>
          <p>
            Note that when bypassing internal{' '}
            <strong>EuiResizableContainer</strong> logic, it is possible to
            create situations that would otherwise be prevented. For instance,
            allowing all panels to be collapsed creates a scenerio where your
            app will need to account for empty state and accesibility in regards
            to keyboard navigation.
          </p>
        </div>
      ),
      demo: <ResizablePanelCollapsibleExt />,
      snippet: collapsibleExtSnippet,
    },
  ],
};
