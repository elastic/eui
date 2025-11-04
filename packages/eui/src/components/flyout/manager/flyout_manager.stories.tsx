/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { actions } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { EuiBreakpointSize } from '../../../services';
import { EuiButton, EuiButtonEmpty } from '../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiHorizontalRule } from '../../horizontal_rule';
import { EuiSpacer } from '../../spacer';
import { EuiTitle } from '../../title';
import { EuiText } from '../../text';
import { FLYOUT_TYPES, EuiFlyout } from '../flyout';
import { EuiFlyoutBody } from '../flyout_body';
import { EuiFlyoutFooter } from '../flyout_footer';
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
  childSize?: 's' | 'm';
  hasChildBackground: boolean;
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
    mainFlyoutResizable: {
      control: { type: 'boolean' },
      description: 'Whether the main flyout should be resizable.',
    },
    childFlyoutResizable: {
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
    childSize: 's',
    hasChildBackground: false,
    mainFlyoutType: 'overlay',
    outsideClickCloses: false,
    ownFocus: false, // Depends on `mainFlyoutType=overlay`
    paddingSize: 'm',
    pushAnimation: true,
    pushMinBreakpoint: 'xs',
    showFooter: true,
    mainFlyoutResizable: false,
    childFlyoutResizable: false,
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
 * A shared helper component used to demo management of internal state. It keeps internal state of
 * the selected flyout type (overlay/push) and the open/closed state of child flyout.
 */
const StatefulFlyout: React.FC<FlyoutChildStoryArgs> = ({
  mainSize,
  childSize,
  hasChildBackground,
  mainFlyoutType,
  pushMinBreakpoint,
  mainMaxWidth,
  childMaxWidth,
  showFooter,
  mainFlyoutResizable,
  childFlyoutResizable,
  ...args
}) => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [isSecondChildOpen, setIsSecondChildOpen] = useState(false);
  const [isSecondSessionOpen, setIsSecondSessionOpen] = useState(false);

  const openMain = () => {
    setIsMainOpen(true);
    playgroundActions.log('Parent flyout opened');
  };
  const closeMain = () => {
    setIsMainOpen(false);
    setIsChildOpen(false);
    setIsSecondChildOpen(false);
    playgroundActions.log('Parent flyout closed');
  };
  const openChild = () => {
    setIsChildOpen(true);
    playgroundActions.log('Child flyout opened');
  };
  const closeChild = () => {
    setIsChildOpen(false);
    setIsSecondChildOpen(false);
    playgroundActions.log('Child flyout closed');
  };
  const openSecondChild = () => {
    setIsSecondChildOpen(true);
    playgroundActions.log('Second child flyout opened');
  };
  const closeSecondChild = () => {
    setIsSecondChildOpen(false);
    setIsChildOpen(false);
    playgroundActions.log('Second child flyout closed');
  };
  const openSecondSession = () => {
    setIsSecondSessionOpen(true);
    playgroundActions.log('Second session opened');
  };
  const closeSecondSession = () => {
    setIsSecondSessionOpen(false);
    playgroundActions.log('Second session closed');
  };

  const layoutMode = useFlyoutLayoutMode();

  return (
    <>
      <EuiFlexGroup direction="column" gutterSize="m" alignItems="flexStart">
        <EuiFlexItem grow={false}>
          <EuiTitle size="xs">
            <h3>
              Managed flyout session
            </h3>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText color="subdued" size="s">
            <p>
              This is a managed flyout session. Navigate from one main flyout to another.
              <br />
              Note that child flyouts are not stored in the session history, so they will not be accessible via the history popover.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={isMainOpen ? closeMain : openMain}
            fullWidth={false}
          >
            {isMainOpen ? 'Close' : 'Open'} main flyout
          </EuiButton>
        </EuiFlexItem>
        <EuiHorizontalRule margin="xxl" />
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxs">
            <h4>
              Managed flyouts appear side-by-side or stacked based on the viewport width.
            </h4>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText color="subdued" size="s">
            <p>Resize the browser window to see how the layout mode changes.
              <br />
              Current layout mode: <strong>{layoutMode}</strong>.
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
      {isMainOpen && (
        <EuiFlyout
          {...args}
          session="start"
          id="flyout-manager-playground-main"
          size={mainSize}
          type={mainFlyoutType}
          pushMinBreakpoint={pushMinBreakpoint}
          maxWidth={mainMaxWidth}
          ownFocus={false}
          resizable={mainFlyoutResizable}
          aria-label={`Main Flyout Menu (${mainSize})`}
          onClose={closeMain}
        >
          <EuiFlyoutBody>
            <EuiText size="s">
              <p>This is the main flyout content.</p>
            </EuiText>
            <EuiSpacer />

            <EuiButtonEmpty
              onClick={isChildOpen ? closeChild : openChild}
              flush="left"
            >
              {isChildOpen ? 'Close' : 'Open'} child panel
            </EuiButtonEmpty>
            {isChildOpen && (
              <EuiFlyout
                {...args}
                id="flyout-manager-playground-child"
                size={childSize}
                hasChildBackground={hasChildBackground}
                maxWidth={childMaxWidth}
                ownFocus={false}
                resizable={childFlyoutResizable}
                aria-label={`Child Flyout Panel (${childSize})`}
                onClose={closeChild}
              >
                <EuiFlyoutBody>
                  <EuiText size="s">
                    <p>This is the child flyout content.</p>
                    <p>Size restrictions apply:</p>
                    <ul>
                      <li>Both flyouts cannot be size &quot;m&quot;</li>
                      <li>Both flyouts cannot be size &quot;fill&quot;</li>
                      <li>
                        Size &quot;l&quot; can only be used if the other flyout
                        is &quot;fill&quot;
                      </li>
                    </ul>
                  </EuiText>
                  <EuiSpacer />
                  <EuiFlexGroup gutterSize="s">
                    <EuiFlexItem grow={false}>
                      <EuiButton
                        size="s"
                        onClick={isSecondChildOpen ? closeSecondChild : openSecondChild}
                        color="success"
                      >
                        {isSecondChildOpen ? 'Close' : 'Open'} another child
                      </EuiButton>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButton
                        onClick={openSecondSession}
                        disabled={isSecondSessionOpen}
                        size="s"
                      >
                        Open another main flyout
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  {isSecondChildOpen && (
                    <EuiFlyout
                      {...args}
                      id="flyout-manager-playground-second-child"
                      size="s"
                      hasChildBackground={hasChildBackground}
                      ownFocus={false}
                      aria-label="Second Child Flyout Panel"
                      onClose={closeSecondChild}
                    >
                      <EuiFlyoutBody>
                        <EuiText size="s">
                          <p>This is the second child flyout.</p>
                          <ul>
                            <li>
                              Child flyouts are not stored in the session history, so they will not be accessible via the history popover.
                            </li>
                            <li>
                              Closing any child flyout will close all child flyouts
                              in the session.
                            </li>
                          </ul>
                        </EuiText>
                      </EuiFlyoutBody>
                    </EuiFlyout>
                  )}
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
            )}
          </EuiFlyoutBody>
          {showFooter && (
            <EuiFlyoutFooter>
              <EuiText>
                <p>Main flyout footer</p>
              </EuiText>
            </EuiFlyoutFooter>
          )}
        </EuiFlyout>
      )}
      {isSecondSessionOpen && (
        <EuiFlyout
          {...args}
          session="start"
          id="flyout-manager-playground-second-session"
          size="m"
          type={mainFlyoutType}
          pushMinBreakpoint={pushMinBreakpoint}
          maxWidth={mainMaxWidth}
          ownFocus={false}
          aria-label="Second Session Flyout"
          onClose={closeSecondSession}
        >
          <EuiFlyoutBody>
            <EuiText size="s">
              <p>
                This is a completely separate flyout session, independent from
                the main session. In other words, a second main flyout.
              </p>
              <ul>
                <li>
                  It was opened from a child flyout but starts its own session with{' '}
                  <code>session=&quot;start&quot;</code>, so it&apos;s a sibling
                  session rather than a nested child.
                </li>
                <li>
                  Notice how the flyout menu shows this as a separate session that
                  you can navigate to independently.
                </li>
                <li>
                  Upon closing this flyout, the previous main flyout will be restored.
                </li>
              </ul>
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const FlyoutChildDemo: Story = {
  name: 'Playground',
  render: (args) => <StatefulFlyout {...args} />,
};
