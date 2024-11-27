/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, cloneElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  hideStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';

import { useIsWithinMinBreakpoint } from '../../../services';
import { EuiIcon } from '../../icon';
import { EuiForm } from '../form';
import { EuiFieldNumber } from '../field_number';

import {
  EuiFormControlLayoutDelimited,
  EuiFormControlLayoutDelimitedProps,
} from './form_control_layout_delimited';
import { EuiFormControlLayoutProps } from './form_control_layout';

// re-declaring the component with props as the Partial<EuiFormControlLayoutProps>
// of EuiFormControlLayoutDelimitedProps is otherwise not resolved
const Component: FunctionComponent<
  EuiFormControlLayoutDelimitedProps & EuiFormControlLayoutProps
> = EuiFormControlLayoutDelimited;

const meta: Meta<EuiFormControlLayoutDelimitedProps> = {
  title: 'Forms/EuiForm/EuiFormControlLayoutDelimited',
  component: Component,
  argTypes: {
    delimiter: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="arrowRight" />,
        text: '+',
      },
    },
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
    iconsPosition: 'static',
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
moveStorybookControlsToCategory(
  meta,
  [
    'append',
    'prepend',
    'isDisabled',
    'isDropdown',
    'isInvalid',
    'isLoading',
    'compressed',
    'fullWidth',
    'readOnly',
    'clear',
    'iconsPosition',
    'icon',
    'inputId',
  ],
  'EuiFormControlLayout props'
);

export default meta;
type Story = StoryObj<EuiFormControlLayoutDelimitedProps>;

export const Playground: Story = {
  args: {
    startControl: (
      <EuiFieldNumber
        controlOnly
        placeholder="0"
        aria-label="EuiFormControlLayoutDelimited demo - start control"
      />
    ),
    endControl: (
      <EuiFieldNumber
        controlOnly
        placeholder="100"
        aria-label="EuiFormControlLayoutDelimited demo - end control"
      />
    ),
  },
  render: ({ startControl, endControl, ...args }) => {
    const { isInvalid, isDisabled, readOnly } = args;
    const clonedControlProps = { isInvalid, disabled: isDisabled, readOnly };
    return (
      <EuiFormControlLayoutDelimited
        {...args}
        startControl={cloneElement(startControl, clonedControlProps)}
        endControl={cloneElement(endControl, clonedControlProps)}
      />
    );
  },
};

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  render: function Render() {
    const isDesktop = useIsWithinMinBreakpoint('xl');
    return (
      <EuiForm
        fullWidth={isDesktop}
        css={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <EuiFormControlLayoutDelimited
          startControl={
            <EuiFieldNumber controlOnly placeholder="0" autoFocus />
          }
          endControl={<EuiFieldNumber controlOnly placeholder="100" />}
        />
        <EuiFormControlLayoutDelimited
          compressed
          startControl={<EuiFieldNumber controlOnly placeholder="0" />}
          endControl={<EuiFieldNumber controlOnly placeholder="100" />}
        />
        <EuiFormControlLayoutDelimited
          append="px"
          startControl={<EuiFieldNumber controlOnly placeholder="0" />}
          endControl={<EuiFieldNumber controlOnly placeholder="100" />}
        />
        <EuiFormControlLayoutDelimited
          icon="vector"
          startControl={<EuiFieldNumber placeholder="0" controlOnly />}
          endControl={<EuiFieldNumber controlOnly placeholder="100" />}
        />
        <EuiFormControlLayoutDelimited
          clear={{ onClick: () => {} }}
          isLoading
          startControl={<EuiFieldNumber controlOnly placeholder="0" />}
          endControl={<EuiFieldNumber controlOnly placeholder="100" />}
        />
        <EuiFormControlLayoutDelimited
          prepend="Add"
          startControl={<EuiFieldNumber controlOnly placeholder="0" />}
          delimiter="+"
          endControl={<EuiFieldNumber controlOnly placeholder="100" />}
        />
        <EuiFormControlLayoutDelimited
          prepend="Merge"
          startControl={<EuiFieldNumber controlOnly placeholder="0" />}
          delimiter={<EuiIcon type="merge" />}
          endControl={<EuiFieldNumber controlOnly placeholder="100" />}
        />
        <EuiFormControlLayoutDelimited
          readOnly
          prepend="Read only"
          startControl={<EuiFieldNumber controlOnly placeholder="0" readOnly />}
          endControl={<EuiFieldNumber controlOnly placeholder="100" readOnly />}
        />
        <EuiFormControlLayoutDelimited
          isDisabled
          prepend="Disabled"
          startControl={<EuiFieldNumber controlOnly placeholder="0" disabled />}
          endControl={<EuiFieldNumber controlOnly placeholder="100" disabled />}
        />
        <EuiFormControlLayoutDelimited
          isInvalid
          prepend="Invalid"
          startControl={
            <EuiFieldNumber isInvalid controlOnly placeholder="0" />
          }
          endControl={
            <EuiFieldNumber isInvalid controlOnly placeholder="100" />
          }
        />
      </EuiForm>
    );
  },
};

export const HighContrast: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

export const HighContrastDarkMode: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
};
