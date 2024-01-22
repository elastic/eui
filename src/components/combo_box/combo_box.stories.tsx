/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { EuiComboBox, EuiComboBoxProps } from './combo_box';
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
} from '../modal';
import { EuiButton } from '../button';
import { EuiIcon } from '../icon';
import { EuiHealth } from '../health';
import { EuiHighlight } from '../highlight';
import { EuiFormRow } from '../form';
import {
  euiPaletteColorBlindBehindText,
  euiPaletteColorBlind,
  useGeneratedHtmlId,
} from '../../services';
import { EuiComboBoxOptionOption } from './types';
import { EuiComboBoxOptionsListProps } from './combo_box_options_list';
import { EuiText } from '../text';
import { EuiSpacer } from '../spacer';

const visColorBlind = euiPaletteColorBlind();
const visColorsBehindText = euiPaletteColorBlindBehindText();

const options = [
  { label: 'Item 1' },
  { label: 'Item 2' },
  { label: 'Item 3' },
  { label: 'Item 4' },
  { label: 'Item 5' },
];

const meta: Meta<EuiComboBoxProps<{}>> = {
  title: 'Components/EuiComboBox',
  // @ts-ignore typescript shenanigans
  component: EuiComboBox,
  args: {
    options: options,
    selectedOptions: [options[0]],
    singleSelection: false,
  },
  argTypes: {
    singleSelection: {
      control: 'radio',
      options: [false, true, 'asPlainText'],
    },
    append: { control: 'text' },
    prepend: { control: 'text' },
  },
  render: function Component({ singleSelection, ...args }) {
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);
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
        onChange={onChange}
      />
    );
  },
};

export default meta;
type Story = StoryObj<EuiComboBoxProps<{}>>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const CaseSensitive: Story = {
  args: {
    isCaseSensitive: true,
  },
};

const virtualizedOptions = [];
let virtualizedGroupOptions = [];

for (let i = 1; i < 5000; i++) {
  virtualizedGroupOptions.push({ label: `Option ${i}` });
  if (i % 25 === 0) {
    virtualizedOptions.push({
      label: `Options ${i - (virtualizedGroupOptions.length - 1)} to ${i}`,
      options: virtualizedGroupOptions,
    });
    virtualizedGroupOptions = [];
  }
}

export const VirtualizedOptions: Story = {
  args: {
    options: virtualizedOptions,
  },
};

export const InsideModal: Story = {
  render: function Component({ singleSelection, ...args }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);

    return (
      <>
        {isModalVisible && (
          <EuiModal
            onClose={() => setIsModalVisible(false)}
            style={{ width: '800px' }}
          >
            <EuiModalHeader>
              <EuiModalHeaderTitle>Combo box in a modal</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiComboBox
                singleSelection={
                  // @ts-ignore Specific to Storybook control
                  singleSelection === 'asPlainText'
                    ? { asPlainText: true }
                    : Boolean(singleSelection)
                }
                {...args}
                selectedOptions={selectedOptions}
                onChange={onChange}
              />
            </EuiModalBody>
          </EuiModal>
        )}
        <EuiButton onClick={() => setIsModalVisible(true)}>
          Show modal
        </EuiButton>
      </>
    );
  },
};

const optionsWithColors = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    color: visColorsBehindText[0],
  },
  {
    label: 'Enceladus',
    color: visColorsBehindText[1],
  },
  {
    label: 'Mimas',
    color: visColorsBehindText[2],
  },
  {
    label: 'Dione',
    color: visColorsBehindText[3],
  },
  {
    label: 'Iapetus',
    color: visColorsBehindText[4],
  },
  {
    label: 'Phoebe',
    color: visColorsBehindText[5],
  },
  {
    label: 'Rhea',
    color: visColorsBehindText[6],
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    color: visColorsBehindText[7],
  },
  {
    label: 'Tethys',
    color: visColorsBehindText[8],
  },
  {
    label: 'Hyperion',
    color: visColorsBehindText[9],
  },
];

export const PillColors: Story = {
  args: {
    options: optionsWithColors,
    selectedOptions: [optionsWithColors[2], optionsWithColors[5]],
  },
};

