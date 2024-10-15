/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useCallback, useState } from 'react';
import figma from '@figma/code-connect';
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
import { EuiComboBox as ComboBox, EuiComboBoxProps } from './combo_box';
import { EuiFormRow } from '../form/form_row';

const options = [
  { label: 'Item 1' },
  { label: 'Item 2' },
  { label: 'Item 3' },
  { label: 'Item 4', disabled: true },
  { label: 'Item 5' },
];

const EuiComboBox = ({
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
    <ComboBox
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

type Story = StoryObj<
  EuiComboBoxProps<{}> & {
    ariaLabel: string;
    error: { text?: string };
    helpText: { text?: string };
    label: { text?: string };
  }
>;

export const Playground: Story = {
  render: ({ ariaLabel, error, helpText, isInvalid, label, ...props }) => (
    <EuiFormRow
      error={error.text}
      helpText={helpText.text}
      isInvalid={isInvalid}
      label={label.text}
    >
      <EuiComboBox
        aria-label={ariaLabel}
        options={options}
        selectedOptions={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        onChange={() => {}}
        isInvalid={isInvalid}
        {...props}
      />
    </EuiFormRow>
  ),
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
  render: (args) => <EuiComboBox {...args} />,
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
  render: (args) => <EuiComboBox {...args} />,
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
  render: (args) => <EuiComboBox {...args} />,
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
      <ComboBox
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

const meta: Meta<EuiComboBoxProps<{}>> = {
  title: 'Forms/EuiComboBox',
  // @ts-ignore typescript shenanigans
  component: ComboBox,
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
    renderOption: { control: 'function' },
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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=15883-161301&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        ariaLabel: figma.boolean('Label', {
          true: undefined,
          false: 'Meaningful label',
        }),
        compressed: figma.boolean('Compressed'),
        error: figma.nestedProps('📦Form Row / Error text', {
          text: figma.textContent('Text'),
        }),
        helpText: figma.boolean('Help text', {
          true: figma.nestedProps('📦 Form Row / Help text', {
            text: figma.textContent('Text'),
          }),
          false: {
            text: undefined,
          },
        }),
        isDisabled: figma.enum('State', {
          Disabled: true,
        }),
        isInvalid: figma.enum('State', {
          Invalid: true,
        }),
        label: figma.boolean('Label', {
          true: figma.nestedProps('📦 Form Row / Label', {
            text: figma.textContent('Text'),
          }),
          false: {
            text: undefined,
          },
        }),
      },
    },
  },
};
enableFunctionToggleControls(meta, ['onChange', 'onCreateOption']);

export default meta;
