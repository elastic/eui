/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../../.storybook/utils';

import { useIsWithinMinBreakpoint } from '../../../services';
import { EuiForm } from '../form';
import { EuiFieldText } from '../field_text';
import { EuiIcon } from '../../icon';
import { EuiIconTip, EuiToolTip } from '../../tool_tip';
import { EuiPopover } from '../../popover';
import { EuiButtonEmpty, EuiButtonIcon } from '../../button';
import { EuiText } from '../../text';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from './form_control_layout';

const meta: Meta<EuiFormControlLayoutProps> = {
  title: 'Forms/EuiForm/EuiFormControlLayout',
  component: EuiFormControlLayout,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appended',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
  },
  args: {
    fullWidth: false,
    iconsPosition: 'absolute',
    // set up for easier testing/QA
    compressed: false,
    isDisabled: false,
    isDropdown: false,
    isInvalid: false,
    isLoading: false,
    readOnly: false,
    icon: '',
    inputId: '',
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiFormControlLayoutProps>;

export const Playground: Story = {
  // Several props need to be manually applied to the child EuiFieldText as well to render correctly
  render: ({ children, ...args }) => {
    const { readOnly, isDisabled, fullWidth, compressed } = args;
    const childProps = {
      readOnly,
      isDisabled,
      fullWidth,
      compressed,
      isInvalid: args.isInvalid,
    };
    return (
      <EuiFormControlLayout {...args}>
        <EuiFieldText
          type="text"
          aria-label="EuiFormControlLayout demo"
          controlOnly
          {...childProps}
        />
      </EuiFormControlLayout>
    );
  },
};

export const IconShape: Story = {
  parameters: {
    controls: {
      include: [
        'icon',
        'isInvalid',
        'isLoading',
        'isDisabled',
        'iconsPosition',
        'clear',
      ],
    },
  },
  args: {
    children: (
      <EuiFieldText
        controlOnly
        aria-label="EuiFormControlLayout icon and clear API demo"
      />
    ),
    icon: {
      type: 'faceHappy',
      side: 'right',
    },
    clear: {
      size: 'm',
    },
  },
};

export const AppendPrepend: Story = {
  tags: ['vrt-only'],
  render: function Render() {
    const isDesktop = useIsWithinMinBreakpoint('xl');
    return (
      <EuiForm
        fullWidth={isDesktop}
        css={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <EuiFieldText
          placeholder="String & text in a tooltip"
          prepend="String"
          append={
            <EuiToolTip content="content">
              <EuiText size="s">Tooltip</EuiText>
            </EuiToolTip>
          }
          autoFocus
        />
        <EuiFieldText
          placeholder="XS empty button in a popover & tooltip"
          prepend={
            <EuiPopover
              button={
                <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
                  Popover
                </EuiButtonEmpty>
              }
              closePopover={() => {}}
            />
          }
          append={
            <EuiToolTip content="content">
              <EuiButtonEmpty size="xs">Tooltip</EuiButtonEmpty>
            </EuiToolTip>
          }
        />
        <EuiFieldText
          placeholder="XS empty buttons with icons"
          prepend={
            <EuiButtonEmpty
              role="button"
              size="xs"
              iconType="arrowDown"
              iconSide="right"
              aria-label="Calendar dropdown"
            >
              <EuiIcon type="calendar" />
            </EuiButtonEmpty>
          }
          append={
            <EuiButtonEmpty size="xs" iconType="gear">
              Tooltip
            </EuiButtonEmpty>
          }
        />
        <EuiFieldText
          placeholder="Icon & button icon"
          prepend={<EuiIcon type="vector" />}
          append={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
        />
        <EuiFieldText
          placeholder="Icons in buttons and popovers and tooltips"
          prepend={[
            <EuiIcon type="vector" />,
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
          ]}
          append={[
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />,
            <EuiIconTip content="content" />,
          ]}
        />
        <EuiFieldText
          placeholder="Icon button in popover & tooltip"
          append={
            <EuiPopover
              button={
                <EuiButtonIcon iconType="arrowDown" aria-label="Popover" />
              }
              closePopover={() => {}}
            />
          }
          prepend={
            <EuiToolTip content="content">
              <EuiButtonIcon iconType="gear" aria-label="Gear this" />
            </EuiToolTip>
          }
        />
        <EuiFieldText
          placeholder="Icon and string & string and icon button"
          prepend={[<EuiIcon type="vector" />, 'String']}
          append={[
            'String',
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
          ]}
        />
        <EuiFieldText
          placeholder="String and button icon in tooltip & button icon in popover and string"
          prepend={[
            'String',
            <EuiToolTip content="content">
              <EuiButtonIcon iconType="gear" aria-label="Gear this" />
            </EuiToolTip>,
          ]}
          append={[
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />,
            'String',
          ]}
        />
        <EuiFieldText
          compressed={true}
          placeholder="Compressed"
          prepend="String"
          append={[
            'String',
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
          ]}
        />
        <EuiFieldText
          disabled={true}
          placeholder="Disabled"
          prepend="String"
          append={[
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />,
          ]}
        />
        <EuiFieldText
          readOnly={true}
          placeholder="Readonly"
          prepend={
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />
          }
          append="String"
        />
      </EuiForm>
    );
  },
};

export const HighContrast: Story = {
  ...AppendPrepend,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

export const HighContrastDarkMode: Story = {
  ...AppendPrepend,
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
};