const prependAppendOptions = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    prepend: <EuiIcon size="s" type="bell" />,
  },
  {
    label: 'Enceladus',
    prepend: <EuiIcon size="s" type="bolt" />,
  },
  {
    label: 'Mimas',
    prepend: <EuiIcon size="s" type="bug" />,
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    prepend: <EuiIcon size="s" type="discuss" />,
    append: '(10)',
  },
  {
    label: 'Iapetus',
    prepend: <EuiIcon size="s" type="flag" color="danger" />,
    append: '(2)',
  },
  {
    label: 'Phoebe',
    prepend: <EuiIcon size="s" type="tag" color="success" />,
    append: '(5)',
  },
];
export const PrependAppend: Story = {
  args: {
    options: prependAppendOptions,
    selectedOptions: [prependAppendOptions[0], prependAppendOptions[5]],
  },
};

const customDropdownContentOptions = [
  {
    value: {
      size: 5,
    },
    label: 'Titan',
    'data-test-subj': 'titanOption',
    color: visColorsBehindText[0],
  },
  {
    value: {
      size: 2,
    },
    label: 'Enceladus',
    color: visColorsBehindText[1],
  },
  {
    value: {
      size: 15,
    },
    label: 'Mimas',
    color: visColorsBehindText[2],
  },
  {
    value: {
      size: 1,
    },
    label: 'Dione',
    color: visColorsBehindText[3],
  },
  {
    value: {
      size: 8,
    },
    label: 'Iapetus',
    color: visColorsBehindText[4],
  },
  {
    value: {
      size: 2,
    },
    label: 'Phoebe',
    color: visColorsBehindText[5],
  },
  {
    value: {
      size: 33,
    },
    label: 'Rhea',
    color: visColorsBehindText[6],
  },
  {
    value: {
      size: 18,
    },
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    color: visColorsBehindText[7],
  },
  {
    value: {
      size: 9,
    },
    label: 'Tethys',
    color: visColorsBehindText[8],
  },
  {
    value: {
      size: 4,
    },
    label: 'Hyperion',
    color: visColorsBehindText[9],
  },
];

export const CustomDropdownContent: Story = {
  args: {
    options: customDropdownContentOptions,
    selectedOptions: [
      customDropdownContentOptions[0],
      customDropdownContentOptions[5],
    ],
  },
  render: function Component({ singleSelection, ...args }) {
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);

    const renderOption = useCallback<
      NonNullable<EuiComboBoxProps<{ size: number }>['renderOption']>
    >(
      (
        option: EuiComboBoxOptionOption<{ size?: number }>,
        searchValue,
        contentClassName
      ) => {
        const { color, label, value } = option;
        const dotColor = color
          ? visColorBlind[visColorsBehindText.indexOf(color)]
          : 'default';
        return (
          <EuiHealth color={dotColor}>
            <span className={contentClassName}>
              <EuiHighlight search={searchValue}>{label}</EuiHighlight>
              &nbsp;
              <span>({value?.size})</span>
            </span>
          </EuiHealth>
        );
      },
      []
    );

    return (
      <EuiComboBox
        renderOption={renderOption}
        singleSelection={
          // @ts-ignore Specific to Storybook control
          singleSelection === 'asPlainText'
            ? { asPlainText: true }
            : Boolean(singleSelection)
        }
        {...args}
        selectedOptions={selectedOptions}
        onChange={onChange}
      />
    );
  },
};

const groupsColorsGroup = {
  label: 'Colors',
  options: [
    {
      label: 'Red',
    },
    {
      label: 'Blue',
    },
    {
      label: 'Yellow',
    },
    {
      label: 'Green',
    },
  ],
};

const groupsSoundsGroup = {
  label: 'Sounds',
  options: [
    {
      label: 'Pop',
    },
    {
      label: 'Hiss',
    },
    {
      label: 'Screech',
    },
    {
      label: 'Ding',
    },
  ],
};

const groupsOptions = [groupsColorsGroup, groupsSoundsGroup];

export const Groups: Story = {
  args: {
    options: groupsOptions,
  },
};

export const SingleSelection: Story = {
  args: {
    // @ts-ignore The EuiComboBoxSingleSelectionShape part of the type isn't resolved here
    singleSelection: 'asPlainText',
  },
};

export const SingleSelectionWithPrepend: Story = {
  args: {
    // @ts-ignore singleSelection value is redefined for the story and doesn't match original types
    singleSelection: 'asPlainText',
    prepend: 'Prepend',
  },
};

