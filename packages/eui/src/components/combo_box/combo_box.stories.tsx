/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../.storybook/utils';
import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { EuiCode } from '../code';
import { EuiFlexItem } from '../flex';

import { EuiComboBoxOptionMatcher } from './types';
import { EuiComboBox, EuiComboBoxProps } from './combo_box';

const options = [
  { label: 'Item 1' },
  { label: 'Item 2' },
  { label: 'Item 3' },
  { label: 'Item 4', disabled: true },
  { label: 'Item 5' },
  { label: 'Item 6' },
  { label: 'Item 7' },
  { label: 'Item 8' },
  { label: 'Item 9' },
  { label: 'Item 10' },
];

const meta: Meta<EuiComboBoxProps<{}>> = {
  title: 'Forms/EuiComboBox',
  // @ts-ignore typescript shenanigans
  component: EuiComboBox,
  argTypes: {
    singleSelection: {
      control: 'radio',
      options: [false, true, 'asPlainText'],
    },
    append: { control: 'text' },
    prepend: { control: 'text' },
    // Storybook is skipping the Pick<> props from EuiComboBoxList for some annoying reason
    onCreateOption: { control: 'boolean' }, // Set to a true/false for ease of testing
    customOptionText: { control: 'text' },
    renderOption: { control: false }, // Storybook doesn't have a function control type
  },
  args: {
    // Pass options in by default for ease of testing
    options: options,
    selectedOptions: [options[0]],
    // Component defaults
    delimiter: ',',
    sortMatchesBy: 'none',
    singleSelection: false,
    noSuggestions: false,
    async: false,
    isCaseSensitive: false,
    isClearable: true,
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    autoFocus: false,
    compressed: false,
    fullWidth: false,
    onCreateOption: undefined, // Override Storybook's default callback
  },
};
enableFunctionToggleControls(meta, ['onChange', 'onCreateOption']);

export default meta;
type Story = StoryObj<EuiComboBoxProps<{}>>;

export const Playground: Story = {
  render: (args) => <StatefulComboBox {...args} />,
};

export const WithCustomOptionIds: Story = {
  parameters: {
    controls: {
      include: ['options', 'selectedOptions', 'onChange'],
    },
    // This story is visually effectively the same as Playground
    loki: { skip: true },
  },
  args: {
    options: [
      { id: 'item-1', label: 'Item 1' },
      { id: 'item-2', label: 'Item 2' },
      { id: 'item-3', label: 'Item 3' },
      { id: 'item-4', label: 'Item 4', disabled: true },
      { id: 'item-5', label: 'Item 5' },
      { id: 'item-6', label: 'Item 6' },
      { id: 'item-7', label: 'Item 7' },
      { id: 'item-8', label: 'Item 8' },
      { id: 'item-9', label: 'Item 9' },
      { id: 'item-10', label: 'Item 10' },
    ],
  },
  render: (args) => <StatefulComboBox {...args} />,
};

