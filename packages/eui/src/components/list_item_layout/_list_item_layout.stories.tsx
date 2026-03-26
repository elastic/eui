/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { cloneElement, isValidElement } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiIcon } from '../icon';
import { EuiBadge } from '../badge';
import { EuiButtonIcon } from '../button';
import { EuiText } from '../text';
import { EuiCode } from '../code';
import { EuiSpacer } from '../spacer';
import {
  EuiListItemLayout,
  type EuiListItemLayoutProps,
  type EuiListItemLayoutAsLi,
  type EuiListItemLayoutAsDiv,
  type EuiListItemLayoutAsButton,
  type EuiListItemLayoutAsAnchor,
} from './_list_item_layout';

type EuiListItemLayoutStoryProps = EuiListItemLayoutProps & {
  checkedSingle: 'on' | undefined;
};

/* Story HOC to pass the correct `checked` control value to the component, since we're
conditionally switching between `checked` and `checkedSingle` to advocate expected usage */
const StoryRender = ({
  checkedSingle,
  checked,
  isSingleSelection,
  ...args
}: EuiListItemLayoutStoryProps) => {
  return (
    <EuiListItemLayout
      {...(args as EuiListItemLayoutProps)}
      isSingleSelection={isSingleSelection}
      checked={isSingleSelection ? checkedSingle : checked}
    />
  );
};

const meta: Meta<EuiListItemLayoutProps> = {
  title: 'Internal/EuiListItemLayout',
  component: EuiListItemLayout,
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  argTypes: {
    component: {
      control: 'radio',
      options: ['li', 'div', 'button', 'a'],
    },
    checked: {
      control: 'radio',
      options: ['on', 'off', 'mixed', undefined],
      if: { arg: 'isSingleSelection', truthy: false }, // show for multi selection only
    },
    // @ts-expect-error - custom variant of `checked` control that isn't a standalone prop
    checkedSingle: {
      name: 'checked',
      control: 'radio',
      options: ['on', undefined],
      if: { arg: 'isSingleSelection' }, // show for single selection only
    },
    prepend: {
      control: 'radio',
      options: ['icon', 'text', undefined],
      mapping: {
        icon: <EuiIcon type="info" />,
        text: '(Prepend)',
        undefined: undefined,
      },
    },
    append: {
      control: 'radio',
      options: ['text', 'badge', undefined],
      mapping: {
        badge: <EuiBadge color="hollow">Badge</EuiBadge>,
        text: '(Append)',
        undefined: undefined,
      },
    },
    extraAction: {
      control: 'radio',
      options: ['action', undefined],
      mapping: {
        action: (
          <EuiButtonIcon
            iconType="arrowRight"
            color="text"
            aria-label="Extra action"
          />
        ),
        undefined: undefined,
      },
    },
    href: {
      control: 'text',
    },
    target: {
      control: 'text',
    },
    rel: {
      control: 'text',
    },
    role: {
      control: 'text',
    },
  },
  args: {
    component: 'li',
    checked: undefined,
    prepend: undefined,
    append: undefined,
    isDisabled: false,
    isFocused: false,
    isSelected: false,
    isSingleSelection: false,
    href: undefined,
    target: undefined,
    rel: undefined,
    showIndicator: true,
  },
  render: (args) => <StoryRender {...(args as EuiListItemLayoutStoryProps)} />,
};

export default meta;
type Story = StoryObj<EuiListItemLayoutProps>;

export const Playground: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  args: {
    children: 'List item',
  },
  render: function Render(args) {
    const { isDisabled, extraAction, ...rest } = args as EuiListItemLayoutProps;

    // mimic implementation handling of synchronized disabled state
    const _extraAction =
      extraAction != null && isValidElement(extraAction)
        ? cloneElement(extraAction, {
            ...extraAction.props,
            disabled: isDisabled,
          })
        : extraAction;

    return (
      <StoryRender
        {...(rest as EuiListItemLayoutStoryProps)}
        extraAction={_extraAction}
      />
    );
  },
};

export const Role: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['component', 'role', 'checked', 'isSelected', 'children'],
    },
  },
  args: {
    children: 'List item',
    role: 'menuitemcheckbox',
  },
};

export const ExtraAction: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  name: 'extraAction',
  parameters: {
    controls: {
      include: ['component', 'extraAction', 'children'],
    },
  },
  args: {
    children: 'List item',
    extraAction: 'action',
  },
};

export const TooltipProps: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  name: 'tooltipProps',
  parameters: {
    controls: {
      include: ['component', 'tooltipProps', 'isFocused', 'children'],
    },
  },
  args: {
    children: 'List item',
    component: 'button',
    isFocused: true,
    tooltipProps: {
      title: 'Tooltip',
      content: 'Tooltip content',
      delay: 'none',
      position: 'bottom',
    },
  },
};

export const ExtraActionAndTooltipProps: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  name: 'extraAction & tooltipProps',
  parameters: {
    controls: {
      include: [
        'component',
        'tooltipProps',
        'extraAction',
        'isFocused',
        'children',
      ],
    },
  },
  args: {
    children: 'List item',
    component: 'button',
    isFocused: true,
    extraAction: 'action',
    tooltipProps: {
      title: 'Tooltip',
      content: 'Tooltip content',
      delay: 'none',
      position: 'bottom',
    },
  },
};

export const Truncation: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  name: 'textWrap: truncate',
  parameters: {
    controls: {
      include: ['component', 'textWrap', 'children'],
    },
  },
  args: {
    children: 'List item with long label that should be truncated',
    textWrap: 'truncate',
  },
  render: (args) => (
    <div
      css={css`
        inline-size: 250px;
      `}
    >
      <StoryRender {...(args as EuiListItemLayoutStoryProps)} />
    </div>
  ),
};

