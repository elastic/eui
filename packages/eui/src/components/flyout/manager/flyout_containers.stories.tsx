/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { actions } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo, useState } from 'react';

import { EuiBreakpointSize } from '../../../services';
import { EuiButton } from '../../button';
import { EuiDescriptionList } from '../../description_list';
import { EuiComponentDefaultsProvider } from '../../provider';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiSpacer } from '../../spacer';
import { EuiText } from '../../text';
import { EuiFlyout, FLYOUT_TYPES } from '../flyout';
import { EuiFlyoutBody } from '../flyout_body';
import { EuiFlyoutFooter } from '../flyout_footer';
import { EuiFlyoutHeader } from '../flyout_header';
import { EuiFlyoutChild, EuiFlyoutChildProps } from './flyout_child';
import { useFlyoutLayoutMode } from './hooks';

type EuiFlyoutChildActualProps = Pick<
  EuiFlyoutChildProps,
  | 'aria-label'
  | 'as'
  | 'children'
  | 'closeButtonProps'
  | 'focusTrapProps'
  | 'includeFixedHeadersInFocusTrap'
  | 'includeSelectorInFocusTrap'
  | 'maskProps'
  | 'maxWidth'
  | 'onClose'
  | 'ownFocus'
  | 'paddingSize'
  | 'pushAnimation'
  | 'side'
  | 'size'
  | 'style'
>;

type EuiFlyoutType = (typeof FLYOUT_TYPES)[number];

interface FlyoutChildStoryArgs extends EuiFlyoutChildActualProps {
  mainSize?: 's' | 'm';
  childSize?: 's' | 'm' | 'fill';
  hasChildBackground: boolean;
  childMinWidth?: number;
  childMaxWidth?: number;
  mainFlyoutType: EuiFlyoutType;
  mainMaxWidth?: number;
  mainMinWidth?: number;
  outsideClickCloses?: boolean;
  paddingSize?: 'none' | 's' | 'm' | 'l';
  pushMinBreakpoint?: EuiBreakpointSize;
  showFooter?: boolean;
  mainResizable?: boolean;
  childResizable?: boolean;
}

const breakpointSizes: EuiBreakpointSize[] = ['xs', 's', 'm', 'l', 'xl'];

const playgroundActions = actions('log');

