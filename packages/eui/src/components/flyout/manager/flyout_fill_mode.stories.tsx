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
import { EuiCode } from '../../code';
import { EuiSpacer } from '../../spacer';
import { EuiText } from '../../text';
import { FLYOUT_TYPES, EuiFlyout } from '../flyout';
import { EuiFlyoutBody } from '../flyout_body';
import { EuiFlyoutChild, EuiFlyoutChildProps } from './flyout_child';
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
  | 'paddingSize'
  | 'pushAnimation'
  | 'side'
  | 'size'
  | 'style'
>;

const breakpointSizes: EuiBreakpointSize[] = ['xs', 's', 'm', 'l', 'xl'];

const playgroundActions = actions('log');

type EuiFlyoutType = (typeof FLYOUT_TYPES)[number];

interface FlyoutChildStoryArgs extends EuiFlyoutChildActualProps {
  mainSize?: 's' | 'm' | 'fill';
  childSize?: 's' | 'm' | 'fill';
  childBackgroundStyle?: 'default' | 'shaded';
  childMaxWidth?: number;
  mainFlyoutType: EuiFlyoutType;
  mainMaxWidth?: number;
  outsideClickCloses?: boolean;
  pushMinBreakpoint: EuiBreakpointSize;
}

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

    /**
     * Disabled props that are not relevant to the playground
     */

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
    paddingSize: { table: { disable: true } },
    side: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  args: {
    mainSize: 'fill',
    childSize: 'm',
    childBackgroundStyle: 'default',
    mainFlyoutType: 'overlay',
    outsideClickCloses: false,
    ownFocus: true, // Depends on `mainFlyoutType=overlay`
    paddingSize: 'm',
    pushAnimation: true,
    pushMinBreakpoint: 'xs',
  },
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<FlyoutChildStoryArgs>;

const Session: React.FC<FlyoutChildStoryArgs> = (args) => {
  const {
    mainSize,
    childSize,
    childBackgroundStyle,
    childMaxWidth,
    mainFlyoutType,
    mainMaxWidth,
    ...rest
  } = args;

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

  return (
    <>
      {isMainOpen ? (
        <EuiButton onClick={closeMain}>Close Main Flyout</EuiButton>
      ) : (
        <EuiButton onClick={openMain}>Open Main Flyout</EuiButton>
      )}

      <EuiFlyout
        isOpen={isMainOpen}
        session={true}
        size={mainSize}
        type={mainFlyoutType}
        maxWidth={mainMaxWidth}
        ownFocus={false}
        aria-label={`Main Flyout Menu (${mainSize})`}
        {...rest}
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
        </EuiFlyoutBody>
        <EuiFlyout
          isOpen={isChildOpen}
          size={childSize}
          backgroundStyle={childBackgroundStyle}
          maxWidth={childMaxWidth}
          ownFocus={false}
          aria-label={`Main Flyout Menu (${mainSize})`}
          {...rest}
          onClose={closeChild}
        >
          <EuiFlyoutBody>
            <EuiText>
              <p>This is the child flyout content.</p>
              <EuiSpacer />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                neque sequi illo, cum rerum quia ab animi velit sit incidunt
                inventore temporibus eaque nam veritatis amet maxime maiores
                optio quam?
              </p>
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      </EuiFlyout>
    </>
  );
};

const FillModeExampleComponent: React.FC<FlyoutChildStoryArgs> = (args) => {
  const layoutMode = useFlyoutLayoutMode();

  return (
    <>
      <EuiText>
        <p>
          <strong>Current layout mode: {layoutMode}</strong>
        </p>
        <p>
          Fill sizing rules: When a flyout has <EuiCode>size="fill"</EuiCode>,
          it automatically expands to fill available space.
          <ul>
            <li>
              In side-by-side mode, it calculates width as{' '}
              <EuiCode>calc(90vw - siblingWidth)</EuiCode>.
            </li>
            <li>
              With maxWidth prop, it applies{' '}
              <EuiCode>min(maxWidth, calc(90vw - siblingWidth))</EuiCode> to
              respect both constraints.
            </li>
          </ul>
        </p>
      </EuiText>
      <EuiSpacer size="l" />
      <Session {...args} />
    </>
  );
};

export const FillMode: Story = {
  render: (args) => <FillModeExampleComponent {...args} />,
};
