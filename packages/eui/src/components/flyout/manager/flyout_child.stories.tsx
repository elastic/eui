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

import { LOKI_SELECTORS } from '../../../../.storybook/loki';
import { EuiBreakpointSize } from '../../../services';
import { EuiButton } from '../../button';
import { EuiSpacer } from '../../spacer';
import { EuiText } from '../../text';
import { FLYOUT_TYPES } from '../flyout';
import { EuiFlyoutBody } from '../flyout_body';
import { EuiFlyoutFooter } from '../flyout_footer';
import { EuiFlyoutMenu } from '../flyout_menu';
import { EuiFlyoutChild, EuiFlyoutChildProps } from './flyout_child';
import { EuiFlyoutMain } from './flyout_main';
import { useFlyoutLayoutMode } from './hooks';

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
  | 'pushAnimation'
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
}

const breakpointSizes: EuiBreakpointSize[] = ['xs', 's', 'm', 'l', 'xl'];

const playgroundActions = actions('log');

const meta: Meta<FlyoutChildStoryArgs> = {
  title: 'Layout/EuiFlyout/EuiFlyoutChild',
  component: EuiFlyoutChild,
  argTypes: {
    childSize: {
      options: ['s', 'm'],
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
      options: ['s', 'm'],
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
    mainFlyoutType: 'push',
    outsideClickCloses: false,
    ownFocus: true, // Depends on `mainFlyoutType=overlay`
    paddingSize: 'm',
    pushAnimation: true,
    pushMinBreakpoint: 'xs',
    showFooter: true,
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </EuiText>
      <EuiSpacer size="l" />
      {isMainOpen ? (
        <EuiButton onClick={closeMain}>Close Main Flyout</EuiButton>
      ) : (
        <EuiButton onClick={openMain}>Open Main Flyout</EuiButton>
      )}

      {isMainOpen && (
        <EuiFlyoutMain
          size={mainSize}
          type={mainFlyoutType}
          pushMinBreakpoint={pushMinBreakpoint}
          maxWidth={mainMaxWidth}
          ownFocus={false}
          {...args}
          onClose={closeMain}
        >
          <EuiFlyoutMenu title={`Main Flyout Menu (${mainSize})`} />
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
        </EuiFlyoutMain>
      )}
      {isChildOpen && (
        <EuiFlyoutChild
          size={childSize}
          backgroundStyle={childBackgroundStyle}
          maxWidth={childMaxWidth}
          ownFocus={false}
          {...args}
          onClose={closeChild}
        >
          <EuiFlyoutMenu title={`Child Flyout Menu (${childSize})`} />
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                neque sequi illo, cum rerum quia ab animi velit sit incidunt
                inventore temporibus eaque nam veritatis amet maxime maiores
                optio quam?
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
        </EuiFlyoutChild>
      )}
    </>
  );
};

export const FlyoutChildDemo: Story = {
  name: 'Playground',
  render: (args) => <StatefulFlyout {...args} />,
};
