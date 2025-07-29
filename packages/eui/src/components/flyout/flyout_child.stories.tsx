/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { actions } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, ComponentProps } from 'react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { EuiBreakpointSize } from '../../services';
import { EuiButton } from '../button';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
import { EuiFlyout, TYPES } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutChild } from './flyout_child';
import { EuiFlyoutFooter } from './flyout_footer';
import { EuiFlyoutHeader } from './flyout_header';
import { EuiFlyoutMenu } from './flyout_menu';

type EuiFlyoutChildActualProps = Pick<
  ComponentProps<typeof EuiFlyoutChild>,
  | 'onClose'
  | 'size'
  | 'backgroundStyle'
  | 'maxWidth'
  | 'hideCloseButton'
  | 'scrollableTabIndex'
  | 'banner'
  | 'children'
>;

type EuiFlyoutType = (typeof TYPES)[number];

interface FlyoutChildStoryArgs extends EuiFlyoutChildActualProps {
  parentSize?: 's' | 'm';
  childSize?: 's' | 'm' | 'fill';
  childBackgroundStyle?: 'default' | 'shaded';
  parentFlyoutType: EuiFlyoutType;
  pushMinBreakpoint: EuiBreakpointSize;
  parentMaxWidth?: number;
  childMaxWidth?: number;
  showMenu?: boolean;
}

const breakpointSizes: EuiBreakpointSize[] = ['xs', 's', 'm', 'l', 'xl'];

const playgroundActions = actions('log');

const meta: Meta<FlyoutChildStoryArgs> = {
  title: 'Layout/EuiFlyout/EuiFlyoutChild',
  component: EuiFlyoutChild,
  argTypes: {
    parentSize: {
      options: ['s', 'm'],
      control: { type: 'radio' },
      description:
        'The size of the parent flyout. If `m`, the child must be `s` or `fill`. If `s`, the child can be `s`, `m`, or `fill`.',
    },
    childSize: {
      options: ['s', 'm', 'fill'],
      control: { type: 'radio' },
      description:
        'The size of the child flyout. If the parent is `s`, the child can be `s`, `m`, or `fill`. If the parent is `m`, the child can only be `s` or `fill`.',
    },
    parentMaxWidth: {
      control: { type: 'number' },
      description:
        'The maximum width of the parent flyout. Can be set to limit the width of the parent flyout.',
    },
    childMaxWidth: {
      control: { type: 'number' },
      description:
        'The maximum width of the child flyout. Can be set to limit the width of the child flyout.',
    },
    parentFlyoutType: {
      options: TYPES,
      control: { type: 'radio' },
      description: 'The type of the parent flyout. Only `push` is supported.',
    },
    childBackgroundStyle: {
      options: ['default', 'shaded'],
      control: { type: 'radio' },
      description:
        'The background style of the child flyout. Defaults to `default`.',
    },
    pushMinBreakpoint: {
      options: breakpointSizes,
      control: { type: 'select' },
      description:
        'Breakpoint at which the parent flyout (if `type="push"`) will convert to an overlay flyout. Defaults to `xs`.',
    },
    showMenu: {
      control: { type: 'boolean' },
      description:
        'Whether to show the top flyout menu bar. If `false`, an `EuiFlyoutHeader` will not be rendered instead.',
    },

    // use "childBackgroundStyle" instead
    backgroundStyle: { table: { disable: true } },
    // use "mainSize" and "childSize" instead
    size: { table: { disable: true } },
    // use "parentMaxWidth" and "childMaxWidth" instead
    maxWidth: { table: { disable: true } },
    onClose: { table: { disable: true } },
    banner: { table: { disable: true } },
    hideCloseButton: { table: { disable: true } },
    scrollableTabIndex: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    parentSize: 'm',
    childSize: 's',
    childBackgroundStyle: 'default',
    parentFlyoutType: 'push',
    showMenu: true,
    parentMaxWidth: undefined,
    childMaxWidth: undefined,
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
  - The main flyout size is limited to 's', 'm', or 'fill'
    - If the main flyout is 's', then the child flyout can be 's', 'm', or 'fill'
    - If the main flyout is 'm', then the child flyout can only be 's' or 'fill'
  - The child flyout size is limited to 's', 'm', or 'fill'
    - If the child flyout is 's', then the main flyout can be 's', 'm', or 'fill'
    - If the child flyout is 'm', then the main flyout can only be 's' or 'fill'
    - If the child flyout is 'fill', then the main flyout can be 's' or 'm'
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

/**
 * A shared helper component used to demo management of internal state. It keeps internal state of
 * the selected flyout type (overlay/push) and the open/closed state of child flyout.
 */
const StatefulFlyout: React.FC<FlyoutChildStoryArgs> = ({
  parentSize: mainSize = 'm',
  childSize = 's',
  childBackgroundStyle = 'default',
  parentFlyoutType = 'push',
  pushMinBreakpoint = 'xs',
  parentMaxWidth,
  childMaxWidth,
  ...args
}) => {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isChildOpen, setIsChildOpen] = useState(false);

  const openMain = () => setIsMainOpen(true);
  const closeMain = () => {
    setIsMainOpen(false);
    setIsChildOpen(false);
    playgroundActions.log('Parent flyout closed');
  };
  const openChild = () => setIsChildOpen(true);
  const closeChild = () => {
    setIsChildOpen(false);
    playgroundActions.log('Child flyout closed');
  };

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
      <EuiSpacer size="l" />
      <EuiButton onClick={openMain}>Open Main Flyout</EuiButton>

      {isMainOpen && (
        <EuiFlyout
          onClose={closeMain}
          size={mainSize}
          type={parentFlyoutType}
          pushMinBreakpoint={pushMinBreakpoint}
          maxWidth={parentMaxWidth}
        >
          {args.showMenu ? (
            <EuiFlyoutMenu title={`Main Flyout Menu (${mainSize})`} />
          ) : (
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
          <EuiFlyoutFooter>
            <EuiText>
              <p>Main flyout footer</p>
            </EuiText>
          </EuiFlyoutFooter>

          {isChildOpen && (
            <EuiFlyoutChild
              onClose={closeChild}
              size={childSize}
              backgroundStyle={childBackgroundStyle}
              maxWidth={childMaxWidth}
              scrollableTabIndex={args.scrollableTabIndex}
            >
              {args.showMenu ? (
                <EuiFlyoutMenu title={`Child Flyout Menu (${childSize})`} />
              ) : (
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
                    <li>
                      When main panel is 's', child can be 's', 'm', or 'fill'
                    </li>
                    <li>
                      When main panel is 'm', child is limited to 's' or 'fill'
                    </li>
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
              <EuiFlyoutFooter>
                <EuiText>
                  <p>Child flyout footer</p>
                </EuiText>
              </EuiFlyoutFooter>
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </>
  );
};

export const FlyoutChildDemo: Story = {
  name: 'Playground',
  render: (args) => <StatefulFlyout {...args} />,
};