export const TextWrap: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  name: 'textWrap: wrap',
  parameters: {
    controls: {
      include: ['component', 'textWrap', 'children'],
    },
  },
  args: {
    children: 'List item with long label that should break into a new line',
    textWrap: 'wrap',
  },
  render: (args) => (
    <div
      css={css`
        inline-size: 250px;
      `}
    >
      <StoryRender {...(args as EuiListItemLayoutStoryProps)} />
    </div>
  ),
};

export const KitchenSink: Story = {
  // TODO: uncomment after review
  // tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['isDisabled', 'isFocused', 'isSelected', 'children'],
    },
  },
  args: {
    component: 'li',
    children: 'List item',
  },
  render: function Render(args) {
    return (
      <>
        <EuiFlexGroup direction="row" gutterSize="m">
          <EuiFlexItem>
            {renderKitchenSink({
              ...args,
              component: 'li',
            } as EuiListItemLayoutAsLi)}
          </EuiFlexItem>

          <EuiFlexItem>
            {renderKitchenSink({
              ...args,
              component: 'div',
            } as EuiListItemLayoutAsDiv)}
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xl" />

        <EuiFlexGroup direction="row" gutterSize="m">
          <EuiFlexItem>
            {renderKitchenSink({
              ...args,
              component: 'button',
            } as EuiListItemLayoutAsButton)}
          </EuiFlexItem>

          <EuiFlexItem>
            {renderKitchenSink({
              ...args,
              component: 'a',
              href: '#',
            } as EuiListItemLayoutAsAnchor)}
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    );
  },
};

const renderKitchenSink = (args: EuiListItemLayoutProps) => {
  const { children, component, isDisabled } = args;

  const _prepend = <EuiIcon type="info" />;
  const _append = <EuiBadge color="hollow">Badge</EuiBadge>;
  const _extraAction = (
    <EuiButtonIcon
      iconType="arrowRight"
      color="text"
      isDisabled={isDisabled}
      aria-label="Button icon label"
    />
  );

  return (
    <>
      <EuiText size="s">
        <EuiCode>component="{component}"</EuiCode>
      </EuiText>
      <EuiSpacer size="m" />

      <EuiFlexGroup component="ul" direction="column" gutterSize="none">
        <EuiListItemLayout {...args}>
          {children} <small>(default)</small>
        </EuiListItemLayout>
        <EuiListItemLayout {...args} prepend={_prepend}>
          {children} <small>(prepend)</small>
        </EuiListItemLayout>

        <EuiListItemLayout {...args} checked="on">
          {children} <small>(checked=on)</small>
        </EuiListItemLayout>
        <EuiListItemLayout {...args}>
          {children} <small>(checked=undefined)</small>
        </EuiListItemLayout>
        <EuiListItemLayout {...args} checked="mixed">
          {children} <small>(checked=mixed)</small>
        </EuiListItemLayout>
        <EuiListItemLayout {...args} checked="off">
          {children} <small>(checked=off)</small>
        </EuiListItemLayout>

        <EuiListItemLayout {...args} isSingleSelection checked="on">
          {children} <small>(isSingleSelection & checked=on)</small>
        </EuiListItemLayout>
        <EuiListItemLayout {...args} isSingleSelection>
          {children} <small>(isSingleSelection & checked=undefined)</small>
        </EuiListItemLayout>

        <EuiListItemLayout {...args} append={_append}>
          {children} <small>(append)</small>
        </EuiListItemLayout>
        <EuiListItemLayout
          {...args}
          append={_append}
          extraAction={_extraAction}
        >
          {children} <small>(append & extraAction)</small>
        </EuiListItemLayout>
        <EuiListItemLayout
          {...args}
          checked="on"
          prepend={_prepend}
          append={_append}
          extraAction={_extraAction}
        >
          {children}{' '}
          <small>(checked=on & prepend & append & extraAction)</small>
        </EuiListItemLayout>

        <EuiListItemLayout
          {...args}
          tooltipProps={{
            content: 'Tooltip content',
            delay: 'regular',
            position: 'bottom',
          }}
        >
          {children} <small>(tooltipProps)</small>
        </EuiListItemLayout>
        <EuiListItemLayout
          {...args}
          wrapperComponent="li"
          tooltipProps={{
            content: 'Tooltip content',
            delay: 'regular',
            position: 'bottom',
          }}
        >
          {children} <small>(wrapperComponent & tooltipProps)</small>
        </EuiListItemLayout>

        <EuiListItemLayout {...args} isFocused>
          {children} <small>(isFocused=true)</small>
        </EuiListItemLayout>

        <EuiListItemLayout {...args} checked="on" isSelected>
          {children}{' '}
          <small>
            (checked=on & isSingleSelection=false & isSelected=true)
          </small>
        </EuiListItemLayout>
        <EuiListItemLayout {...args} checked="on" isSingleSelection isSelected>
          {children}{' '}
          <small>(checked=on & isSingleSelection & isSelected=true)</small>
        </EuiListItemLayout>

        <EuiListItemLayout {...args} showIndicator={false}>
          {children} <small>(showIndicator=false)</small>
        </EuiListItemLayout>
        <EuiListItemLayout {...args} isSelected showIndicator={false}>
          {children} <small>(showIndicator=false & isSelected=true)</small>
        </EuiListItemLayout>
      </EuiFlexGroup>
    </>
  );
};