export const SingleSelectionWithCustomOptions: Story = {
  args: {
    // @ts-ignore singleSelection value is redefined for the story and doesn't match original types
    singleSelection: 'asPlainText',
  },
  render: function Component({ singleSelection, ...args }) {
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);
    const onCreateOption = useCallback((searchValue: string) => {
      const normalized = searchValue.trim().toLowerCase();
      if (!normalized) {
        return;
      }

      setSelectedOptions([{ label: searchValue }]);
    }, []);
    return (
      <EuiFormRow
        label="Your occupation"
        helpText="Select an occupation from the list. If your occupation isn’t available, create a custom one."
      >
        <EuiComboBox
          singleSelection={
            // @ts-ignore Specific to Storybook control
            singleSelection === 'asPlainText'
              ? { asPlainText: true }
              : Boolean(singleSelection)
          }
          {...args}
          selectedOptions={selectedOptions}
          onChange={onChange}
          onCreateOption={onCreateOption}
        />
      </EuiFormRow>
    );
  },
};

export const SingleSelectionWithCustomOptionsDisallowed: Story = {
  args: {
    // @ts-ignore singleSelection value is redefined for the story and doesn't match original types
    singleSelection: 'asPlainText',
  },
  render: function Component({ singleSelection, ...args }) {
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const [error, setError] = useState<string | null>(null);
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
      setError(null);
    }, []);

    const onBlur = useCallback(() => {
      if (!inputRef) {
        return;
      }

      const { value } = inputRef;
      setError(value.length === 0 ? null : `"${value}" is not a valid option`);
    }, [inputRef]);

    return (
      <EuiFormRow error={error} isInvalid={error !== null}>
        <EuiComboBox
          placeholder="Select one or more options"
          singleSelection={
            // @ts-ignore Specific to Storybook control
            singleSelection === 'asPlainText'
              ? { asPlainText: true }
              : Boolean(singleSelection)
          }
          {...args}
          selectedOptions={selectedOptions}
          onChange={onChange}
          inputRef={setInputRef}
          onBlur={onBlur}
        />
      </EuiFormRow>
    );
  },
};

export const SingleSelectionWithCustomOptionsAndValidation: Story = {
  args: {
    noSuggestions: true,
  },
  render: function Component({ singleSelection, ...args }) {
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const [isInvalid, setIsInvalid] = useState(false);

    const isValid = (value: string) => /^[a-zA-Z]+$/.test(value);

    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
      setIsInvalid(false);
    }, []);

    const onCreateOption = useCallback((searchValue: string) => {
      if (!isValid(searchValue)) {
        // Return false to explicitly reject the user's input.
        return false;
      }

      const newOption = {
        label: searchValue,
      };

      setSelectedOptions((selectedOptions) => [
        ...(selectedOptions || []),
        newOption,
      ]);
    }, []);

    const onSearchChange = useCallback((searchValue: string) => {
      if (!searchValue) {
        setIsInvalid(false);
        return;
      }

      setIsInvalid(!isValid(searchValue));
    }, []);

    return (
      <EuiFormRow
        label="Only custom options"
        isInvalid={isInvalid}
        error={isInvalid ? 'Only letters are allowed' : undefined}
      >
        <EuiComboBox
          placeholder="Create some tags (letters only)"
          singleSelection={
            // @ts-ignore Specific to Storybook control
            singleSelection === 'asPlainText'
              ? { asPlainText: true }
              : Boolean(singleSelection)
          }
          {...args}
          selectedOptions={selectedOptions}
          onChange={onChange}
          onCreateOption={onCreateOption}
          onSearchChange={onSearchChange}
        />
      </EuiFormRow>
    );
  },
};

