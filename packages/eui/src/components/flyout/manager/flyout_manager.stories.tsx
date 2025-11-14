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
import { EuiButton } from '../../button';
import { EuiSpacer } from '../../spacer';
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
  const [isMainOpen, setIsMainOpen] = useState(true);
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

      {isMainOpen && (
        <EuiFlyout
          session="start"
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
            {isChildOpen && (
              <EuiFlyout
                id="flyout-manager-playground-child"
                size={childSize}
                hasChildBackground={hasChildBackground}
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
                      <li>Both flyouts cannot be size &quot;m&quot;</li>
                      <li>Both flyouts cannot be size &quot;fill&quot;</li>
                      <li>
                        Size &quot;l&quot; can only be used if the other flyout
                        is &quot;fill&quot;
                      </li>
                    </ul>
                    <EuiSpacer />
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorum neque sequi illo, cum rerum quia ab animi velit
                      sit incidunt inventore temporibus eaque nam veritatis amet
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
    </>
  );
};

export const FlyoutChildDemo: Story = {
  name: 'Playground',
  render: (args) => <StatefulFlyout {...args} />,
};
