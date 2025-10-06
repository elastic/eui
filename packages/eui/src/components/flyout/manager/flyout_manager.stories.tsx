/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { actions } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';

import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import { EuiBreakpointSize } from '../../../services';
import { EuiButton } from '../../button';
import { EuiCodeBlock } from '../../code';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPanel } from '../../panel';
import { EuiProvider } from '../../provider';
import { EuiSpacer } from '../../spacer';
import { EuiText } from '../../text';
import { EuiTitle } from '../../title';
import { FLYOUT_TYPES, EuiFlyout } from '../flyout';
import { EuiFlyoutBody } from '../flyout_body';
import { EuiFlyoutFooter } from '../flyout_footer';
import { EuiFlyoutChild, EuiFlyoutChildProps } from './flyout_child';
import { useFlyoutLayoutMode, useFlyoutManager } from './hooks';

type EuiFlyoutChildActualProps = Pick<
  EuiFlyoutChildProps,
  | 'aria-label'
  | 'as'
  | 'backgroundStyle'
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
  childSize?: 's' | 'm';
  childBackgroundStyle?: 'default' | 'shaded';
  childMaxWidth?: number;
  mainFlyoutType: EuiFlyoutType;
  mainMaxWidth?: number;
  outsideClickCloses?: boolean;
  paddingSize?: 'none' | 's' | 'm' | 'l';
  pushMinBreakpoint: EuiBreakpointSize;
  showFooter?: boolean;
  mainFlyoutResizable?: boolean;
  childFlyoutResizable?: boolean;
}

const breakpointSizes: EuiBreakpointSize[] = ['xs', 's', 'm', 'l', 'xl'];

const playgroundActions = actions('log');

const meta: Meta<FlyoutChildStoryArgs> = {
  title: 'Layout/EuiFlyout/Flyout Manager',
  component: EuiFlyoutChild,
  argTypes: {
    childSize: {
      options: ['s', 'm', 'fill'],
      control: { type: 'radio' },
      description:
        'The size of the child flyout. If the main is `s`, the child can be `s`, or `m`. If the main is `m`, the child can only be `s`.',
    },
    childBackgroundStyle: {
      options: ['default', 'shaded'],
      control: { type: 'radio' },
      description: 'The background style of the child flyout.',
    },
    childMaxWidth: {
      control: { type: 'number' },
      description: 'The maximum width of the child flyout.',
    },
    mainSize: {
      options: ['s', 'm', 'fill'],
      control: { type: 'radio' },
      description:
        'The size of the main (parent) flyout. If `m`, the child must be `s`. If `s`, the child can be `s`, or `m`.',
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
    mainFlyoutResizable: {
      control: { type: 'boolean' },
      description: 'Whether the main flyout should be resizable.',
    },
    childFlyoutResizable: {
      control: { type: 'boolean' },
      description: 'Whether the child flyout should be resizable.',
    },

    // use "childBackgroundStyle" instead
    backgroundStyle: { table: { disable: true } },
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
    childSize: 's',
    childBackgroundStyle: 'default',
    mainFlyoutType: 'overlay',
    outsideClickCloses: false,
    ownFocus: true, // Depends on `mainFlyoutType=overlay`
    paddingSize: 'm',
    pushAnimation: true,
    pushMinBreakpoint: 'xs',
    showFooter: true,
    mainFlyoutResizable: false,
    childFlyoutResizable: false,
  },
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<FlyoutChildStoryArgs>;

/**
 * A shared helper component used to demo management of internal state. It keeps internal state of
 * the selected flyout type (overlay/push) and the open/closed state of child flyout.
 */
const StatefulFlyout: React.FC<FlyoutChildStoryArgs> = ({
  mainSize,
  childSize,
  childBackgroundStyle,
  mainFlyoutType,
  pushMinBreakpoint,
  mainMaxWidth,
  childMaxWidth,
  showFooter,
  mainFlyoutResizable,
  childFlyoutResizable,
  ...args
}) => {
  const [isMainOpen, setIsMainOpen] = useState(true);

  /* TODO: Allow child to be open automatically on initial render. Currently,
   * this is not supported due to the child not having a reference to the
   * session context */
  const [isChildOpen, setIsChildOpen] = useState(false);

  const openMain = () => {
    setIsMainOpen(true);
    playgroundActions.log('Parent flyout opened');
  };
  const closeMain = () => {
    setIsMainOpen(false);
    setIsChildOpen(false);
    playgroundActions.log('Parent flyout closed');
  };
  const openChild = () => {
    setIsChildOpen(true);
    playgroundActions.log('Child flyout opened');
  };
  const closeChild = () => {
    setIsChildOpen(false);
    playgroundActions.log('Child flyout closed');
  };

  const layoutMode = useFlyoutLayoutMode();

  return (
    <>
      <EuiText>
        <p>
          This is the main page content. Watch how it behaves when the flyout
          type changes.
        </p>
        <p>
          <strong>Current layout mode: {layoutMode}</strong>
        </p>
      </EuiText>
      <EuiSpacer size="l" />
      {isMainOpen ? (
        <EuiButton onClick={closeMain}>Close Main Flyout</EuiButton>
      ) : (
        <EuiButton onClick={openMain}>Open Main Flyout</EuiButton>
      )}

      <EuiFlyout
        isOpen={isMainOpen}
        session={true}
        id="flyout-manager-playground-main"
        size={mainSize}
        type={mainFlyoutType}
        pushMinBreakpoint={pushMinBreakpoint}
        maxWidth={mainMaxWidth}
        ownFocus={false}
        resizable={mainFlyoutResizable}
        aria-label={`Main Flyout Menu (${mainSize})`}
        {...args}
        onClose={closeMain}
      >
        <EuiFlyoutBody>
          <EuiText>
            <p>This is the main flyout content.</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              neque sequi illo, cum rerum quia ab animi velit sit incidunt
              inventore temporibus eaque nam veritatis amet maxime maiores optio
              quam?
            </p>
          </EuiText>
          <EuiSpacer />

          {!isChildOpen ? (
            <EuiButton onClick={openChild}>Open child panel</EuiButton>
          ) : (
            <EuiButton onClick={closeChild}>Close child panel</EuiButton>
          )}
          <EuiFlyout
            isOpen={isChildOpen}
            id="flyout-manager-playground-child"
            size={childSize}
            backgroundStyle={childBackgroundStyle}
            maxWidth={childMaxWidth}
            ownFocus={false}
            resizable={childFlyoutResizable}
            {...args}
            aria-label={`Child Flyout Panel (${childSize})`}
            onClose={closeChild}
          >
            <EuiFlyoutBody>
              <EuiText>
                <p>This is the child flyout content.</p>
                <p>Size restrictions apply:</p>
                <ul>
                  <li>When main panel is 's', child can be 's', or 'm'</li>
                  <li>When main panel is 'm', child is limited to 's'</li>
                </ul>
                <EuiSpacer />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum neque sequi illo, cum rerum quia ab animi velit sit
                  incidunt inventore temporibus eaque nam veritatis amet maxime
                  maiores optio quam?
                </p>
              </EuiText>
            </EuiFlyoutBody>
            {showFooter && (
              <EuiFlyoutFooter>
                <EuiText>
                  <p>Child flyout footer</p>
                </EuiText>
              </EuiFlyoutFooter>
            )}
            {/* Footer is optional */}
          </EuiFlyout>
        </EuiFlyoutBody>
        {showFooter && (
          <EuiFlyoutFooter>
            <EuiText>
              <p>Main flyout footer</p>
            </EuiText>
          </EuiFlyoutFooter>
        )}
      </EuiFlyout>
    </>
  );
};

export const FlyoutChildDemo: Story = {
  name: 'Playground',
  render: (args) => <StatefulFlyout {...args} />,
};

const ExternalRootFlyout: React.FC<{ id: string }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <EuiPanel hasBorder paddingSize="m" grow={false}>
      <EuiTitle size="xs">
        <h3>{id}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? 'Close flyout' : 'Open flyout'}
      </EuiButton>
      <EuiFlyout
        id={`external-root-${id}`}
        isOpen={isOpen}
        session
        size="m"
        onClose={() => setIsOpen(false)}
        flyoutMenuProps={{ title: `${id} flyout` }}
      >
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This flyout lives in a separate React root but shares the same
              manager state. Closing it here should update all other flyout
              menus and history.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    </EuiPanel>
  );
};