export const Async: Story = {
  args: {
    async: true,
    placeholder: 'Search asynchronously',
  },
  render: function Component({ singleSelection, ...args }) {
    const [allOptions, setAllOptions] =
      useState<Array<EuiComboBoxOptionOption<any>>>(optionsWithColors);
    const [selectedOptions, setSelectedOptions] = useState<
      EuiComboBoxOptionOption[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Array<EuiComboBoxOptionOption<any>>>(
      []
    );
    const searchTimeoutRef = useRef<number>();

    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);

    const onCreateOption = useCallback<
      NonNullable<EuiComboBoxOptionsListProps<any>['onCreateOption']>
    >((searchValue: string, options = []) => {
      const normalizedSearchValue = searchValue.toLowerCase().trim();
      if (!normalizedSearchValue) {
        return;
      }

      const newOption: EuiComboBoxOptionOption = {
        label: searchValue,
      };

      // Create the option if it doesn't exist.
      if (
        options.findIndex(
          (option) =>
            option.label.trim().toLowerCase() === normalizedSearchValue
        ) === -1
      ) {
        setAllOptions((allOptions) => [...allOptions, newOption]);
        setOptions((options) => [...options, newOption]);
      }

      setSelectedOptions((selectedOptions) => [
        ...(selectedOptions || []),
        newOption,
      ]);
    }, []);

    const onSearchChange = useCallback(
      (searchValue: string) => {
        setIsLoading(true);
        setOptions([]);

        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = window.setTimeout(() => {
          setIsLoading(false);
          setOptions(
            allOptions.filter((option) =>
              option.label.toLowerCase().includes(searchValue.toLowerCase())
            )
          );
        }, 1200);
      },
      [allOptions]
    );

    useEffect(() => {
      onSearchChange('');
    }, [onSearchChange]);

    return (
      <EuiComboBox
        placeholder="Create some tags (letters only)"
        singleSelection={
          // @ts-ignore Specific to Storybook control
          singleSelection === 'asPlainText'
            ? { asPlainText: true }
            : Boolean(singleSelection)
        }
        {...args}
        options={options}
        selectedOptions={selectedOptions}
        isLoading={isLoading}
        onChange={onChange}
        onCreateOption={onCreateOption}
        onSearchChange={onSearchChange}
      />
    );
  },
};

export const Delimiter: Story = {
  args: {
    delimiter: ',',
  },
  render: function Component({ singleSelection, ...args }) {
    const [selectedOptions, setSelectedOptions] = useState<
      EuiComboBoxOptionOption[]
    >([optionsWithColors[2], optionsWithColors[4]]);
    const [options, setOptions] =
      useState<Array<EuiComboBoxOptionOption<any>>>(optionsWithColors);

    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);

    const onCreateOption = useCallback<
      NonNullable<EuiComboBoxOptionsListProps<any>['onCreateOption']>
    >((searchValue: string, options = []) => {
      const normalizedSearchValue = searchValue.toLowerCase().trim();
      if (!normalizedSearchValue) {
        return;
      }

      const newOption: EuiComboBoxOptionOption = {
        label: searchValue,
      };

      // Create the option if it doesn't exist.
      if (
        options.findIndex(
          (option) =>
            option.label.trim().toLowerCase() === normalizedSearchValue
        ) === -1
      ) {
        setOptions((options) => [...options, newOption]);
      }

      setSelectedOptions((selectedOptions) => [
        ...(selectedOptions || []),
        newOption,
      ]);
    }, []);

    return (
      <EuiComboBox
        placeholder="Create some tags (letters only)"
        singleSelection={
          // @ts-ignore Specific to Storybook control
          singleSelection === 'asPlainText'
            ? { asPlainText: true }
            : Boolean(singleSelection)
        }
        {...args}
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
      />
    );
  },
};

export const SortingMatches: Story = {
  args: {
    sortMatchesBy: 'startsWith',
  },
};

export const DuplicateLabels: Story = {
  args: {
    options: [
      {
        label: 'Titan',
        key: 'titan1',
      },
      {
        label: 'Titan',
        key: 'titan2',
      },
      {
        label: 'Enceladus is disabled',
        disabled: true,
      },
      {
        label: 'Titan',
        key: 'titan3',
      },
      {
        label: 'Dione',
      },
    ],
  },
};

export const AccessibleLabel: Story = {
  render: function Component({ singleSelection, ...args }) {
    const id = useGeneratedHtmlId({ prefix: 'generated-heading' });
    const [selectedOptions, setSelectedOptions] = useState(
      args.selectedOptions
    );
    const onChange = useCallback((newOptions: any[]) => {
      setSelectedOptions(newOptions);
    }, []);
    return (
      <>
        <EuiText>
          <h3 id={id}>Heading as a label</h3>
        </EuiText>
        <EuiSpacer />
        <EuiComboBox
          aria-labelledby={id}
          singleSelection={
            // @ts-ignore Specific to Storybook control
            singleSelection === 'asPlainText'
              ? { asPlainText: true }
              : Boolean(singleSelection)
          }
          {...args}
          selectedOptions={selectedOptions}
          onChange={onChange}
        />
      </>
    );
  },
};