export const RowHeightAuto: Story = {
  parameters: {
    controls: {
      include: ['rowHeight', 'singleSelection', 'options', 'onChange'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    autoFocus: true,
    singleSelection: false,
    rowHeight: 'auto',
    selectedOptions: [
      { label: 'elastic.task_manager_metrics.metrics.message' },
    ],
    options: [
      { label: 'elastic.task_manager_metrics.metrics.error' },
      { label: 'elastic.task_manager_metrics.metrics.last_update' },
      { label: 'elastic.task_manager_metrics.metrics.message' },
      {
        label:
          'elastic.task_manager_metrics.metrics.task_overdue.value.by_type.insolence',
      },
      {
        label:
          'elastic.task_manager_metrics.metrics.task_overdue.value.by_type.nudge',
      },
      {
        label:
          'elastic.task_manager_metrics.metrics.task_overdue.value.by_type.advancement',
      },
      {
        label:
          'elastic.task_manager_metrics.metrics.task_overdue.value.by_type.outlaw',
      },
      {
        label:
          'elastic.task_manager_metrics.metrics.task_overdue.value.by_type.representation',
      },
      {
        label:
          'elastic.task_manager_metrics.metrics.task_overdue.value.by_type.tomb',
      },
      {
        label:
          'elastic.task_manager_metrics.metrics.task_overdue.value.by_type.march',
      },
      { label: 'elastic.task_manager_metrics.metrics.task_claim.timestamp' },
      {
        label: 'elastic.task_manager_metrics.metrics.task_claim.value.duration',
      },
      {
        label: 'elastic.task_manager_metrics.metrics.task_claim.value.success',
      },
      { label: 'elastic.task_manager_metrics.metrics.task_claim.value.total' },
    ],
  },
  render: (args) => <StatefulComboBox {...args} />,
};

export const WithTooltip: Story = {
  parameters: {
    controls: {
      include: ['fullWidth', 'options', 'selectedOptions', 'onChange'],
    },
    // This story is flaky in VRT and always takes a new screenshot - skipping it
    loki: { skip: true },
  },
  args: {
    options: options.map((option, idx) => ({
      ...option,
      toolTipContent: 'This is a tooltip!',
      toolTipProps: {
        position: 'left' as const,
        ['data-test-subj']: 'tooltip',
      },
      value: idx,
    })),
  },
  render: (args) => <StatefulComboBox {...args} />,
  play: lokiPlayDecorator(async (context) => {
    const { bodyElement, step } = context;

    const canvas = within(bodyElement);

    await step(
      'show popover on click, then hover first option to show its tooltip',
      async () => {
        await userEvent.click(canvas.getByRole('combobox'));
        await waitFor(() => {
          expect(canvas.getByRole('listbox')).toBeVisible();
        });

        const options = canvas.getAllByRole('option');

        await userEvent.hover(options[0]);
        await waitFor(() =>
          expect(
            document.querySelectorAll('[data-test-subj="tooltip"]')[0]
          ).toBeVisible()
        );
      }
    );
  }),
};
// manually hide onChange as it's not important as control but needs to be included
// to use the defined control (via enableFunctionToggleControls) in the stateful wrapper
hideStorybookControls(WithTooltip, ['onChange']);

export const CustomMatcher: Story = {
  parameters: {
    codeSnippet: {
      resolveStoryElementOnly: true,
    },
  },
  render: (args) => <StoryCustomMatcher {...args} />,
};

export const Groups: Story = {
  parameters: {
    controls: {
      include: ['options'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    options: [
      { label: 'Group 1', isGroupLabelOption: true },
      ...[...options].splice(0, 3),
      {
        label: 'Group 2',
        isGroupLabelOption: true,
        prepend: '#prepend ',
        append: (
          <EuiFlexItem css={{ alignItems: 'flex-end' }}>(append)</EuiFlexItem>
        ),
      },
      ...[...options].splice(3, options.length),
    ],
    autoFocus: true,
  },
  render: (args) => <StatefulComboBox {...args} />,
};

export const NestedOptionsGroups: Story = {
  parameters: {
    controls: {
      include: ['options'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    options: [
      {
        label: 'Group 1',
        isGroupLabelOption: true,
        options: [...options].splice(0, 3),
      },
      {
        label: 'Group 2',
        isGroupLabelOption: true,
        prepend: '#prepend ',
        append: (
          <EuiFlexItem css={{ alignItems: 'flex-end' }}>(append)</EuiFlexItem>
        ),
        options: [...options].splice(3, options.length),
      },
    ],
    autoFocus: true,
  },
  render: (args) => <StatefulComboBox {...args} />,
};

/**
 * VRT only
 */

export const IconsAndManyOptionsSelected: Story = {
  tags: ['vrt-only'],
  args: {
    singleSelection: false,
    selectedOptions: options,
  },
  render: (args) => <StatefulComboBox {...args} />,
};

/**
 * Helpers
 */

const StatefulComboBox = ({
  singleSelection,
  onCreateOption,
  onChange,
  ...args
}: EuiComboBoxProps<{}>) => {
  const [selectedOptions, setSelectedOptions] = useState(args.selectedOptions);
  const handleOnChange: EuiComboBoxProps<{}>['onChange'] = (
    options,
    ...args
  ) => {
    setSelectedOptions(options);
    onChange?.(options, ...args);
  };
  const _onCreateOption: EuiComboBoxProps<{}>['onCreateOption'] = (
    searchValue,
    ...args
  ) => {
    const createdOption = { label: searchValue };
    setSelectedOptions((prevState) =>
      !prevState || singleSelection
        ? [createdOption]
        : [...prevState, createdOption]
    );
    onCreateOption?.(searchValue, ...args);
  };
  return (
    <EuiComboBox
      singleSelection={
        // @ts-ignore Specific to Storybook control
        singleSelection === 'asPlainText'
          ? { asPlainText: true }
          : Boolean(singleSelection)
      }
      {...args}
      selectedOptions={selectedOptions}
      onChange={handleOnChange}
      onCreateOption={onCreateOption ? _onCreateOption : undefined}
    />
  );
};

const StoryCustomMatcher = ({
  singleSelection,
  onChange,
  ...args
}: EuiComboBoxProps<{}>) => {
  const [selectedOptions, setSelectedOptions] = useState(args.selectedOptions);
  const handleOnChange: EuiComboBoxProps<{}>['onChange'] = (
    options,
    ...args
  ) => {
    setSelectedOptions(options);
    onChange?.(options, ...args);
  };

  const optionMatcher = useCallback<EuiComboBoxOptionMatcher<unknown>>(
    ({ option, searchValue }) => {
      return option.label.startsWith(searchValue);
    },
    []
  );

  return (
    <>
      <p>
        This matcher example uses <EuiCode>option.label.startsWith()</EuiCode>.
        Only options that start exactly like the given search string will be
        matched.
      </p>
      <br />
      <EuiComboBox
        singleSelection={
          // @ts-ignore Specific to Storybook control
          singleSelection === 'asPlainText'
            ? { asPlainText: true }
            : Boolean(singleSelection)
        }
        {...args}
        selectedOptions={selectedOptions}
        onChange={handleOnChange}
        optionMatcher={optionMatcher}
      />
    </>
  );
};