const MultiRootFlyoutDemo: React.FC<FlyoutChildStoryArgs> = (args) => {
  const secondaryRootRef = useRef<HTMLDivElement | null>(null);
  const tertiaryRootRef = useRef<HTMLDivElement | null>(null);
  const mountedRootsRef = useRef<Root[]>([]);
  const flyoutManager = useFlyoutManager();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (secondaryRootRef.current && tertiaryRootRef.current) {
        const containers = [
          { container: secondaryRootRef.current, id: 'Secondary root' },
          { container: tertiaryRootRef.current, id: 'Tertiary root' },
        ];

        mountedRootsRef.current = containers.map(({ container, id }) => {
          const root = createRoot(container);
          root.render(
            <EuiProvider>
              <ExternalRootFlyout id={id} />
            </EuiProvider>
          );
          return root;
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      mountedRootsRef.current.forEach((root) => root.unmount());
      mountedRootsRef.current = [];
    };
  }, []);

  return (
    <>
      <EuiTitle size="s">
        <h3>Primary React root</h3>
      </EuiTitle>
      <EuiSpacer size="m" />
      <StatefulFlyout
        {...args}
        mainSize="m"
        childSize="s"
        mainFlyoutType="overlay"
        outsideClickCloses={false}
        ownFocus={true}
        paddingSize="m"
        pushAnimation={true}
        pushMinBreakpoint="xs"
        showFooter={true}
        mainFlyoutResizable={false}
        childFlyoutResizable={false}
      />
      <EuiSpacer size="xl" />
      <EuiTitle size="s">
        <h3>Additional React roots</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" color="subdued">
        <p>
          These flyouts are rendered in separate React roots but share the same
          flyout manager state. Open/close any flyout and watch the shared state
          update below.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiFlexGroup gutterSize="m">
        <EuiFlexItem grow={false}>
          <div ref={secondaryRootRef} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <div ref={tertiaryRootRef} />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <EuiTitle size="s">
        <h3>Shared manager state</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiCodeBlock language="json" isCopyable>
        {JSON.stringify(
          {
            sessions: flyoutManager?.state.sessions,
            flyouts: flyoutManager?.state.flyouts,
          },
          null,
          2
        )}
      </EuiCodeBlock>
    </>
  );
};

export const MultiRootSyncPlayground: Story = {
  name: 'Multi-root sync',
  render: (args) => <MultiRootFlyoutDemo {...args} />,
  parameters: {
    layout: 'fullscreen',
  },
};
