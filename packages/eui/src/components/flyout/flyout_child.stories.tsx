/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiButton } from '../button';
import { EuiFlyout, TYPES } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutChild } from './flyout_child';
import { EuiFlyoutHeader } from './flyout_header';
import { EuiFlyoutFooter } from './flyout_footer';
import { EuiText } from '../text';
import { EuiSpacer } from '../spacer';
import { EuiRadioGroup, EuiRadioGroupOption } from '../form';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiBreakpointSize } from '../../services';

const breakpointSizes: EuiBreakpointSize[] = ['xs', 's', 'm', 'l', 'xl'];

type EuiFlyoutChildActualProps = ComponentProps<typeof EuiFlyoutChild>;

type FlyoutChildStoryArgs = EuiFlyoutChildActualProps & {
  pushMinBreakpoint: EuiBreakpointSize;
};

const meta: Meta<FlyoutChildStoryArgs> = {
  title: 'Layout/EuiFlyout/EuiFlyoutChild',
  component: EuiFlyoutChild,
  argTypes: {
    size: {
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    pushMinBreakpoint: {
      options: breakpointSizes,
      control: { type: 'select' },
      description:
        'Breakpoint at which the parent EuiFlyout (if type=`push`) will start pushing content. `xs` makes it always push.',
    },
  },
  args: {
    scrollableTabIndex: 0,
    hideCloseButton: false,
    size: 's',
    pushMinBreakpoint: 'xs',
  },
  parameters: {
    docs: {
      description: {
        component: `
## EuiFlyoutChild
A child panel component that can be nested within an EuiFlyout.

### Responsive behavior
- On larger screens (>= medium breakpoint), the child panel appears side-by-side with the main flyout
- On smaller screens (< medium breakpoint), the child panel stacks on top of the main flyout

### Restrictions
- EuiFlyoutChild can only be used as a direct child of EuiFlyout
- EuiFlyoutChild must include an EuiFlyoutBody child component
- When a flyout includes a child panel:
  - The main flyout size is limited to 's' or 'm' (not 'l')
  - If the main flyout is 'm', then the child flyout is limited to 's'
  - Custom pixel sizes are not allowed when using a child flyout
        `,
      },
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<FlyoutChildStoryArgs>;

interface StatefulFlyoutProps {
  mainSize?: 's' | 'm';
  childSize?: 's' | 'm';
  showHeader?: boolean;
  showFooter?: boolean;
  pushMinBreakpoint?: EuiBreakpointSize;
}

type EuiFlyoutType = (typeof TYPES)[number];

/**
 * A shared helper component used to demo management of internal state. It keeps internal state of
 * the selected flyout type (overlay/push) and the open/closed state of child flyout.
 */
const StatefulFlyout: React.FC<StatefulFlyoutProps> = ({
  mainSize = 'm',
  childSize = 's',
  showHeader = true,
  showFooter = true,
  pushMinBreakpoint = 'xs',
}) => {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [flyoutType, setFlyoutType] = useState<EuiFlyoutType>('overlay');

  const openMain = () => setIsMainOpen(true);
  const closeMain = () => {
    setIsMainOpen(false);
    setIsChildOpen(false);
  };
  const openChild = () => setIsChildOpen(true);
  const closeChild = () => setIsChildOpen(false);

  const typeRadios: EuiRadioGroupOption[] = [
    { id: 'overlay', label: 'Overlay' },
    { id: 'push', label: 'Push' },
  ];

  return (
    <>
      <EuiText>
        <p>
          This is the main page content. Watch how it behaves when the flyout
          type changes.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiRadioGroup
        options={typeRadios}
        idSelected={flyoutType}
        onChange={(id) => setFlyoutType(id as EuiFlyoutType)}
        legend={{ children: 'Main flyout type' }}
        name="statefulFlyoutTypeToggle"
      />
      <EuiSpacer />

      <EuiButton onClick={openMain}>Open Main Flyout</EuiButton>

      {isMainOpen && (
        <EuiFlyout
          onClose={closeMain}
          size={mainSize}
          type={flyoutType}
          pushMinBreakpoint={pushMinBreakpoint}
        >
          {showHeader && (
            <EuiFlyoutHeader hasBorder>
              <EuiText>
                <h2>Main Flyout ({mainSize})</h2>
              </EuiText>
            </EuiFlyoutHeader>
          )}
          <EuiFlyoutBody>
            <EuiText>
              <p>This is the main flyout content.</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                neque sequi illo, cum rerum quia ab animi velit sit incidunt
                inventore temporibus eaque nam veritatis amet maxime maiores
                optio quam?
              </p>
            </EuiText>
            <EuiSpacer />

            {!isChildOpen ? (
              <EuiButton onClick={openChild}>Open child panel</EuiButton>
            ) : (
              <EuiButton onClick={closeChild}>Close child panel</EuiButton>
            )}
          </EuiFlyoutBody>
          {showFooter && (
            <EuiFlyoutFooter>
              <EuiText>
                <p>Main flyout footer</p>
              </EuiText>
            </EuiFlyoutFooter>
          )}

          {isChildOpen && (
            <EuiFlyoutChild onClose={closeChild} size={childSize}>
              {showHeader && (
                <EuiFlyoutHeader hasBorder>
                  <EuiText>
                    <h2>Child Flyout ({childSize})</h2>
                  </EuiText>
                </EuiFlyoutHeader>
              )}
              <EuiFlyoutBody>
                <EuiText>
                  <p>This is the child flyout content.</p>
                  <p>Size restrictions apply:</p>
                  <ul>
                    <li>When main panel is 's', child can be 's' or 'm'</li>
                    <li>When main panel is 'm', child is limited to 's'</li>
                  </ul>
                  <EuiSpacer />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum neque sequi illo, cum rerum quia ab animi velit sit
                    incidunt inventore temporibus eaque nam veritatis amet
                    maxime maiores optio quam?
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
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </>
  );
};

export const WithMediumMainSize: Story = {
  name: 'Main Size: m, Child Size: s',
  render: (args) => (
    <StatefulFlyout
      mainSize="m"
      childSize="s"
      pushMinBreakpoint={args.pushMinBreakpoint}
    />
  ),
};

export const WithSmallMainSize: Story = {
  name: 'Main Size: s, Child Size: s',
  render: (args) => (
    <StatefulFlyout
      mainSize="s"
      childSize="s"
      pushMinBreakpoint={args.pushMinBreakpoint}
    />
  ),
};

export const WithSmallMainLargeChild: Story = {
  name: 'Main Size: s, Child Size: m',
  render: (args) => (
    <StatefulFlyout
      mainSize="s"
      childSize="m"
      pushMinBreakpoint={args.pushMinBreakpoint}
    />
  ),
};

const ChildBackgroundStylesFlyout = () => {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isDefaultChildOpen, setIsDefaultChildOpen] = useState(true);
  const [isShadedChildOpen, setIsShadedChildOpen] = useState(false);

  const openDefaultChild = () => {
    setIsDefaultChildOpen(true);
    setIsShadedChildOpen(false);
  };
  const openShadedChild = () => {
    setIsDefaultChildOpen(false);
    setIsShadedChildOpen(true);
  };

  const closeMain = () => {
    setIsMainOpen(false);
    setIsDefaultChildOpen(false);
    setIsShadedChildOpen(false);
  };
  const closeChild = () => {
    setIsDefaultChildOpen(false);
    setIsShadedChildOpen(false);
  };

  const ChildFlyoutContent = () => (
    <EuiFlyoutBody>
      <EuiText>
        <p>
          This is the child flyout content, with a{' '}
          <b>{isShadedChildOpen ? 'shaded' : 'default'}</b> background.
        </p>
      </EuiText>
    </EuiFlyoutBody>
  );

  return (
    <>
      <EuiText>
        <EuiButton onClick={openDefaultChild} disabled={isDefaultChildOpen}>
          Open flyout with <b>default</b> child background
        </EuiButton>
        <EuiSpacer />
        <EuiButton onClick={openShadedChild} disabled={isShadedChildOpen}>
          Open flyout with <b>shaded</b> child background
        </EuiButton>
      </EuiText>

      {isMainOpen && (
        <EuiFlyout
          onClose={closeMain}
          size="s"
          type="push"
          pushMinBreakpoint="xs"
        >
          <EuiFlyoutBody>
            <EuiText>
              <p>This is the main flyout content.</p>
            </EuiText>
            <EuiSpacer />
          </EuiFlyoutBody>

          {isDefaultChildOpen && (
            <EuiFlyoutChild
              onClose={closeChild}
              size="s"
              backgroundStyle="default"
            >
              <ChildFlyoutContent />
            </EuiFlyoutChild>
          )}
          {isShadedChildOpen && (
            <EuiFlyoutChild
              onClose={closeChild}
              size="s"
              backgroundStyle="shaded"
            >
              <ChildFlyoutContent />
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </>
  );
};

export const WithChildBackgroundStyles: Story = {
  name: 'Child Background Styles',
  render: () => <ChildBackgroundStylesFlyout />,
};
