import React from 'react';
import { Link } from 'react-router-dom';

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
import ResizableContainerCallbacks from './resizable_container_callbacks';
import ResizablePanels from './resizable_panels';
import ResizablePanelCollapsible from './resizable_panel_collapsible';
import ResizablePanelCollapsibleResponsive from './resizable_panel_collapsible_responsive';
import ResizablePanelCollapsibleOpts from './resizable_panel_collapsible_options';
import ResizablePanelCollapsibleExt from './resizable_panel_collapsible_external';

const ResizableContainerSource = require('!!raw-loader!./resizable_container_basic');
const ResizableContainerVerticalSource = require('!!raw-loader!./resizable_container_vertical');
const ResizableContainerResetValuesSource = require('!!raw-loader!./resizable_container_reset_values');
const ResizableContainerCallbacksSource = require('!!raw-loader!./resizable_container_callbacks');
const ResizablePanelsSource = require('!!raw-loader!./resizable_panels');
const ResizablePanelCollapsibleSource = require('!!raw-loader!./resizable_panel_collapsible');
const ResizablePanelCollapsibleResponsiveSource = require('!!raw-loader!./resizable_panel_collapsible_responsive');
const ResizablePanelCollapsibleOptsSource = require('!!raw-loader!./resizable_panel_collapsible_options');
const ResizablePanelCollapsibleExtSource = require('!!raw-loader!./resizable_panel_collapsible_external');

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

const panelsSnippet = `<EuiResizablePanel color="subdued" paddingSize="none" wrapperPadding="m">
  <EuiText>
    <p>{text}</p>
  </EuiText>
</EuiResizablePanel>`;

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

const callbacksSnippet = `<EuiResizableContainer
  onResizeStart={(trigger) => console.log('onResizeStart', trigger)}
  onResizeEnd={() => console.log('onResizeEnd')}
>
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

      <>
        <EuiCallOut title="Consider adding a tabIndex for keyboard accessibility">
          <p>
            Add a prop <EuiCode>tabIndex={0}</EuiCode> to the{' '}
            <strong>EuiResizableContainer</strong> if it is a fixed height or
            has a lot of content. This ensures keyboard users can set focus on
            the container and scroll to the bottom using arrow keys.
          </p>
        </EuiCallOut>
      </>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: ResizableContainerSource,
        },
      ],
      title: 'Horizontal resizing',
      text: (
        <>
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
        </>
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
          type: GuideSectionTypes.TSX,
          code: ResizablePanelsSource,
        },
      ],
      title: 'Resizable panel options',
      text: (
        <>
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
        </>
      ),
      props: { EuiResizablePanel },
      snippet: panelsSnippet,
      demo: <ResizablePanels />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: ResizableContainerResetValuesSource,
        },
      ],
      title: 'Horizontal resizing with controlled widths',
      text: (
        <>
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
        </>
      ),
      props: { EuiResizableContainer, EuiResizablePanel, EuiResizableButton },
      demo: <ResizableContainerResetValues />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: ResizableContainerVerticalSource,
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
          type: GuideSectionTypes.TSX,
          code: ResizableContainerCallbacksSource,
        },
      ],
      title: 'Resizable container callbacks',
      text: (
        <>
          <p>
            <strong>EuiResizableContainer</strong> supports{' '}
            <EuiCode>onResizeStart</EuiCode> and <EuiCode>onResizeEnd</EuiCode>{' '}
            callback props to listen for when resizing starts and ends. The{' '}
            <EuiCode>onResizeStart</EuiCode> callback is passed a{' '}
            <EuiCode>{"trigger: 'pointer' | 'key'"}</EuiCode> parameter to
            determine which user action triggered the resize.
          </p>
        </>
      ),
      props: { EuiResizableContainer, EuiResizablePanel, EuiResizableButton },
      demo: <ResizableContainerCallbacks />,
      snippet: callbacksSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: ResizablePanelCollapsibleSource,
        },
      ],
      title: 'Collapsible resizable panels',
      text: (
        <>
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
        </>
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
          type: GuideSectionTypes.TSX,
          code: ResizablePanelCollapsibleResponsiveSource,
        },
      ],
      title: 'Responsive layout',
      text: (
        <p>
          It is possible to dynamically change the <EuiCode>direction</EuiCode>{' '}
          prop to allow for adapting layouts to screen size. Resize the window
          to see the panel orientation change.
        </p>
      ),
      snippet: responsiveSnippet,
      demo: <ResizablePanelCollapsibleResponsive />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: ResizablePanelCollapsibleOptsSource,
        },
      ],
      title: 'Collapsible panel options',
      text: (
        <>
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
        </>
      ),
      demo: <ResizablePanelCollapsibleOpts />,
      snippet: collapsibleOptsSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: ResizablePanelCollapsibleExtSource,
        },
      ],
      title: 'Collapsible panels with external control',
      text: (
        <>
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
        </>
      ),
      demo: <ResizablePanelCollapsibleExt />,
      snippet: collapsibleExtSnippet,
    },
  ],
};