const meta: Meta<FlyoutChildStoryArgs> = {
  title: 'Layout/EuiFlyout/Flyout Manager',
  component: EuiFlyoutChild,
  argTypes: {
    childSize: {
      options: ['s', 'm', 'l', 'fill'],
      control: { type: 'radio' },
      description:
        'The size of the child flyout. Valid combinations: both cannot be "m", both cannot be "fill", and "l" can only be used if the other flyout is "fill".',
    },
    hasChildBackground: {
      control: { type: 'boolean' },
      description:
        'When the flyout is used as a child in a managed flyout session, setting `true` gives the shaded background style.',
    },
    childMaxWidth: {
      control: { type: 'number' },
      description: 'The maximum width of the child flyout.',
    },
    mainSize: {
      options: ['s', 'm', 'l', 'fill', '400px'],
      control: { type: 'radio' },
      description:
        'The size of the main (parent) flyout. Can use named sizes (s, m, l, fill) or custom values like "400px". Valid combinations: both cannot be "m", both cannot be "fill", and "l" can only be used if the other flyout is "fill".',
    },
    mainFlyoutType: {
      options: FLYOUT_TYPES,
      control: { type: 'radio' },
      description: 'The type of the main flyout..',
    },
    mainMaxWidth: {
      control: { type: 'number' },
      description: 'The maximum width of the main flyout.',
    },
    pushMinBreakpoint: {
      options: breakpointSizes,
      control: { type: 'select' },
      description:
        'Breakpoint at which the main flyout (if `type="push"`) will convert to an overlay flyout. Defaults to `xs`.',
    },
    showFooter: {
      control: { type: 'boolean' },
      description:
        'Whether to show the flyout footer. If `false`, an `EuiFlyoutFooter` will not be rendered.',
    },
    mainResizable: {
      control: { type: 'boolean' },
      description: 'Whether the main flyout should be resizable.',
    },
    childResizable: {
      control: { type: 'boolean' },
      description: 'Whether the child flyout should be resizable.',
    },
    // use "mainSize" and "childSize" instead
    size: { table: { disable: true } },
    // use "mainMaxWidth" and "childMaxWidth" instead
    maxWidth: { table: { disable: true } },
    // props below this line are not configurable in the playground
    ['aria-label']: { table: { disable: true } },
    as: { table: { disable: true } },
    children: { table: { disable: true } },
    closeButtonProps: { table: { disable: true } },
    focusTrapProps: { table: { disable: true } },
    includeFixedHeadersInFocusTrap: { table: { disable: true } },
    includeSelectorInFocusTrap: { table: { disable: true } },
    maskProps: { table: { disable: true } },
    onClose: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  args: {
    mainSize: 'm',
    childSize: 'fill',
    hasChildBackground: true,
    mainFlyoutType: 'overlay',
    outsideClickCloses: false,
    ownFocus: false, // Depends on `mainFlyoutType=overlay`
    paddingSize: 'm',
    pushAnimation: true,
    pushMinBreakpoint: 'xs',
    showFooter: true,
    mainResizable: true,
    childResizable: false,
    mainMinWidth: 300,
    childMinWidth: 300,
    mainMaxWidth: 800,
    childMaxWidth: undefined,
  },
  parameters: {
    // Skipping visual regression testing with Loki
    // This is a playground for Flyout Manager and doesn't show anything testable on page load
    loki: { skip: true },
  },
};

export default meta;
type Story = StoryObj<FlyoutChildStoryArgs>;

/**
 * 1. **App flyout** — scoped to the main content area via the `container` prop.
 *    Uses `type="push"` and supports a child flyout. Does not overlap the sidebars.
 *
 * 2. **Global flyout** — positioned relative to the document body (no `container`).
 *    Uses `type="overlay"` with `ownFocus={true}` and no child flyout.
 *    Overlaps the entire viewport, including sidebars.
 */
const ContainerDemoComponent: React.FC<FlyoutChildStoryArgs> = ({
  mainSize,
  childSize,
  hasChildBackground,
  mainFlyoutType,
  pushMinBreakpoint,
  mainMaxWidth,
  childMaxWidth,
  showFooter,
  mainResizable,
  mainMinWidth,
  childResizable,
  childMinWidth,
  ...args
}) => {
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

  // Mirrors how Kibana configures EuiProvider: all EuiFlyout instances default
  // to the app container. Global flyouts opt out with `container={null}`.
  const componentDefaults = useMemo(
    () => ({
      EuiFlyout: {
        container: containerEl ?? undefined,
      },
    }),
    [containerEl]
  );

  // App flyout state (container-scoped, push type, with child)
  const [isAppFlyoutOpen, setIsAppFlyoutOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);

  // Global flyout state (body-scoped, overlay type, ownFocus)
  const [isGlobalFlyoutOpen, setIsGlobalFlyoutOpen] = useState(false);

  const openAppFlyout = () => {
    setIsAppFlyoutOpen(true);
    playgroundActions.log('App flyout opened');
  };
  const closeAppFlyout = () => {
    setIsAppFlyoutOpen(false);
    setIsChildOpen(false);
    playgroundActions.log('App flyout closed');
  };
  const openChild = () => {
    setIsChildOpen(true);
    playgroundActions.log('Child flyout opened');
  };
  const closeChild = () => {
    setIsChildOpen(false);
    playgroundActions.log('Child flyout closed');
  };
  const openGlobalFlyout = () => {
    setIsGlobalFlyoutOpen(true);
    playgroundActions.log('Global flyout opened');
  };
  const closeGlobalFlyout = () => {
    setIsGlobalFlyoutOpen(false);
    playgroundActions.log('Global flyout closed');
  };

  const layoutMode = useFlyoutLayoutMode();

  // Global flyout configuration (fixed — not configurable via story args)
  const globalFlyoutType = 'overlay' as const;
  const globalFlyoutOwnFocus = true;
  const globalFlyoutSize = 's' as const;
  const globalFlyoutResizable = false;

  const renderGlobalFlyout = () => (
    <EuiFlyout
      id="flyout-container-demo-global"
      container={null}
      type={globalFlyoutType}
      ownFocus={globalFlyoutOwnFocus}
      size={globalFlyoutSize}
      aria-label="Global Flyout"
      onClose={closeGlobalFlyout}
    >
      <EuiFlyoutHeader>
        <EuiText>
          <h2>Global Flyout</h2>
        </EuiText>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            This is a <strong>global flyout</strong> positioned relative to the
            document body. It overlaps the entire viewport, including sidebars,
            and has its own focus trap.
          </p>
        </EuiText>
        <EuiSpacer />

        <EuiDescriptionList
          textStyle="reverse"
          listItems={[
            {
              title: 'Container element',
              description: 'None (body-scoped)',
            },
            { title: 'Size', description: globalFlyoutSize },
            { title: 'Flyout type', description: globalFlyoutType },
            {
              title: 'Own focus',
              description: globalFlyoutOwnFocus ? 'Yes' : 'No',
            },
            {
              title: 'Resizable',
              description: globalFlyoutResizable ? 'Yes' : 'No',
            },
          ]}
        />
      </EuiFlyoutBody>
      {showFooter && (
        <EuiFlyoutFooter>
          <EuiText>
            <p>Global flyout footer</p>
          </EuiText>
        </EuiFlyoutFooter>
      )}
    </EuiFlyout>
  );

  const renderAppFlyoutChild = () => (
    <EuiFlyout
      id="flyout-container-demo-child"
      size={childSize}
      hasChildBackground={hasChildBackground}
      maxWidth={childMaxWidth}
      ownFocus={false}
      resizable={childResizable}
      minWidth={childMinWidth}
      {...args}
      aria-label={`Child Flyout (${childSize})`}
      onClose={closeChild}
    >
      <EuiFlyoutBody>
        <EuiText>
          <p>
            This child flyout is also scoped to the container element. Both
            flyouts stay within the main content area boundaries.
          </p>
        </EuiText>
        <EuiSpacer />

        <EuiDescriptionList
          textStyle="reverse"
          listItems={[
            {
              title: 'Size',
              description: childSize ?? 'undefined',
            },
            {
              title: 'Resizable',
              description: childResizable ? 'Yes' : 'No',
            },
            {
              title: 'Max width',
              description: childMaxWidth ? `${childMaxWidth}px` : 'none',
            },
            {
              title: 'Min width',
              description: childMinWidth ? `${childMinWidth}px` : 'none',
            },
            {
              title: 'hasChildBackground',
              description: hasChildBackground ? 'Yes' : 'No',
            },
            {
              title: 'Current layout mode',
              description: layoutMode,
            },
          ]}
        />
      </EuiFlyoutBody>
      {showFooter && (
        <EuiFlyoutFooter>
          <EuiText>
            <p>Child flyout footer</p>
          </EuiText>
        </EuiFlyoutFooter>
      )}
    </EuiFlyout>
  );

  const renderAppFlyoutMain = () => (
    <EuiFlyout
      session="start"
      id="flyout-container-demo-app"
      size={mainSize}
      type={mainFlyoutType}
      pushMinBreakpoint={pushMinBreakpoint}
      maxWidth={mainMaxWidth}
      ownFocus={false}
      resizable={mainResizable}
      minWidth={mainMinWidth}
      aria-label={`App Flyout (${mainSize})`}
      {...args}
      onClose={closeAppFlyout}
    >
      <EuiFlyoutHeader>
        <EuiText>
          <h2>App Flyout ({mainSize})</h2>
        </EuiText>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            This is an <strong>app flyout</strong> scoped to the main content
            area. It uses <code>container</code> to stay within the application
            boundaries.
          </p>
        </EuiText>
        <EuiSpacer />

        <EuiDescriptionList
          textStyle="reverse"
          listItems={[
            { title: 'Size', description: mainSize ?? 'undefined' },
            {
              title: 'Resizable',
              description: mainResizable ? 'Yes' : 'No',
            },
            {
              title: 'Max width',
              description: mainMaxWidth ? `${mainMaxWidth}px` : 'none',
            },
            {
              title: 'Min width',
              description: mainMinWidth ? `${mainMinWidth}px` : 'none',
            },
            { title: 'Flyout type', description: mainFlyoutType },
            {
              title: 'Push breakpoint',
              description: pushMinBreakpoint ?? 'undefined',
            },
            {
              title: 'Container element',
              description: containerEl ? 'Set to main content div' : 'null',
            },
          ]}
        />
        <EuiSpacer />

        {!isChildOpen ? (
          <EuiButton onClick={openChild}>Open child flyout</EuiButton>
        ) : (
          <EuiButton onClick={closeChild}>Close child flyout</EuiButton>
        )}
        {isChildOpen && renderAppFlyoutChild()}
      </EuiFlyoutBody>
      {showFooter && (
        <EuiFlyoutFooter>
          <EuiText>
            <p>App flyout footer</p>
          </EuiText>
        </EuiFlyoutFooter>
      )}
    </EuiFlyout>
  );

  // Grid layout dimensions
  const bannerHeight = 32;
  const headerHeight = 48;
  const applicationTopBarHeight = 48;
  const navigationWidth = 248;
  const sidebarWidth = 200;
  const footerHeight = 0;

  return (
    <EuiComponentDefaultsProvider componentDefaults={componentDefaults}>
      <div
        style={{
          height: '100vh',
          width: '100%',
          maxWidth: '100vw',
          minHeight: 0,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateAreas: `
        'banner banner banner'
        'header header header'
        'navigation application sidebar'
        'footer footer footer'
      `,
          gridTemplateColumns: `${navigationWidth}px 1fr ${sidebarWidth}px`,
          // minmax(0, 1fr) lets the main row shrink so only the application cell scrolls
          gridTemplateRows: `${bannerHeight}px ${headerHeight}px minmax(0, 1fr) ${footerHeight}px`,
          fontFamily: 'inherit',
        }}
      >
        <div
          style={{
            gridArea: 'banner',
            background: '#f5f7fa',
            borderBottom: '1px solid #d3dae6',
          }}
        />

        <header
          style={{
            gridArea: 'header',
            background: '#fff',
            borderBottom: '1px solid #d3dae6',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EuiFlexGroup>
            <EuiFlexItem grow={true}>
              <EuiText size="s">
                <strong>Header</strong>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem alignItems="right" grow={false}>
              <span>
                {isGlobalFlyoutOpen ? (
                  <EuiButton
                    size="s"
                    onClick={closeGlobalFlyout}
                    color="warning"
                  >
                    Close Global Flyout
                  </EuiButton>
                ) : (
                  <EuiButton
                    size="s"
                    onClick={openGlobalFlyout}
                    color="warning"
                  >
                    Open Global Flyout
                  </EuiButton>
                )}
              </span>
            </EuiFlexItem>
          </EuiFlexGroup>
        </header>

        <nav
          style={{
            gridArea: 'navigation',
            borderRight: '1px solid #d3dae6',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              background: '#f5f7fa',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              overflow: 'auto',
              minHeight: 0,
            }}
          >
            <EuiText size="s">
              <h3>Navigation</h3>
              <ul>
                <li>Nav item 1</li>
                <li>Nav item 2</li>
                <li>Nav item 3</li>
              </ul>
            </EuiText>
          </div>
        </nav>

        <main
          ref={setContainerEl}
          id="app-main-scroll"
          style={{
            gridArea: 'application',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            padding: 0,
            background: '#ffffff',
            minHeight: 0,
            borderRadius: 6,
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              flexShrink: 0,
              height: applicationTopBarHeight,
              borderBottom: '1px solid #d3dae6',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
            }}
          >
            <EuiText size="s">Application top bar</EuiText>
          </div>
          <div style={{ padding: 24, flex: 1, minHeight: 0 }}>
            <EuiText>
              <h2>Main content area</h2>
              <p>
                Application container cell is the container for the{' '}
                <strong>app flyout</strong>.
              </p>
              <p>
                The <strong>global flyout</strong> is positioned relative to the
                document body and overlaps the entire viewport.
              </p>
            </EuiText>
            <EuiSpacer size="l" />

            {isAppFlyoutOpen ? (
              <EuiButton onClick={closeAppFlyout}>Close App Flyout</EuiButton>
            ) : (
              <EuiButton onClick={openAppFlyout}>Open App Flyout</EuiButton>
            )}

            {/* App flyout: container-scoped, push type, with child */}
            {isAppFlyoutOpen && containerEl && renderAppFlyoutMain()}

            <EuiSpacer size="l" />
            <EuiText>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lacinia odio vitae vestibulum vestibulum. Cras vehicula, mi eget
                laoreet venenatis, purus lectus tincidunt arcu, a ultrices nisi
                eros sed pede.
              </p>
              <p>
                Nulla facilisi. Aenean nec eros vestibulum, tempor neque at,
                volutpat erat. Phasellus auctor nulla vel magna tincidunt, quis
                cursus arcu sollicitudin. Integer posuere lacinia dapibus.
              </p>
              <p>
                Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et.
              </p>
              <p>
                Etiam porta sem malesuada magna mollis euismod. Maecenas
                faucibus mollis interdum. Vestibulum id ligula porta felis
                euismod semper. Aenean eu leo quam. Pellentesque ornare sem
                lacinia quam venenatis.
              </p>
              <p>
                Curabitur blandit tempus porttitor. Nullam quis risus eget urna
                mollis ornare vel eu leo. Donec sed odio dui. Morbi leo risus,
                porta ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                suscipit auctor dui, at convallis nisl. Donec a semper odio.
                Curabitur ac nunc eget metus efficitur commodo. In in ligula a
                enim efficitur efficitur. Proin sed felis eget nunc efficitur
                tincidunt. Sed id ligula quis enim commodo efficitur. Donec ut
                sem sed enim sollicitudin varius.
              </p>
              <p>
                Duis mollis est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus.
              </p>
              <p>
                Sed id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius. Mauris at nisi sed metus efficitur
                fermentum. Donec eget ligula eget nunc efficitur efficitur. Sed
                id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius.
              </p>
              <p>
                Mauris at nisi sed metus efficitur fermentum. Donec eget ligula
                eget nunc efficitur efficitur. Sed id ligula quis enim commodo
                efficitur. Donec ut sem sed enim sollicitudin varius. Mauris at
                nisi sed metus efficitur fermentum. Donec eget ligula eget nunc
                efficitur efficitur.
              </p>
              <p>
                Sed id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius. Mauris at nisi sed metus efficitur
                fermentum. Donec eget ligula eget nunc efficitur efficitur. Sed
                id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius.
              </p>
              <p>
                Sed id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius. Mauris at nisi sed metus efficitur
                fermentum. Donec eget ligula eget nunc efficitur efficitur. Sed
                id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius.
              </p>
              <p>
                Sed id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius. Mauris at nisi sed metus efficitur
                fermentum. Donec eget ligula eget nunc efficitur efficitur. Sed
                id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius.
              </p>
              <p>
                Sed id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius. Mauris at nisi sed metus efficitur
                fermentum. Donec eget ligula eget nunc efficitur efficitur. Sed
                id ligula quis enim commodo efficitur. Donec ut sem sed enim
                sollicitudin varius.
              </p>
            </EuiText>
          </div>
        </main>

        <aside
          style={{
            gridArea: 'sidebar',
            borderLeft: '1px solid #d3dae6',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              background: '#f5f7fa',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              minHeight: 0,
            }}
          >
            <EuiText size="s">
              <h3>Tools</h3>
              <ul>
                <li>Tool item 1</li>
                <li>Tool item 2</li>
                <li>Tool item 3</li>
              </ul>
            </EuiText>
          </div>
        </aside>

        <div style={{ gridArea: 'footer' }} />

        {/* Global flyout: body-scoped, overlay type, ownFocus, no child */}
        {isGlobalFlyoutOpen && renderGlobalFlyout()}
      </div>
    </EuiComponentDefaultsProvider>
  );
};

export const FlyoutContainerDemo: Story = {
  name: 'Container Demo',
  render: (args) => <ContainerDemoComponent {...args} />,
};
