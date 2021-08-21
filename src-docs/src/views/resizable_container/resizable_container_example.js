import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiLink,
  EuiResizableContainer,
  EuiText,
} from '../../../../src/components';
// eslint-disable-next-line
import { EuiResizablePanel } from '../../../../src/components/resizable_container/resizable_panel';
import { EuiResizableButton } from '../../../../src/components/resizable_container/resizable_button';

// prettier-ignore
// eslint-disable-next-line
import { ModeOptions, ToggleOptions } from '!!prop-loader!../../../../src/components/resizable_container/resizable_panel';
import { PanelModeType } from '!!prop-loader!../../../../src/components/resizable_container/types';

import ResizableContainerBasic from './resizable_container_basic';
import ResizableContainerVertical from './resizable_container_vertical';
import ResizableContainerResetValues from './resizable_container_reset_values';
import ResizablePanels from './resizable_panels';
import ResizablePanelCollapsible from './resizable_panel_collapsible';
import ResizablePanelCollapsibleResponsive from './resizable_panel_collapsible_responsive';
import ResizablePanelCollapsibleOpts from './resizable_panel_collapsible_options';
import ResizablePanelCollapsibleExt from './resizable_panel_collapsible_external';

const ResizableContainerSource = require('!!raw-loader!./resizable_container_basic');
const ResizableContainerVerticalSource = require('!!raw-loader!./resizable_container_vertical');
const ResizableContainerResetValuesSource = require('!!raw-loader!./resizable_container_reset_values');
const ResizablePanelsSource = require('!!raw-loader!./resizable_panels');
const ResizablePanelCollapsibleSource = require('!!raw-loader!./resizable_panel_collapsible');
const ResizablePanelCollapsibleResponsiveSource = require('!!raw-loader!./resizable_panel_collapsible_responsive');
const ResizablePanelCollapsibleOptsSource = require('!!raw-loader!./resizable_panel_collapsible_options');
const ResizablePanelCollapsibleExtSource = require('!!raw-loader!./resizable_panel_collapsible_external');

const ResizableContainerHtml = renderToHtml(ResizableContainerBasic);
const basicSnippet = `<EuiResizableContainer>
  {(EuiResizablePanel, EuiResizableButton) => (
    <>
      <EuiResizablePanel initialSize={50} minSize="200px">
        <!-- Left panel content -->
      </EuiResizablePanel>

      <EuiResizableButton />

      <EuiResizablePanel initialSize={50} minSize="200px">
        <!-- Right panel content -->
      </EuiResizablePanel>
    </>
  )}
</EuiResizableContainer>`;

const ResizablePanelsHtml = renderToHtml(ResizablePanels);
const panelsSnippet = `<EuiResizablePanel color="subdued" paddingSize="none" wrapperPadding="m">
  <EuiText>
    <p>{text}</p>
  </EuiText>
</EuiResizablePanel>`;

const ResizableContainerVerticalHtml = renderToHtml(ResizableContainerVertical);
const verticalSnippet = `<EuiResizableContainer direction="vertical">
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
const ResizableContainerResetValuesHtml = renderToHtml(
  ResizableContainerResetValues
);
const ResizablePanelCollapsibleHtml = renderToHtml(ResizablePanelCollapsible);
const collapsibleSnippet = `<EuiResizableContainer>
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
const ResizablePanelCollapsibleResponsiveHtml = renderToHtml(
  ResizablePanelCollapsibleResponsive
);
const responsiveSnippet = `<EuiResizableContainer direction={isMobile ? 'vertical' : 'horizontal'}>
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
      <EuiResizablePanel mode={['collapsible', {
          className: 'panel-toggle',
          'data-test-subj: 'test',
          position: 'top'
        }]}
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
  intro: (
    <EuiText>
      <p>
        This component is handy for various resizable containers.{' '}
        <strong>EuiResizableContainer</strong> uses the{' '}
        <EuiLink
          href="https://reactjs.org/docs/render-props.html#using-props-other-than-render"
          external
        >
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
              encapsulated, you don&#39;t worry about it.
            </li>
            <li>
              add <EuiCode>scrollable=false</EuiCode> prop to a panel to
              eliminate overflow scrolling
            </li>
          </ul>
        </div>
      ),
      props: {
        EuiResizableContainer,
        EuiResizablePanel,
        EuiResizableButton,
      },
      snippet: basicSnippet,
      demo: <ResizableContainerBasic />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelsHtml,
        },
      ],
      title: 'Resizable panel options',
      text: (
        <div>
          <p>
            Each <strong>EuiResizablePanel</strong> is simply an{' '}
            <strong>EuiPanel</strong> wrapped with a{' '}
            <EuiCode>{'<div>'}</EuiCode> for controlling the width. It stretches
            to fill its container and accepts all of the same{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>
            </Link>{' '}
            props to style your panel.
          </p>
          <p>
            The default props clear most of the <strong>EuiPanel</strong>{' '}
            styles, but you can add them back in with <EuiCode>color</EuiCode>,{' '}
            <EuiCode>hasShadow</EuiCode>, and <EuiCode>paddingSize</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiResizablePanel },
      snippet: panelsSnippet,
      demo: <ResizablePanels />,
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
      demo: <ResizableContainerVertical />,
      snippet: verticalSnippet,
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
            Panels can be designated as collapsible, which allows them to hide
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
      props: {
        EuiResizableContainer,
        EuiResizablePanel,
        EuiResizableButton,
        ModeOptions,
        PanelModeType,
        ToggleOptions,
      },
      demo: <ResizablePanelCollapsible />,
      snippet: collapsibleSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizablePanelCollapsibleResponsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizablePanelCollapsibleResponsiveHtml,
        },
      ],
      title: 'Responsive layout',
      text: (
        <div>
          <p>
            It is possible to dynamically change the{' '}
            <EuiCode>direction</EuiCode> prop to allow for adapting layouts to
            screen size. Resize the window to see the panel orientation change.
          </p>
        </div>
      ),
      snippet: responsiveSnippet,
      demo: <ResizablePanelCollapsibleResponsive />,
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
            <EuiCode language="ts">{"mode={['collapsible']}"}</EuiCode> also
            accepts configuration options for the collapsible button by passing
            a second parameter, in the form of:
          </p>
          <EuiCodeBlock language="js" isCopyable>
            {`mode={['collapsible', {
  'data-test-subj': 'panel-1-toggle',
  className: 'panel-toggle',
  position: 'top',
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
            <strong>EuiResizablePanel</strong> collapse toggling. The actions
            are accessible via the third parameter of the render prop function.
          </p>
          <p>
            Note that when bypassing internal{' '}
            <strong>EuiResizableContainer</strong> logic, it is possible to
            create situations that would otherwise be prevented. For instance,
            allowing all panels to be collapsed creates a scenerio where your
            app will need to account for empty state and accesibility in regards
            to keyboard navigation.
          </p>
          <h3>Custom collapse button</h3>
          <p>
            You can also provide an external collapse button for custom
            placement and look within your panel with{' '}
            <EuiCode language="ts">{"mode={['custom']}"}</EuiCode>. When
            collapsed, however, the default collapsed button will be used for
            users to uncollapse the panel.
          </p>
          <p>
            For consistency, we recommend the usage of the{' '}
            <EuiCode>menuLeft</EuiCode>, <EuiCode>menuRight</EuiCode>, etc, icon
            types.
          </p>
        </div>
      ),
      demo: <ResizablePanelCollapsibleExt />,
      snippet: collapsibleExtSnippet,
    },
  ],
};
